const amogus = require('./amogus.json');
const fs = require('fs');
amogus.map((obj) => {
    if (!obj) return;
    obj.lat = obj.coordinates[1];
    obj.lng = obj.coordinates[0];
    delete obj.coordinates;

    obj.location_id = `${roundto10(obj.lat + 90).padStart(3, '0')}${roundto10(obj.lng + 180).padStart(3, '0')}`;
});
fs.writeFileSync(`./amogus2.json`, JSON.stringify(amogus));
function roundto10(i) {
    return Math.floor(i / 10) * 10 + '';
}
