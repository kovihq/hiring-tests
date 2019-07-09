module.exports = {
    reporters: [
        'default',
        ["jest-html-reporters", {
            "publicPath": `./reports/unit`,
            "filename": "report.html",
            "expand": true
        }]
    ],
    testMatch: [`**/test/*.js`]
};
