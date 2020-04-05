import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import boardListsService from "../services/BoardListsService";
import tasksService from "../services/TasksService";

export class BoardListsController extends BaseController {
  constructor() {
    super("api/boardLists");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:listId/tasks", this.getListTasks)
      .post("", this.createBoardList)
      .put("/:Id", this.updateBoardList)
      .delete("/:id", this.deleteBoardList);
  }

  async getListTasks(req, res, next) {
    try {
      let listTasks = await tasksService.getListTasks(req.params.listId, req.userInfo);
      res.send(listTasks);
    } catch (error) {
      next(error)
    }
  }
  async createBoardList(req, res, next) {
    try {
      let createdList = await boardListsService.createBoardList(req.body, req.userInfo);
      res.send(createdList);
    } catch (error) {
      next(error);
    }
  }

  async updateBoardList(req, res, next) {
    try {
      let updatedBoardList = await boardListsService.updatedBoardList(req.body, req.userInfo, req.params.id);
      res.send(updatedBoardList);
    } catch (error) {
      next(error);
    }
  }

  async deleteBoardList(req, res, next) {
    try {
      let deleted = await boardListsService.deleteBoardList(req.params.id, req.userInfo);
      res.send(deleted.id);
    } catch (error) {
      next(error);
    }
  }

}