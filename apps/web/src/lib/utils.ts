export { cn } from "cn";

interface HSL {
	h: number; // 0-360
	s: number; // 0-100
	l: number; // 0-100
}

/**
 * Converts a Hex color string to HSL
 */
export function hexToHsl(hex: string): HSL {
	// Normalize hex string
	let cleanedHex = hex.replace(/^#/, "");
	if (cleanedHex.length === 3) {
		cleanedHex = cleanedHex
			.split("")
			.map((char) => char + char)
			.join("");
	}

	const r = parseInt(cleanedHex.substring(0, 2), 16) / 255;
	const g = parseInt(cleanedHex.substring(2, 4), 16) / 255;
	const b = parseInt(cleanedHex.substring(4, 6), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}

/**
 * Converts HSL values back to a Hex string
 */
export function hslToHex({ h, s, l }: HSL): string {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Main function: Takes an arbitrary hex color, enhances saturation (+15%),
 * and reduces lightness (-15%) to make it a little darker.
 */
export function enhanceAndDarkenColor(hexInput: string): string {
	// 1. Convert to HSL
	const hsl = hexToHsl(hexInput);

	// 2. Enhance color (increase saturation) and make it darker (decrease lightness)
	const adjustedHsl: HSL = {
		h: hsl.h,
		s: Math.min(100, hsl.s + 50), // Boost saturation by 15% for color depth
		l: Math.max(0, hsl.l - 30), // Lower lightness by 15% to darken it
	};

	// 3. Return back as Hex
	return hslToHex(adjustedHsl);
}
