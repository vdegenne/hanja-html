const fs = require('fs');
const path = require('path');

const json = [];
fs.readdirSync(__dirname).forEach(f => {
  if (!f.endsWith('bmp')) {
    return;
  }
  json.push(f);
});


fs.writeFile(path.join(__dirname, 'screenshots.json'), JSON.stringify(json));