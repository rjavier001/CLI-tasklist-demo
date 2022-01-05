// const { rejects } = require("assert");
// const { resolve } = require("path");

require("colors");

const displayMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=============================".green);
    console.log("          Options            ".green);
    console.log("============================= \n".green);

    console.log(`${"1.".green} Add Task`);
    console.log(`${"2.".green} Show Task`);
    console.log(`${"3.".green} Show completed Task`);
    console.log(`${"4.".green} Show pending Task`);
    console.log(`${"5.".green} To comprlete Task`);
    console.log(`${"6.".green} Delete Task`);
    console.log(`${"0.".green} Quit\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPick a option: `, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const onPause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPress ${"ENTER".green} to continue`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = {
  displayMenu,
  onPause,
};
