var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/data', function(req, res) {
    var data = req.body;
    console.log(data);
    res.send('Data received:' + data.data);
});

module.exports = router;
