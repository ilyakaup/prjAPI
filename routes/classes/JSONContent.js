const fs = require('fs');

class JSONContent {
  static getData(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf-8',
        (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        });
    });
  }

  static async getItem(filename, id) {
    const data = await JSONContent.getData(filename);
    const item = data.find((dataItem) => dataItem._id === id);
    return item;
  }
}

module.exports = JSONContent;
