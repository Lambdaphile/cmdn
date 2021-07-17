const chalk = require("chalk");
const _ = require("lodash");

const { msgTypes, maxLineLength, spacing } = require("./constants");

const logMsg = (msg, msgType) => {
  const color = msgType === msgTypes.success ? "green" : "red";
  console.log(chalk[color].inverse(msg));
};

const getSpaces = (maxCmdLength, cmdLength) => {
  return _.join(
    _.times(maxCmdLength - cmdLength + spacing, () => " "),
    ""
  );
};

const listCmds = (cmds) => {
  const max = _.reduce(
    cmds,
    (max, curr) => (curr.cmd.length > max.cmd.length ? curr : max),
    { cmd: "" }
  );
  const maxCmdLength = max.cmd.length;
  const cmdsLength = cmds.length - 1;

  if (maxCmdLength <= maxLineLength) {
    _.forEach(cmds, ({ cmd, desc = "No description" }) => {
      const spaces = getSpaces(maxCmdLength, cmd.length);
      console.log(cmd + spaces + desc);
    });
  } else {
    _.forEach(cmds, ({ cmd, desc = "No description" }, i) => {
      console.log(`${cmd}\n${desc}${i < cmdsLength ? "\n" : ""}`);
    });
  }
};

module.exports = {
  logMsg,
  listCmds,
};
