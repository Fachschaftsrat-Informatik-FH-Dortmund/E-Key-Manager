const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAusleihe);
router.get('/all', controller.getAusleihe);
router.post('/', controller.addAusleihe)
router.post('/end', controller.endAusleihe)
router.put('/', controller.updateAusleihe);



module.exports = router;
