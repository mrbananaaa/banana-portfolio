import {
	type DOMMotionComponents,
	type HTMLMotionProps,
	type MotionProps,
	useInView,
} from "motion/react";
import * as m from "motion/react-m";
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
	article: m.article,
	div: m.div,
	h1: m.h1,
	h2: m.h2,
	h3: m.h3,
	h4: m.h4,
	h5: m.h5,
	h6: m.h6,
	li: m.li,
	p: m.p,
	section: m.section,
	span: m.span,
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
	pathPrefix = "typing-node",
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
		let sequenceCounter = 0;

		return node.map((child) => {
			const currentID = `${pathPrefix}-${sequenceCounter}`;
			sequenceCounter++;

			const renderedChild = renderTypingNode(child, charactersLeft, currentID);

			if (isValidElement(renderedChild)) {
				return cloneElement(renderedChild, {
					key: renderedChild.key ?? currentID,
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

		const currentKey = element.key !== null ? String(element.key) : pathPrefix;

		const renderedChildren = renderTypingNode(
			element.props.children,
			charactersLeft,
			`${currentKey}-c`,
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

	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
	const [hasStarted, setHasStarted] = useState(false);

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
	const wordsKey = useMemo(
		() =>
			words
				? words
						.map((w) => (typeof w === "string" ? w : getTextContent(w)))
						.join("\u0000")
				: (children ?? ""),
		[words, children],
	);
	const wordsToAnimate = useMemo(
		() => (wordsKey === "" && !children ? [] : wordsKey.split("\u0000")),
		[wordsKey, children],
	);

	const hasMultipleWords = wordsToAnimate.length > 1;

	const typingSpeed = typeSpeed ?? duration;
	const deletingSpeed = deleteSpeed ?? typingSpeed / 2;

	const shouldStart = startOnView ? isInView : true;

	/**
	 * Reset the animation when the actual content changes.
	 */
	const animationSourceKey = wordsKey;

	const [prevKey, setPrevKey] = useState(animationSourceKey);

	if (prevKey !== animationSourceKey) {
		// render-phase reset: React discards this render and re-renders immediately,
		// no extra commit, no effect warning
		setPrevKey(animationSourceKey);
		setCurrentWordIndex(0);
		setCurrentCharIndex(0);
		setPhase("typing");
		setHasStarted(false);
	}

	/**
	 * Main typing animation loop.
	 */
	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		if (shouldStart && wordsToAnimate.length > 0) {
			const timeoutDelay =
				!hasStarted && delay > 0
					? delay
					: phase === "typing"
						? typingSpeed
						: phase === "deleting"
							? deletingSpeed
							: pauseDelay;

			timeout = setTimeout(() => {
				setHasStarted(true);
				const graphemes = Array.from(wordsToAnimate[currentWordIndex] ?? "");

				switch (phase) {
					case "typing":
						if (currentCharIndex < graphemes.length) {
							setCurrentCharIndex((prev) => prev + 1);
						} else if (hasMultipleWords || loop) {
							const isLastWord = currentWordIndex === wordsToAnimate.length - 1;
							if (!isLastWord || loop) setPhase("pause");
						}
						break;

					case "pause":
						setPhase("deleting");
						break;

					case "deleting":
						if (currentCharIndex > 0) {
							setCurrentCharIndex((prev) => prev - 1);
						} else {
							setCurrentWordIndex((prev) => (prev + 1) % wordsToAnimate.length);
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
		wordsToAnimate,
		hasMultipleWords,
		loop,
		typingSpeed,
		deletingSpeed,
		pauseDelay,
		delay,
		hasStarted,
	]);

	const currentWord = words?.[currentWordIndex];

	const currentWordGraphemes = Array.from(
		wordsToAnimate[currentWordIndex] || "",
	);

	const displayedText = currentWordGraphemes
		.slice(0, currentCharIndex)
		.join("");

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
