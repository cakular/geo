const { default: axios } = require("axios");
const fs = require("fs");

const timer = (ms) => new Promise((res)=>setTimeout(res, ms))

main();
async function main() {
  let d = fs.readFileSync("all.json");
  let json = JSON.parse(d);
  for (let i = 0; i < json.length; i++) {
    const image = json[i];
    if (!image) continue;
    getImage(image.id, image.url_256);
    await timer(60)
  }
}

async function getImage(imageId, url) {
  try {
    axios({ method: "get", url: url, responseType: "stream" })
      .then((response) => {
        response.data.pipe(fs.createWriteStream(`img2/${imageId}.jpg`));
      })
      .catch((error) =>
        console.log(`${imageId} fucked up with ${error.message}`)
      );
  } catch (error) {
    console.log(`${imageId} fucked up with ${error.message}`);
  }
}
