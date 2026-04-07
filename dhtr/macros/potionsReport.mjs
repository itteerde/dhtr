let actors = game.folders.getName("The Party").contents.filter(a => a.type === 'character');

let chatMessageContent = `
  <table>
    <tr>
      <th>Character</th>
      <th><img width="40px" src="icons/consumables/potions/potion-tube-corked-red.webp"/></th>
      <th><img width="40px" src="icons/consumables/potions/potion-tube-corked-green.webp"/></th>
    </tr>
`;

for (const actor of actors) {

    chatMessageContent += `
    <tr>
      <td>${actor.name.substring(0, 5)}</td>
      <td style="text-align: center;">${actor.items.find(i => i.name === 'Minor Health Potion') ? actor.items.find(i => i.name === 'Minor Health Potion').system.quantity : 0}</td>
      <td style="text-align: center;">${actor.items.find(i => i.name === 'Minor Stamina Potion') ? actor.items.find(i => i.name === 'Minor Stamina Potion').system.quantity : 0}</td>
    </tr>
  `;
    //actor.items.filter(i=>i.name.includes("Potion")).forEach(p=>console.log({character: actor.name, item: p.name, count: p.system.quantity}))
}

chatMessageContent += `
  </table>
`;

//ChatMessage.create({content: chatMessageContent, whisper: [game.user.id]})
//ChatMessage.create({content: chatMessageContent})
// https://foundryvtt.com/api/classes/foundry.applications.api.DialogV2.html
new foundry.applications.api.DialogV2({
    window: { title: "Potions" },
    content: chatMessageContent,
    buttons: [{
        action: "choice",
        label: "Report",
        default: true,
        callback: (event, button, dialog) => button.form.elements.choice
    }],
    submit: result => {
        ChatMessage.create({ content: chatMessageContent })
    }
}).render({ force: true });