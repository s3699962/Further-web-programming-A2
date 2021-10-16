const fs = require('fs');
var uuid = require('uuid');

// function to decode an uploaded image from base64 and save to local machine tmp folder
module.exports = {
  convertImage (image) {
    if (!image) return null;
    //decode base-64 image
    let buff = new Buffer(image, 'base64');

    //save image
    const id = uuid.v4();
    const imagePath = `/tmp/images/${id}`;
    fs.writeFileSync(imagePath, buff);

    return id
  },
  unconvertImage (uuid) {
     if (!uuid) return null;
     const buff = fs.readFileSync("/tmp/images/" + uuid);
     return buff.toString("base64")
   }
}