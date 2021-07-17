const fs = require("fs");
const _ = require("lodash");

const { msgs, msgTypes, cmdsPath } = require("./constants");
const { logMsg, listCmds } = require("./utils");

const load = () => {
  try {
    const cmdsBuffer = fs.readFileSync(cmdsPath);
    const cmdsJson = _.toString(cmdsBuffer);
    return JSON.parse(cmdsJson);
  } catch (error) {
    return [];
  }
};

const save = (cmds) => {
  const cmdsJson = JSON.stringify(cmds);
  fs.writeFileSync(cmdsPath, cmdsJson);
};

const add = (cmd, desc) => {
  const cmds = load();
  const isNew = _.some(cmds, (curr) => _.toLower(curr.cmd) !== _.toLower(cmd));

  if (_.isEmpty(cmds) || isNew) {
    cmds.push({ cmd, desc });
    save(cmds);
    logMsg(msgs.success.add, msgTypes.success);
  } else {
    logMsg(msgs.failure.add, msgTypes.failure);
  }
};

const rm = (cmd) => {
  if (cmd === "*") {
    save([]);
    logMsg(msgs.success.rm, msgTypes.success);
    return;
  }

  const cmds = load();
  const cmdsToKeep = _.reject(
    cmds,
    (curr) => _.toLower(curr.cmd) === _.toLower(cmd)
  );
  const removed = cmds.length > cmdsToKeep.length;

  if (removed) {
    save(cmdsToKeep);
    logMsg(msgs.success.rm, msgTypes.success);
  } else {
    logMsg(msgs.failure.rm, msgTypes.failure);
  }
};

const ls = () => {
  const cmds = load();

  if (!_.isEmpty(cmds)) {
    listCmds(cmds);
  } else {
    logMsg(msgs.failure.ls, msgTypes.failure);
  }
};

const find = (cmd) => {
  const cmds = load();
  const foundCmds = _.filter(cmds, (curr) =>
    _.includes(_.toLower(curr.cmd), _.toLower(cmd))
  );

  if (!_.isEmpty(foundCmds)) {
    listCmds(foundCmds);
  } else {
    logMsg(msgs.failure.find, msgTypes.failure);
  }
};

module.exports = {
  load,
  save,
  add,
  rm,
  ls,
  find,
};
