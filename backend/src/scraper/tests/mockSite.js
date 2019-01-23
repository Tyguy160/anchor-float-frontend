const fs = require("fs");
const path = require("path");

const markup = fs.readFileSync(path.join(__dirname, "./mockSite.html"));

module.exports.markup = markup;
