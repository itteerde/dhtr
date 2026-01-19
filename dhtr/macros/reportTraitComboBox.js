const keys = new Map([
    ['agility', 'Agility'],
    ['finesse', 'Finesse'],
    ['instinct', 'Instinct'],
    ['knowledge', 'Knowledge'],
    ['presence', 'Presence'],
    ['strength', 'Strength']
]);

// Build the dropdown HTML form
let dialogContent = `
    <div style="margin-bottom: 10px;">
        <label for="trait-select" style="display: block; margin-bottom: 5px;">Select Trait:</label>
        <select name="choice" id="trait-select" style="width: 100%;">
`;
// fill in the options for the dropdown box
for (const [key, label] of keys.entries()) {
    dialogContent += `<option value="${key}">${label}</option>`;
}
// end the form
dialogContent += `</select></div>`;

// https://foundryvtt.com/api/classes/foundry.applications.api.DialogV2.html
new foundry.applications.api.DialogV2({
    window: { title: "Traits" },
    content: dialogContent,
    buttons: [{
        action: "choice",
        label: "Report",
        default: true,
        callback: (event, button, dialog) => button.form.elements.choice.value // only returns one string, the choice made (option selected's value)
    }],
    submit: result => {
        if (!keys.has(result)) {
            console.log("no valid selection");
        } else {
            console.log(`User picked option: ${keys.get(result)}`);

            // https://foundryvtt.com/api/classes/foundry.documents.Actor.html
            let actors = game.folders.getName("The Party").contents.filter(a => a.type === "character");

            // build the HTML for the ChatMessage content
            // start the table
            let chatMessageContent = `<div style="color: white;"><div style="font-size: large; font-weight: bold;">${keys.get(result)}</div><table style="width: 100%;">`;
            // fill in the table rows <tr>
            actors.forEach(a => {
                chatMessageContent += `<tr style="line-height: 10px;"><td>${a.name}</td><td style="text-align: right; text-align: center;">${a.getRollData().traits[result].value}</td></tr>`;
            });
            // end the table
            chatMessageContent += `</table></div>`;

            // https://foundryvtt.com/api/classes/foundry.documents.ChatMessage.html
            ChatMessage.create({ content: chatMessageContent });
        }
    }
}).render({ force: true });