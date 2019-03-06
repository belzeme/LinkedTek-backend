module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "curly": [
      "error"
    ],
    "sort-vars": [
      "error"
    ],
    "no-var": [
      "error"
    ],
    "prefer-const": [
      "error"
    ],
    "prefer-destructuring": [
      "error", {
        "array": true,
        "object": true
      }, 
      {
        "enforceForRenamedProperties": false
      }
    ]
    
    
  }
};