const { default: axios } = require('axios');
const fs = require('fs');

const TOKEN = 'MLY|6166700796706876|14453d6b8a98398ddb1f46370d42dd56';
const IMG_LIMIT = 10;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
    for (let lat = -90; lat < 90; lat++) {
        for (let lng = -180; lng < 180; lng++) {
            getImages(lat, lng);
            await timer(60);
        }
    }
}
main();

async function getImages(lat, lng) {
    try {
        let a = await axios.get('https://graph.mapillary.com/images', {
            params: {
                access_token: TOKEN,
                fields: 'id,thumb_256_url,thumb_1024_url,computed_geometry',
                bbox: `${lng},${lat},${lng + 1},${lat + 1}`,
                limit: IMG_LIMIT
            }
        });
        if (a.data.data.length == 0) return;
        fs.writeFile(`map/${lat},${lng}.json`, JSON.stringify(a.data.data), 'utf-8', () => {});
        console.log(lat, lng);
    } catch (e) {
        console.log(`${lat}, ${lng} ${e.message}`);
    }
}

// async function downloadImage(imageID, imageURL) {
//     try {
//         axios({
//             method: 'get',
//             url: imageURL,
//             responseType: 'stream'
//         })
//             .then(function (response) {
//                 response.data.pipe(fs.createWriteStream(`img/${imageID}.jpg`));
//                 // console.log(imageID);
//             })
//             .catch((e) => {
//                 console.log(`downloadImage ${imageID} ${e.message}`);
//             });
//     } catch (e) {
//         console.log(`downloadImage ${imageID} ${e.message}`);
//     }
// }
