const express = require("express");
const router = express.Router();

// TODO: add endpoints to interact with energy listings database table

router.get('/list_sellers', (req, res) => {
    const str = [{
        "name": "grace",
        "energy": "3"
    }];
    res.end(JSON.stringify(str));
});




module.exports = router;
