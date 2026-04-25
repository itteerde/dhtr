const substr = 'Milestone';

let html = `
    <div>${substr}</div>
    <table>
    `;

game.folders.getName("The Party").contents.filter(a => a.type === 'character').filter(c => c.items.contents.find(i => i.name.includes(substr))).map(e => ({ name: e.name, q: e.items.contents.find(i => i.name.includes(substr)).system.quantity })).forEach(s => html += `<tr><td>${s.name}</td><td>${s.q}</td></tr>`);

html += `</table>`;

ChatMessage.create({ content: html });
