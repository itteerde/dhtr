const SCOPE = 'dhtr';
const FLAG_NAME = 'gore';

let tokens = canvas.tokens.controlled

for (const token of tokens) {
    if (token.document.getFlag(SCOPE, FLAG_NAME)) {
        await token.document.update(token.document.getFlag(SCOPE, FLAG_NAME));
        await token.document.setFlag(SCOPE, FLAG_NAME, null);
    } else {
        let flag = {
            "texture.src": token.document.texture.src,
            "texture.scaleX": token.document.texture.scaleX,
            "texture.scaleY": token.document.texture.scaleY
        };
        await token.document.setFlag(SCOPE, FLAG_NAME, flag);
        let data = {
            "texture.src": "modules/dhtr/icons/tokens/Burnt_Body_A_02_1x2.png",
            "texture.scaleX": token.document.texture.scaleX * 1.6,
            "texture.scaleY": token.document.texture.scaleY * 1.6
        }
        await token.document.update(data);
    }
};