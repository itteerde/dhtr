//token.document.texture.src
//canvas.tokens.controlled

let tokens = canvas.tokens.controlled

tokens.forEach(token => {
    await token.document.setFlag("dhtr", "texture.src", token.document.texture.src)
    token.document.update({ "texture.src": "modules/dhtr/icons/statuses/Blood_Puddle_A1_1x1.png" });
});