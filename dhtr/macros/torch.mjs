// icon suggestion: icons/sundries/lights/torch-brown-lit.webp
const dim_range = 20;
const bright_range = 10;
const tokensToBeModified = canvas.tokens.controlled;
for (let i = 0; i < tokensToBeModified.length; i++) {
    if (tokensToBeModified[i].document.light.dim === 0) {
        await tokensToBeModified[i].document.update({
            light: {
                "negative": false,
                "priority": 0,
                "alpha": 0.2,
                "angle": 360,
                "bright": 20,
                "color": "#fa9200",
                "coloration": 1,
                "dim": 40,
                "attenuation": 1,
                "luminosity": 0.5,
                "saturation": 0,
                "contrast": 0,
                "shadows": 0,
                "animation": {
                    "type": "torch",
                    "speed": 5,
                    "intensity": 5,
                    "reverse": false
                },
                "darkness": {
                    "min": 0,
                    "max": 1
                }
            },
        });
    } else {
        await tokensToBeModified[i].document.update({
            light: {
                alpha: 0.5,
                angle: 0,
                bright: 0,
                color: "#000000",
                coloration: 1,
                dim: 0,
                gradual: true,
                luminosity: 0.5,
                saturation: 0,
                contrast: 0,
                shadows: 0,
                animation: {
                    speed: 5,
                    intensity: 5,
                    reverse: false,
                },
                darkness: {
                    min: 0,
                    max: 1,
                },
            },
        });
    }
}