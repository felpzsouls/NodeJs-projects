const database = require(`kitsune-database`),
    readline = require('readline'),
    asciiTable = require(`ascii-table`);

global.db = new database("jsons/db", { replacer: null, space: 2, path: "optional", split: "/" });
global.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let player = db.get(`player`)

function start() {
    console.log(`Seja bem vindo ao Felpz RPG Cmd.`);
    rl.question(`Qual eh seu nome? \n`, (name) => {

        if (name.length < 3) {
            console.clear();
            start();
            return console.log(`Seu nome tem menos de 3 letras?`);
        };

        console.log(`Prazer em conhece-lo ${name}, se prepare para a sua aventura!`);
        db.set(`player/name`, name);
        db.set(`player/lvl`, 1);
        db.set(`player/nextLvl`, 100);
        db.set(`player/xp`, 0);
        db.set(`player/maxHp`, 30);
        db.set(`player/hp`, 30);
        db.set(`player/atk`, 1);
        db.set(`player/def`, 0);
        db.set(`player/dxt`, 5)
        db.set(`player/coins`, 0);
        act;
    })
}

function status() {
    console.clear();
    let table = new asciiTable(`${player.name}  Hp${player.hp}/${player.maxHp}`);
    table.addRow("", 'Level', player.lvl)
        .addRow("", 'Xp', `${player.xp}/${player.nextLvl}`)
        .addRow("", `Atk`, player.atk)
        .addRow("", `Def`, player.def)
        .addRow("", `Coins`, player.coins)

    console.log(table.toString());
    rl.question(`1. Voltar \n`, (act) => {
        switch (act) {
            case '1':
                console.clear();
                action();
                break;
            default:
                status();
                console.log(`opcao invalida`);
                break;
        }
    })
};

function fight() {
    require(`./acts/fight`)
}

function action() {
    console.log(`O que gostaria de fazer?`);
    console.log(`1. lutar   2. status   3. inventario   4. loja   5. sair`)
    rl.question(`O que fazer?\n`, (act) => {
        switch (act) {
            case '1':
                console.clear();
                fight();
                break;
            case '2':
                console.clear();
                status();
                break;
            case '5':
                process.exit(1);
                break;
            default:
                console.clear();
                console.log(`opcao invalida.`);
                action();
                break;
        }
    })
}

function game() {
    let player = db.get(`player`);

    if (player === undefined) {
        return start();
    } else {
        return action();
    };
}

game()