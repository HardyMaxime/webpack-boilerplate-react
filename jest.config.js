module.exports = {
        transform: {
            "^.+\\.(js|jsx)$": "babel-jest",
            ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
        },
        setupFilesAfterEnv: [
            "<rootDir>/src/js/src/setupTests.js"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "jsx"
        ],
        testRegex: "spec.*\\.js$",
        moduleNameMapper: {
            "^@/(.*)$": "<rootDir>"
        }
    }
