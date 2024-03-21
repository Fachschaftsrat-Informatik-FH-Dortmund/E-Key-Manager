const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/', controller.getEkeys);
router.post('/', controller.addEkey)
router.get('/:ausleihnr', controller.getEkeyById);
router.delete('/:ausleihnr', controller.deleteEkeyById);
router.put('/', controller.updateEkey);



module.exports = router;
