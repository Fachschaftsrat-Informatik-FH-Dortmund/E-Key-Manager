const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAusleihen);
router.post('/', controller.addAusleihe)
router.get('/:ausleihnr', controller.getAusleihe);
router.delete('/:ausleihnr', controller.deleteStudent);
router.put('/', controller.updateAusleihe);



module.exports = router;
