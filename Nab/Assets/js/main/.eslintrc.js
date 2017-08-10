module.exports = {
	"root": true,
	"env": {
        "browser": true
    },
    "extends": "eslint:recommended",
	"globals": {
		"$": false,
		"enquire": false
	},
	"rules": {
		"curly": "error",
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
    }
};