const homedir = require("os").homedir();

module.exports = {
  cmdBuilder: {
    c: {
      alias: "cmd",
      describe: "Command",
      demandOption: true,
      type: "string",
    },
    d: {
      alias: "desc",
      describe: "Command description",
      demandOption: false,
      type: "string",
    }
  },
  msgs: {
    success: {
      add: "Command added!",
      rm: "Command removed!",
      ls: "",
      find: "",
    },
    failure: {
      add: "This command is already on the list!",
      rm: "Command to remove not found!",
      ls: "No commands",
      find: "Command/s not found!",
    },
  },
  msgTypes: { success: "success", failure: "failure" },
  maxLineLength: 50,
  spacing: 5,
  cmdsPath: `${homedir}/.cmds.json`,
};
