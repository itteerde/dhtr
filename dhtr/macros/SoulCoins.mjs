
let html = `
    <div>Soul Coins</div>
    <table>
    `;

game.folders.getName("The Party").contents.filter(a => a.type === 'character').filter(c => c.items.contents.find(i => i.name.startsWith('Soul Coin'))).map(e => ({ name: e.name, coins: e.items.contents.find(i => i.name.startsWith('Soul Coin')).system.quantity })).forEach(s => html += `<tr><td>${s.name}</td><td>${s.coins}</td></tr>`);

html += `</table>`;

ChatMessage.create({ content: html });
