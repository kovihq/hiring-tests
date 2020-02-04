const express = require('express');
const arrayCommonElements = require('./src/arrayCommonElements');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    if (! req.headers.hasOwnProperty("payload")) {
        res.status(400);
        res.send("Payload missing");
    }
    try {
        const payload = JSON.parse(req.headers.payload);

        if (!payload.hasOwnProperty("array1") || !payload.hasOwnProperty("array2")) {
            res.status(400);
            res.send("Malformed payload");
            return false;
        }

        if (!Array.isArray(payload.array1) || !Array.isArray(payload.array2)) {
            res.status(400);
            res.send("Malformed payload");
            return false;
        }

        res.send(arrayCommonElements(payload.array1, payload.array2).join(", "));
    }
    catch {
        res.status(400);
        res.send("Invalid payload");
    }
})

app.listen(port, () => console.log(`Running application on port ${port}`))
