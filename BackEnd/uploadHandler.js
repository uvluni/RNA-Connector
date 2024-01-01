const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      const date = new Date();
      const formattedDate = `${('0' + date.getDate()).slice(-2)}_${('0' + (date.getMonth() + 1)).slice(-2)}_${date.getFullYear()}-${('0' + date.getHours()).slice(-2)}_${('0' + date.getMinutes()).slice(-2)}`;
      const fileName = file.originalname.split('.')[0];
      const fileExtension = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, `${fileName}-${formattedDate}${fileExtension}`);
    }
  })
});

module.exports = { upload };
