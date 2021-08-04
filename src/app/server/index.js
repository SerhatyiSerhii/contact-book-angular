const express = require("express");

const app = express();

const port = 3000;

app.get("/getData", (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');

    res.json({
        "statusCode": 200,
        "statusMessage": "SUCCESS"
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})