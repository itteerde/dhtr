let toChat = true;
let key = 'traits.finesse.value'; // 'traits.finesse.value'; 'experiences'
let label = 'finesse';

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}

let actors = game.folders.getName("The Party").contents.filter(a => a.type === "character");

let result = [];

actors.forEach(a => {
    result.push({
        name: a.name,
        traits: a.getRollData(),
        keyData: getDescendantProp(a.getRollData(), key)
    });
});

console.log(result);

if (toChat) {
    let report = `<div><table><tr><th>Name</th><th>${label ? label : key}</th></tr>`;
    result.forEach(e => {
        report += `<tr><td>${e.name}</td><td>${typeof e.keyData === 'object' ? JSON.stringify(e.keyData) : e.keyData}</td></tr>`
    });
    report += `</table></div>`;

    ChatMessage.create({ content: report });
}