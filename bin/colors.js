const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        }
        : null;
};

const rgbToHsl = ({red, green, blue}) => {
    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hue, saturation, lightness = (max + min) / 2;

    if (max === min) {
        hue = saturation = 0; // achromatic
    } else {
        const d = max - min;
        saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
            case g: hue = (b - r) / d + 2; break;
            case b: hue = (r - g) / d + 4; break;
        }

        hue /= 6;
    }

    return { hue, saturation, lightness };
};

const hslToRgb = ({hue, saturation, lightness}) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = lightness; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;

        r = hue2rgb(p, q, hue + 1/3);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1/3);
    }

    return { red: r * 255, green: g * 255, blue: b * 255 };
};
