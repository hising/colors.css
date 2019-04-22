export const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        }
        : null;
};

export const numberToHex = (c) => {
    c = Math.round(c);
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

export const rgbToHex = ({red, green, blue}) => {
    return "#" + numberToHex(red) + numberToHex(green) + numberToHex(blue);
};

export const tint = ({red, green, blue}, factor) => {
    return {
        red: red + (factor * (255 - red)),
        green: green + (factor * (255 - green)),
        blue: blue + (factor * (255 - blue))
    }
};

export const shade = ({red, green, blue}, factor) => {
    return {
        red: red * factor,
        green: green * factor,
        blue: blue * factor
    }
};
