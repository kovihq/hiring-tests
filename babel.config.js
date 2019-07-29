module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        
        "targets": {
            node:"current"
        }
      }
    ]
  ],
  "plugins": [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-private-methods",
        ]
};