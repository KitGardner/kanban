import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:id", this.getTaskById)
      .get("/:listId", this.getListTasks)
      .post("", this.createTask)
      .put("/:boardId", this.updateTask)
      .delete("/:id", this.deleteTask);
  }

  async getTaskById(req, res, next) {
    try {
      // FIXME MUST be abstracted to a service
      let boards = await dbContext.Boards.find({ creatorEmail: req.userInfo.email });
      res.send(boards);
    } catch (error) {
      next(error);
    }

  }
  async getListTasks(req, res, next) {
    try {
      // FIXME MUST be abstracted to a service
      let board = await dbContext.Boards.findOne({
        _id: req.params.boardId,
        creatorEmail: req.userInfo.email
      });
      res.send(board);
    } catch (error) {
      next(error);
    }

  }
  async createTask(req, res, next) {
    try {
      // FIXME MUST be abstracted to a service
      // NOTE ONLY TRUST THE SERVER TO DO THIS
      req.body.creatorEmail = req.userInfo.email;
      let board = await dbContext.Boards.create(req.body);
      res.send(board);
    } catch (error) {
      next(error);
    }

  }

  async updateTask(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

}