export default class BoardList {
  constructor({ id = "", name = "", description = "", boardId = "", creator = {}, tasksList = [] } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.boardId = boardId;
    this.creator = creator;
    this.tasksList = tasksList;
  }
}