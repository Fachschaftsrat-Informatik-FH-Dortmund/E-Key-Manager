const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get('/', controller.getStudenten);
router.post('/', controller.addStudent)
router.get('/:matrnr', controller.getStudent);
router.delete('/:matrnr', controller.deleteStudent);
router.put('/', controller.updateStudent);



module.exports = router;
