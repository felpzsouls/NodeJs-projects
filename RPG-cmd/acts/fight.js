const monsters = require(`../jsons/monsters.json`),
    asciiTable = require(`ascii-table`);

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

function atk() {
    let dxt = Math.floor(Math.random() * player.dxt),
        enemyDxt = Math.floor(status.dxt / 2);

    if(status.hp <= 0) {
        let xp = Math.floor(Math.random() * status.xp);
        db.add(`player.xp`, xp);
        console.log(`Voce venceu, parabens!`);
        return action();
    }

    if (dxt >= enemyDxt) {
        let dmg = Math.floor(player.atk - status.def);
        status.hp -= dmg;

        fight();
        atkEnenmy();
        console.log(`Dano causado: ${dmg}`);
    } else {
        atkEnemy()
        console.log(`Voce errou!`)
    }
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


module.exports = fight();