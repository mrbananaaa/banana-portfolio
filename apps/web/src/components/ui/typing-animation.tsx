import {
	type DOMMotionComponents,
	type HTMLMotionProps,
	type MotionProps,
	motion,
	useInView,
} from "motion/react";
import {
	type ComponentType,
	type ReactElement,
	type ReactNode,
	type RefAttributes,
	type RefObject,
	cloneElement,
	isValidElement,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";

const motionElements = {
	article: motion.article,
	div: motion.div,
	h1: motion.h1,
	h2: motion.h2,
	h3: motion.h3,
	h4: motion.h4,
	h5: motion.h5,
	h6: motion.h6,
	li: motion.li,
	p: motion.p,
	section: motion.section,
	span: motion.span,
} as const;

type MotionElementType = Extract<
	keyof DOMMotionComponents,
	keyof typeof motionElements
>;

type TypingAnimationMotionComponent = ComponentType<
	Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>;

type TypingWord = string | ReactElement;

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
	children?: string;
	words?: TypingWord[];
	className?: string;
	duration?: number;
	typeSpeed?: number;
	deleteSpeed?: number;
	delay?: number;
	pauseDelay?: number;
	loop?: boolean;
	as?: MotionElementType;
	startOnView?: boolean;
	showCursor?: boolean;
	blinkCursor?: boolean;
	cursorStyle?: "line" | "block" | "underscore";
}

/**
 * Extract all text from a React tree.
 *
 * Example:
 *
 * <span>
 *   Hello <strong>world</strong>
 * </span>
 *
 * becomes:
 *
 * "Hello world"
 */
function getTextContent(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}

	if (Array.isArray(node)) {
		return node.map(getTextContent).join("");
	}

	if (isValidElement(node)) {
		const props = node.props as {
			children?: ReactNode;
		};

		return getTextContent(props.children);
	}

	return "";
}

/**
 * Recursively render a React tree while revealing
 * only the amount of text that has been typed.
 *
 * This is what allows nested elements to keep
 * their own styling.
 */
function renderTypingNode(
	node: ReactNode,
	charactersLeft: { value: number },
): ReactNode {
	if (node === null || node === undefined || typeof node === "boolean") {
		return node;
	}

	/**
	 * Text node
	 */
	if (typeof node === "string" || typeof node === "number") {
		const text = String(node);
		const graphemes = Array.from(text);

		const visibleCharacters = graphemes.slice(0, charactersLeft.value).join("");

		charactersLeft.value = Math.max(0, charactersLeft.value - graphemes.length);

		return visibleCharacters;
	}

	/**
	 * Array of React nodes
	 */
	if (Array.isArray(node)) {
		return node.map((child, index) => {
			const renderedChild = renderTypingNode(child, charactersLeft);

			if (isValidElement(renderedChild)) {
				return cloneElement(renderedChild, {
					key: renderedChild.key ?? index,
				});
			}

			return renderedChild;
		});
	}

	/**
	 * React element
	 */
	if (isValidElement(node)) {
		const element = node as ReactElement<{
			children?: ReactNode;
		}>;

		const renderedChildren = renderTypingNode(
			element.props.children,
			charactersLeft,
		);

		return cloneElement(element, {
			children: renderedChildren,
		});
	}

	return null;
}

