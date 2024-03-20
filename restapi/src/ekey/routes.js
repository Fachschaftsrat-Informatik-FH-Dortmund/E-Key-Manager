const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/', controller.getEkeys);
router.post('/', controller.addEkey)
router.get('/:ekeyID', controller.getEkeyById);
router.delete('/:ekeyID', controller.deleteEkeyById);
router.put('/', controller.updateEkey);



module.exports = router;
