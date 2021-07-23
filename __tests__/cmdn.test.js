const { load, save, add, rm } = require("../bin/cmdn");

test("Loading commands for the first time", () => {
  const cmds = load();
  expect(cmds).toStrictEqual([]);
});

test("Loading commands", () => {
  const cmds = [{ cmd: "git status" }];
  save(cmds);
  expect(load()).toStrictEqual(cmds);
});

test("Adding a command", () => {
  add("git merge");
  expect(load()).toStrictEqual([{ cmd: "git status" }, { cmd: "git merge" }]);
});

test("Adding a command with description", () => {
  add("git rebase", "Rebase current branch");
  expect(load()).toStrictEqual([
    { cmd: "git status" },
    { cmd: "git merge" },
    { cmd: "git rebase", desc: "Rebase current branch" },
  ]);
});

test("Adding a duplicate command", () => {
  add("git status");
  expect(load()).toStrictEqual([
    { cmd: "git status" },
    { cmd: "git merge" },
    { cmd: "git rebase", desc: "Rebase current branch" },
  ]);
});

test("Removing a command", () => {
  rm("git status");
  expect(load()).toStrictEqual([
    { cmd: "git merge" },
    { cmd: "git rebase", desc: "Rebase current branch" },
  ]);
  expect(load()).tostri;
});

test("Removing all commands", () => {
  rm("*");
  expect(load()).toStrictEqual([]);
});
