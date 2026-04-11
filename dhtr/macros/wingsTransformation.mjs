const SCOPE = 'dhtr';
const FLAG_NAME = 'wings';

//replace t.actorId per character as required

let tokens = Array.from(canvas.scene.tokens.values()).filter(t => t.actorId === "mWSsMxP9kl4dlvVx")

for (const token of tokens) {
    if (token.getFlag(SCOPE, FLAG_NAME)) {
        await token.update(token.getFlag(SCOPE, FLAG_NAME));
        await token.setFlag(SCOPE, FLAG_NAME, null);
    } else {
        let flag = {
            "texture.src": token.texture.src,
            "texture.scaleX": token.texture.scaleX,
            "texture.scaleY": token.texture.scaleY
        };
        await token.setFlag(SCOPE, FLAG_NAME, flag);
        let data = {
            "texture.src": "modules/dhtr/icons/tokens/FireWings.png",
            "texture.scaleX": token.texture.scaleX * 2.5,
            "texture.scaleY": token.texture.scaleY * 2.5
        }
        await token.update(data);
    }
};