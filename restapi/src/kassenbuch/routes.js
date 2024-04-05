const { Router } = require("express");
const controller = require('./controller');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination:'./src/tmp-files',
  filename:(req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage
})

const router = Router();

router.get('/:id', controller.getKassenbuchEintrag);
router.post('/', upload.single('file'), controller.createKassenbuchEintrag);



module.exports = router;
