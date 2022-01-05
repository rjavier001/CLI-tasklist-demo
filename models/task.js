const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  description = "";
  startDate = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.startDate = null;
  }
}

module.exports = Task;
