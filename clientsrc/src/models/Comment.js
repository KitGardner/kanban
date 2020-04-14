export default class Comment {
  constructor({ id = "", comment = "", creator = {}, taskId = "", boardId = "" } = {}) {
    this.id = id;
    this.comment = comment;
    this.creator = creator;
    this.taskId = taskId;
    this.boardId = boardId;
  }
}