const fs = require("fs");
const homedir = require("os").homedir();
const { execSync } = require("child_process");

const { cmdsPath } = require("../bin/constants");

console.log("backing up cmds.json");
const cmdsBackup = `${homedir}/.cmds.backup.json`;
fs.renameSync(cmdsPath, cmdsBackup);

execSync("npm run jest");

console.log("\nrestoring cmds.json");
fs.rmSync(cmdsPath);
fs.renameSync(cmdsBackup, cmdsPath);
