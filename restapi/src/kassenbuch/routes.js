const { Router } = require("express");
const controller = require('./controller');
const multer = require("multer");
const path = require('path');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*const isValid = MIME_TYPE_MAP[file.mimeType];
    let error = new Error("Dateityp wurde nicht implementiert");
    if(isValid) {
      error=null;
    }*/
    cb(null, "restapi/src/tmp-files");
  },
  filename: (req, file, cb)  => {
    const name = file.originalName.toLocaleLowerCase().split(' ').join('-');
    //const ext = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + '-' + Date.now())
  }
})

const router = Router();

router.get('/:id', controller.getKassenbuchEintrag);
router.post('/', multer({storage: storage}).single("datei"), controller.createKassenbuchEintrag);



module.exports = router;
