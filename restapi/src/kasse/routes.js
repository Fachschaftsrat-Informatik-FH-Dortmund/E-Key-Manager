const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/kassenstand', controller.getKassenstand);
router.get('/', controller.getKasse);
router.get('/frei/kassenstand', controller.getFreiekassenstand);
router.get('/frei', controller.getFreieKasse);
router.post('/frei', controller.abbuchenKasse);



module.exports = router;
