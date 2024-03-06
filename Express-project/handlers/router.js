const fs = require('fs');

module.exports = async(app) => {
    let path = fs.readdirSync('./pages/').filter(x => x.endsWith('.js'));

    for (let file of path) {
        const route = require(`../pages/${file}`),
            routePath = file === 'index.js' ? '/' : `/${file.slice(0, -3)}`;

        app.use(routePath, route);
    }
}