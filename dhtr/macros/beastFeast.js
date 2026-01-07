const players = 6;
const dice_sizes = {
    sweet: 4,
    salty: 6,
    bitter: 8,
    sour: 10,
    savory: 12,
    weird: 20
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function roll(dice, sides) {
    let res = 0;
    for (let i = 0; i < dice; i++) {
        res += getRandomIntInclusive(1, sides);
    }
    return res;
}

class Ingredient {
    constructor(args = {
        name: "name missing",
        sweet: 0,
        salty: 0,
        bitter: 0,
        sour: 0,
        savory: 0,
        weird: 0
    }) {
        this.name = args.name;
        this.sweet = args.sweet ? args.sweet : 0;
        this.salty = args.salty ? args.salty : 0;
        this.bitter = args.bitter ? args.bitter : 0;
        this.sour = args.sour ? args.sour : 0;
        this.savory = args.savory ? args.savory : 0;
        this.weird = args.weird ? args.weird : 0;
    }
}

const ingredients = [
    new Ingredient({
        name: 'Mushroom caps',
        bitter: 1,
        savor: 2
    }),
    new Ingredient({
        name: 'Wyvern tongue',
        sour: 1,
        savor: 1,
        weird: 1
    }),
    new Ingredient({
        name: 'Ooze marrow',
        sweet: 1,
        bitter: 1
    }),
    new Ingredient({
        name: 'Direbear meat',
        savory: 3
    }),
    new Ingredient({
        name: 'Acid dragon saliva',
        sour: 2
    }),
    new Ingredient({
        name: 'Cave boar milk',
        salty: 1,
        savory: 1
    }),
    new Ingredient({
        name: 'Rileroot',
        bitter: 1
    }),
    new Ingredient({
        name: 'Ogre kidney stone',
        sweet: 1,
        weird: 1
    })
];

const recipies = [
    {
        name: 'Steak Dinner', ingredients: [
            { name: 'Direbear meat', ammount: 1 },
            { name: 'Mushroom caps', ammount: 1 },
            { name: 'Ooze marrow', ammount: 1 }
        ]
    }
];

function get_pool(recipe) {
    let pool = {
        sweet: 0,
        salty: 0,
        bitter: 0,
        sour: 0,
        savory: 0,
        weird: 0
    }

    recipe.ingredients.forEach(i => {

        let ingredient = ingredients.find((ing) => ing.name === i.name);

        pool.sweet += ingredient.sweet * i.ammount;
        pool.salty += ingredient.salty * i.ammount;
        pool.bitter += ingredient.bitter * i.ammount;
        pool.sour += ingredient.sour * i.ammount;
        pool.savory += ingredient.savory * i.ammount;
        pool.weird += ingredient.weird * i.ammount;

    });

    return pool;
}

console.log(get_pool(recipies[0]));

console.log('Done.')