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
dialogContent += `<div style="display: flex; justify-content: center;align-items: center;"><input type="checkbox" id="toChat" name="toChat" value="true"><label for="toChat">Report to Chat</label></div><div style="font-size: x-small">If not checked a local prompt will be displayed.</div>`;

// https://foundryvtt.com/api/classes/foundry.applications.api.DialogV2.html
const response = await foundry.applications.api.DialogV2.wait({
    window: { title: "Traits" },
    content: dialogContent,
    buttons: [{
        action: "choice",
        label: "Report",
        default: true,
        callback: (event, button, dialog) => new foundry.applications.ux.FormDataExtended(button.form).object // makes available the named (name) html elements
    }]
});
// use for debugging:
// console.log(response);

// https://foundryvtt.com/api/classes/foundry.documents.Actor.html
//let actors = game.folders.getName("The Party").contents.filter(a => a.type === "character").sort((a, b) => a.name.localeCompare(b.name));
let actors = game.users.filter(u => u.active && !u.isGM && u.character).map(u => u.character).sort((a, b) => a.name.localeCompare(b.name));

// build the HTML for the ChatMessage content
// start the table
let chatMessageContent = `
                <div style="color: white; font-size: large; font-weight: bold;">${keys.get(response.choice)}</div>
                <table style="width: 100%;">
                `;
// fill in the table rows <tr>
actors.forEach(a => {
    chatMessageContent += `
                    <tr style="line-height: 10px;">
                        <td>${a.name}</td><td style="text-align: right; text-align: center;">${a.getRollData().traits[response.choice].value}</td>
                    </tr>
                    `;
});
// end the table
chatMessageContent += `</table></div>`;

if (response.toChat === 'true') {
    // https://foundryvtt.com/api/classes/foundry.documents.ChatMessage.html
    ChatMessage.create({ content: chatMessageContent });
} else {
    await foundry.applications.api.DialogV2.prompt({
        content: chatMessageContent,
        rejectClose: false,
        modal: true,
        ok: {}
    });
}