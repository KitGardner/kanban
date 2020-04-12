export default class Task {
  constructor({ id = "", name = "", description = "", creator = {}, boardListId = "", boardId = "", comments = [] } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creator = creator;
    this.boardListId = boardListId;
    this.boardId = boardId;
    this.comments = comments
  }
}