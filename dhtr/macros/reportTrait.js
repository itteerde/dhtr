
const keys = new Map([
    ['agility', 'Agility'],
    ['finesse', 'Finesse'],
    ['instinct', 'Instinct'],
    ['knowledge', 'Knowledge'],
    ['presence', 'Presence'],
    ['strength', 'Strength']
]);

let dialogContent = '';
for (const key of keys.keys()) {
    dialogContent += `
        <label><input type="radio" name="choice" value="${key}" checked> ${keys.get(key)}</label>
    `;
}

// https://foundryvtt.com/api/classes/foundry.applications.api.DialogV2.html
new foundry.applications.api.DialogV2({
    window: { title: "Traits" },
    content: dialogContent,
    buttons: [{
        action: "choice",
        label: "Report",
        default: true,
        callback: (event, button, dialog) => button.form.elements.choice.value
    }],
    submit: result => {
        if (!keys.has(result)) console.log("no valid button");
        else {
            console.log(`User picked option: ${keys.get(result)}`);

            let actors = game.folders.getName("The Party").contents.filter(a => a.type === "character");
            let chatMessageContent = `<div style="color: white;"><div style="font-size: large; font-weight: bold;">${keys.get(result)}</div><table>`;

            actors.forEach(a => {
                chatMessageContent += `<tr><td>${a.name}</td><td>${a.getRollData().traits[result].value}</td></tr>`;
            });

            chatMessageContent += `</table></div>`;

            // https://foundryvtt.com/api/classes/foundry.documents.ChatMessage.html
            ChatMessage.create({ content: chatMessageContent });
        }
    }
}).render({ force: true });