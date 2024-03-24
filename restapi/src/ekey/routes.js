const { Router } = require("express");
const controller = require('./controller');

const router = Router()

router.get('/', controller.getEkeysdata);
router.get('/count', controller.getEkeyscount);
router.post('/', controller.addEkey)
router.post('/sperren', controller.sperreEkey)
//TODO: router.post('/entsperren', controller.sperreEkey)
router.post('/zuruecknehmen', controller.zurueckEkey)
router.get('/:ekeyID', controller.getEkeyById);
router.delete('/:ekeyID', controller.deleteEkeyById);
router.put('/', controller.updateEkey);



module.exports = router;
