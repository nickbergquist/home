module.exports = {
    "env": {
		"browser": true,
		"node": true,
        "es6": true
    },
	"extends": "eslint:recommended",
	"globals": {
		// Angular
		"angular": false,

		// Angular mocks
		"module": false,
		"inject": false,

		// Jasmine
		"jasmine": false,
		"describe": false,
		"beforeEach": false,
		"afterEach": false,
		"it": false,
		"expect": false,

		// Protractor
		"browser": false,
		"element": false,
		"by": false
	},
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
	},
	"overrides": [
		{
			"files": ['**/*.spec.js'],
			"rules": {
				"no-unused-vars": 0
			}
		}
	]
};