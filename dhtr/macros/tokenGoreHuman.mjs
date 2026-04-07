const SCOPE = 'dhtr';
const FLAG_NAME = 'gore';

let tokens = canvas.tokens.controlled

for (const token of tokens) {
    if (token.document.getFlag(SCOPE, FLAG_NAME)) {
        await token.document.update({ "texture.src": token.document.getFlag(SCOPE, FLAG_NAME).texture.src });
        await token.document.setFlag(SCOPE, FLAG_NAME, null);
    } else {
        let value = {
            "texture.src": token.document.texture.src,
            "texture.scale": token.document.texture.scale
        };
        await token.document.setFlag(SCOPE, FLAG_NAME, value);
        await token.document.update({ "texture.src": "Blood_Puddle_w_Body.png" });
    }
};