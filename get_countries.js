const { default: axios } = require('axios');
const fs = require('fs');

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

let d = fs.readFileSync('./all.json');
let json = JSON.parse(d);
main();
async function main() {
    for (let i = 8070; i < json.length; i++) {
        const image = json[i];
        if (!image) continue;
        getCountry(image.coordinates[0], image.coordinates[1], i);
        await timer(50);
    }
}
async function getCountry(long, lat, index) {
    try {
        if (Math.abs(lat) < 1e6) lat = 0;
        let country = '';
        if (Math.abs(lat) < 1 && Math.abs(long) < 1) {
            country = 'null';
        } else {
            const url = `https://api.geoapify.com/v1/geocode/reverse?lon=${long}&lat=${lat}&lang=en&apiKey=8923fefc90c24aa1bbe6bb22b302d39b `;
            let response = await axios({ method: 'get', url: url });
            country = response.data.features[0]?.properties.country || 'null';
        }
        fs.writeFileSync(`country/${index}.txt`, country);
    } catch (error) {
        console.log(`${[lat, long]} fucked up with ${error.message}`);
    }
}
