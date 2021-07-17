#!/usr/bin/env node

const yargs = require("yargs");

const cmdn = require("./cmdn");
const { cmdBuilder } = require("./constants");

yargs.command({
  command: "add",
  describe: "Add a new command",
  builder: cmdBuilder,  
  handler: (argv) => cmdn.add(argv.cmd, argv.desc),
});

yargs.command({
  command: "rm",
  describe: "Remove a command",
  builder: { c: cmdBuilder.c },
  handler: (argv) => cmdn.rm(argv.cmd),
});

yargs.command({
  command: "ls",
  describe: "List commands",
  handler: () => cmdn.ls(),
});

yargs.command({
  command: "find",
  describe: "Find a command",
  builder: { c: cmdBuilder.c },
  handler: (argv) => cmdn.find(argv.cmd),
});

yargs.version("0.0.1");
yargs.parse();
