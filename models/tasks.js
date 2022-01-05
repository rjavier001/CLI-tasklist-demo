const Task = require("./task");

class Tasks {
  _list = {};

  get listArray() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }
  loadTaskFromArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._list[tarea.id] = tarea;
    });
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;
  }
  completeList() {
    console.log();
    this.listArray.forEach((task, i) => {
      const idx = `${i + 1}.`.green;
      const { description, startDate } = task;
      const state = startDate ? "Done".green : "Pending".red;
      console.log(`${idx} ${description} :: ${state}`);
    });
  }
  pendingList(done = true) {
    console.log();
    let count = 0;
    this.listArray.forEach((task) => {
      const { description, startDate } = task;
      const state = startDate ? "Done".green : "Pending".red;
      if (done) {
        if (startDate) {
          count += 1;
          console.log(
            `${count + ".".green} ${description} :: ${startDate.green}`
          );
        }
      } else {
        if (!startDate) {
          count += 1;
          console.log(`${count + ".".green} ${description} :: ${state}`);
        }
      }
    });
  }
  CompletedToggle(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.startDate) {
        task.startDate = new Date().toString();
      }
    });
    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].startDate = null;
      }
    });
  }
}
module.exports = Tasks;
