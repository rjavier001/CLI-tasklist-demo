require("colors");
const {
  inquirerMenu,
  onPause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showCheckList,
} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");
const { saveDB, readDB } = require("./helpers/crudFile");

const main = async () => {
  let opt = "";

  const tasks = new Tasks();

  const taskDB = readDB();

  if (taskDB) {
    tasks.loadTaskFromArr(taskDB);
  }

  do {
    // Print Menu, retur option value
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.completeList();
        break;
      case "3":
        tasks.pendingList(true);
        break;
      case "4":
        tasks.pendingList(false);

        break;
      case "5":
        const ids = await showCheckList(tasks.listArray);
        tasks.CompletedToggle(ids);

        break;
      case "6":
        const id = await listOfTaskToDelete(tasks.listArray);
        if (id !== "0") {
          const ok = await confirm("Are u sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("\nTask Deleted");
          }
        }

        break;

      default:
        break;
    }
    saveDB(tasks.listArray);
    await onPause();
  } while (opt !== "0");
};

main();
