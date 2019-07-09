module.exports = function (config) {
  config.set({
    mutator: {
      name: 'javascript',
      excludedMutations: [
        'BooleanSubstitution',
        'StringLiteral'
      ]
    },
    packageManager: "yarn",
    reporters: [
      "html",
      "clear-text",
      "progress"
    ],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "all",
    mutate: [
      'src/**/*.js'
    ],
    files: [
      'src/**/*.js',
      'test/*.js'
    ]
  });
};
