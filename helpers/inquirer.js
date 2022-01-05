const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "Select a option ",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Add task`,
      },
      {
        value: "2",
        name: `${"2.".green} Show task`,
      },
      {
        value: "3",
        name: `${"3.".green} Show completed task`,
      },
      {
        value: "4",
        name: `${"4.".green} Show pending task`,
      },
      {
        value: "5",
        name: `${"5.".green} To completed task`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Quit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=============================".green);
  console.log("          Options            ".white);
  console.log("============================= \n".green);
  const { option } = await inquirer.prompt(menuOptions);

  return option;
};

const onPause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `\nPress ${"ENTER".green} to continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Enter a value";
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

const listOfTaskToDelete = async (task = []) => {
  const choices = task.map((task, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0 ".green + "Cancel",
  });

  const optionMenu = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(optionMenu);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.startDate ? true : false,
    };
  });

  const optionMenu = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selections",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(optionMenu);
  return ids;
};

module.exports = {
  inquirerMenu,
  onPause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showCheckList,
};
