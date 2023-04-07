const fs = require('fs');

async function main() {
    fileNames = fs.readdirSync('./map');
    files = fileNames.map((file) => {
        try {
            return require(`./map/${file}`);
        } catch {
            return undefined;
        }
    });

    files = files.filter((e) => e != undefined);
    files = files.flat();

    let files2 = [];
    let images = [];
    for (let i = 0; i < files.length; i++) {
        let obj = files[i];
        if (!obj.computed_geometry) continue;
        try {
            files2.push({ id: obj.id, url: obj.thumb_original_url, coordinates: obj.computed_geometry.coordinates });
            images.push(obj.id);
        } catch (e) {
            //console.log(e)
        }
    }

    console.log(files2);
    fs.writeFileSync('all.json', JSON.stringify(files2));
}

main();
