const fs = require('fs');
let all = require('./all.json');
async function main() {
    let fileNames = fs.readdirSync('./country');
    let arr = [];
    fileNames.forEach((file) => {
        try {
            // arr[parseInt(file)] = fs.readFileSync(`./country/${file}`);
            arr[parseInt(file)] = fs.readFileSync(`./country/${file}`, 'utf-8');
        } catch {
            arr[parseInt(file)] = undefined;
        }
    });

    for (let i = 0; i < all.length; i++) {
        if (all[i]) all[i].country = arr[i];
    }

    fs.writeFileSync('amogus.json', JSON.stringify(all));
}

main();