export function TypingAnimation({
	children,
	words,
	className,
	duration = 100,
	typeSpeed,
	deleteSpeed,
	delay = 0,
	pauseDelay = 1000,
	loop = false,
	as: Component = "span",
	startOnView = true,
	showCursor = true,
	blinkCursor = true,
	cursorStyle = "line",
	...props
}: TypingAnimationProps) {
	const MotionComponent = motionElements[
		Component
	] as TypingAnimationMotionComponent;

	const [displayedText, setDisplayedText] = useState("");
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

	const elementRef = useRef<HTMLElement | null>(null);

	const isInView = useInView(elementRef as RefObject<Element>, {
		amount: 0.3,
		once: true,
	});

	/**
	 * Convert every word into plain text.
	 *
	 * The animation itself still needs a string to know
	 * which character should be displayed next.
	 */
	const wordsToAnimate = useMemo(
		() =>
			words?.map((word) =>
				typeof word === "string" ? word : getTextContent(word),
			) ?? (children ? [children] : []),
		[words, children],
	);

	const hasMultipleWords = wordsToAnimate.length > 1;

	const typingSpeed = typeSpeed ?? duration;
	const deletingSpeed = deleteSpeed ?? typingSpeed / 2;

	const shouldStart = startOnView ? isInView : true;

	/**
	 * Reset the animation when the actual content changes.
	 */
	const _animationSourceKey = useMemo(
		() => (words ? words.map(getTextContent).join("\u0000") : (children ?? "")),
		[words, children],
	);

	useEffect(() => {
		setDisplayedText("");
		setCurrentWordIndex(0);
		setCurrentCharIndex(0);
		setPhase("typing");
	}, []);

	/**
	 * Main typing animation loop.
	 */
	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		if (shouldStart && wordsToAnimate.length > 0) {
			const timeoutDelay =
				delay > 0 && displayedText === ""
					? delay
					: phase === "typing"
						? typingSpeed
						: phase === "deleting"
							? deletingSpeed
							: pauseDelay;

			timeout = setTimeout(() => {
				const currentWord = wordsToAnimate[currentWordIndex] || "";

				const graphemes = Array.from(currentWord);

				switch (phase) {
					case "typing":
						if (currentCharIndex < graphemes.length) {
							setDisplayedText(
								graphemes.slice(0, currentCharIndex + 1).join(""),
							);

							setCurrentCharIndex(currentCharIndex + 1);
						} else {
							if (hasMultipleWords || loop) {
								const isLastWord =
									currentWordIndex === wordsToAnimate.length - 1;

								if (!isLastWord || loop) {
									setPhase("pause");
								}
							}
						}
						break;

					case "pause":
						setPhase("deleting");
						break;

					case "deleting":
						if (currentCharIndex > 0) {
							setDisplayedText(
								graphemes.slice(0, currentCharIndex - 1).join(""),
							);

							setCurrentCharIndex(currentCharIndex - 1);
						} else {
							const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length;

							setCurrentWordIndex(nextIndex);
							setPhase("typing");
						}
						break;
				}
			}, timeoutDelay);
		}

		return () => {
			if (timeout !== null) {
				clearTimeout(timeout);
			}
		};
	}, [
		shouldStart,
		phase,
		currentCharIndex,
		currentWordIndex,
		displayedText,
		wordsToAnimate,
		hasMultipleWords,
		loop,
		typingSpeed,
		deletingSpeed,
		pauseDelay,
		delay,
	]);

	const currentWord = words?.[currentWordIndex];

	const currentWordGraphemes = Array.from(
		wordsToAnimate[currentWordIndex] || "",
	);

	const isComplete =
		!loop &&
		currentWordIndex === wordsToAnimate.length - 1 &&
		currentCharIndex >= currentWordGraphemes.length &&
		phase !== "deleting";

	const shouldShowCursor =
		showCursor &&
		!isComplete &&
		(hasMultipleWords ||
			loop ||
			currentCharIndex < currentWordGraphemes.length);

	const getCursorChar = () => {
		switch (cursorStyle) {
			case "block":
				return "▌";

			case "underscore":
				return "_";

			default:
				return "|";
		}
	};

	/**
	 * Render the current word.
	 *
	 * Strings are rendered normally.
	 * JSX gets recursively rendered so nested
	 * components keep their styling.
	 */
	const renderWord = () => {
		if (!currentWord || typeof currentWord === "string") {
			return displayedText;
		}

		const charactersLeft = {
			value: currentCharIndex,
		};

		return renderTypingNode(currentWord, charactersLeft);
	};

	return (
		<MotionComponent
			ref={elementRef}
			className={cn(
				"leading-20 tracking-[-0.02em]",
				Component === "span" && "inline-block",
				className,
			)}
			{...props}
		>
			{renderWord()}

			{shouldShowCursor && (
				<span
					className={cn("inline-block", blinkCursor && "animate-blink-cursor")}
				>
					{getCursorChar()}
				</span>
			)}
		</MotionComponent>
	);
}
