
var router = express();

var express = require('express'),
router = express.Router();

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(expAutoSan.all);

module.exports = router;