import {hexToRgb, rgbToHex, shade, tint} from "./colors";
import fs from "fs";

const colorJSON = require("../colors");
const {colors} = colorJSON;
const theme = {};

for (let colorName in colors) {
    if (colors.hasOwnProperty(colorName)) {
        const hex = colors[colorName];
        const rgb = hexToRgb(hex);

        const lighter = rgbToHex(tint(rgb, .25));
        const darker = rgbToHex(shade(rgb, .75));

        theme[`${colorName}-tint`] = lighter;
        theme[colorName] = hex;
        theme[`${colorName}-shade`] = darker;
    }
}

let cssVarsString = ":root {\n";
for (let varName in theme) {
    cssVarsString += "\t--" + varName + ": " + theme[varName] + ";\n";
}
cssVarsString += "}\n";

fs.writeFile("vars.css", cssVarsString, (err) => {
    if (err) console.log(err);
});
