const monsters = require(`../jsons/monsters.json`),
    asciiTable = require(`ascii-table`),
    game = require(`../index`);

let player = db.get(`player`);

function rdmMonster() {
    let randomIndex = Math.floor(Math.random() * monsters.length);
    let monster = monsters[randomIndex];

    return monster;
}

let monster = rdmMonster(),
    status = [];

while (monster.lvl > player.lvl) {
    monster = rdmMonster();
}

status.push(monster)
status = status[0];

function atkEnemy() {
    let dxt = Math.floor(Math.random() * status.dxt),
        enemyDxt = Math.floor(player.dxt / 2);

    console.clear();

    let dmg = dxt >= enemyDxt ? Math.floor(status.atk - player.def) : 0;
    db.subtract('player/hp', dmg);

    fight();
    console.log(`Dano sofrido: ${dmg}`);
}

function atk() {
    let dxt = Math.floor(Math.random() * player.dxt) + parseInt(player.lvl),
        enemyDxt = Math.floor(status.dxt / 2);

    console.clear();

    let dmg = dxt >= enemyDxt ? Math.floor(player.atk - status.def) : 0;
    status.hp -= dmg;

    fight();
    atkEnemy();
    console.log(`Dano causado: ${dmg}`);
}


function fight() {
    let enemy = new asciiTable(`${status.name}`)
        .addRow("hp", ` ${status.maxHp}/${status.hp}`)
        .addRow("atk", status.atk)
        .addRow("def", status.def)

    let you = new asciiTable(player.name)
        .addRow("hp", `${player.maxHp}/${player.hp}`)
        .addRow("atk", player.atk)
        .addRow("def", player.def)

    console.clear();

    if (player.hp === 0 || player.hp < 0) {
        db.clear();
        console.log(`Voce perdeu, seu progresso foi deletado!`);
        return game.start();
    } else if (status.hp === 0 || status.hp < 0) {
        let xp = Math.floor(Math.random() * status.xp);
        db.add(`player/xp`, xp);
        status = [];
        console.log(`Voce venceu, parabens!`);
        return game.action(); // Mostrar o menu de ação
    } else {
        console.log(`${enemy.toString()} \n${you.toString()}`);

        rl.question(`1.atacar   2.inventario   3.fugir\n`, (act) => {
            switch (act) {
                case '1':
                    console.clear();
                    atk();
                    break;
                default:
                    console.clear();
                    console.log(`acao invalida!`);
                    atkEnemy();
                    break;
            }
        })
    }
}

module.exports = fight();