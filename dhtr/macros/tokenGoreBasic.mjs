//token.document.texture.src
//canvas.tokens.controlled

let tokens = canvas.tokens.controlled

for (const token of tokens) {
    if (token.document.getFlag("dhtr", "texture.src")) {
        await token.document.update({ "texture.src": token.document.getFlag("dhtr", "texture.src") });
        await token.document.setFlag("dhtr", "texture.src", null)
    } else {
        await token.document.setFlag("dhtr", "texture.src", token.document.texture.src);
        await token.document.update({ "texture.src": "modules/dhtr/icons/tokens/Blood_Puddle_A1_1x1.png" });
    }
};