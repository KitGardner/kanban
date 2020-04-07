import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import tasksService from "../services/TasksService";
import commentsService from "../services/CommentsService";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:id", this.getTaskById)
      .get("/:taskId/comments", this.getTaskComments)
      .post("", this.createTask)
      .put("/:id", this.updateTask)
      .delete("/:id", this.deleteTask);
  }

  async getTaskById(req, res, next) {
    try {
      let task = await tasksService.getTaskById(req.params.id, req.userInfo);
      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async getTaskComments(req, res, next) {
    try {
      let comments = await commentsService.getCommentsForTask(req.params.taskId);
      res.send(comments);
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      let newTask = await tasksService.createTask(req.body, req.userInfo);
      res.send(newTask);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      let updatedTask = await tasksService.updateTask(req.params.id, req.body, req.userInfo);
      res.send(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      let deleted = await tasksService.deleteTask(req.params.id, req.userInfo);
      res.send(deleted.id);
    } catch (error) {
      next(error);
    }
  }

}