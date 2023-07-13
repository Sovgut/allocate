module.exports = {
    preset: 'ts-jest',
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    testEnvironment: 'node',
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
};