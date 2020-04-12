export default class Comment {
  constructor({ comment = "", creator = {}, taskId = "" } = {}) {
    this.comment = comment;
    this.creator = creator;
    this.taskId = taskId;
  }
}