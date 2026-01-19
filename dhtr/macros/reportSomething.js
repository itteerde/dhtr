let toChat = true;
let key = 'traits.finesse.value'; // 'traits.finesse.value'; 'experiences'
let label = 'finesse';


const keys = new Map([
    ['agility', 'Agility'],
    ['finesse', 'Finesse'],
    ['instinct', 'Instinct'],
    ['knowledge', 'Knowledge'],
    ['presence', 'Presence'],
    ['strength', 'Strength']
]);

const content = `
<form>
    <div class="form-group">
        <label for="num">Trait:</label>
        <div class="form-fields">
            <select id="trait">${[keys.keys()].reduce((acc, key) => { return acc + `<option value="${key}">${key}</option>` }, "")}</select>
        </div>
    </div>
</form>`;

const buttons = {
    traits: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "Traits",
        callback: async (html) => {
            const trait = html[0].querySelector("#trait").value;
            //const skill = TREP2eDB.skills.find(s => s.name === skillName);

            await ChatMessage.create({ content: "<h3>" + trait + "</h3><table>" + TRTacNet.shortenReportSkill(TRTacNet.reportSkill(skillName)).reduce((acc, e) => { return acc += `<tr><td>${e.name}</td><td>${e.roll}</td></tr>`; }, "") + "</table>" + `<div>Aptitude: ${skill.aptitude}</div><div>Types: ${skill.types.reduce((acc, t) => { return acc += t + ", " }, "")}</div>` });
            return;
        }
    }
}

new Dialog({ title: "Report Traits", content, buttons }).render(true);


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