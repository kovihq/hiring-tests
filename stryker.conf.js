module.exports = function (config) {
    config.set({
        mutator: "javascript",
        mutate: ["libs/js/*.js"],
        packageManager: "npm",
        reporters: ["html", "clear-text", "progress"],
        testRunner: "jest",
        transpilers: [],
        coverageAnalysis: "off"
    });
};
