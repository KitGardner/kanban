import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import boardsService from "../services/BoardsService";
import boardListsService from "../services/BoardListsService";
import tasksService from "../services/TasksService";
import commentsService from "../services/CommentsService";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("", this.getAllBoards)
      .get("/:id", this.getBoard)
      .get("/:boardId/lists", this.getBoardLists)
      .get("/:boardId/tasks", this.getBoardTasks)
      .get("/:boardId/comments", this.getBoardComments)
      .post("", this.createBoard)
      .put("/:id", this.updateBoard)
      .delete("/:id", this.deleteBoard);
  }

  async getAllBoards(req, res, next) {
    try {
      let userBoards = await boardsService.getUserBoards(req.userInfo);
      res.send(userBoards);
    } catch (error) {
      next(error);
    }

  }
  async getBoard(req, res, next) {
    try {
      let board = await boardsService.getBoardById(req.params.id, req.userInfo);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }
  async getBoardLists(req, res, next) {
    try {
      let boardLists = await boardListsService.getListsByBoardId(req.params.boardId, req.userInfo);
      res.send(boardLists);
    } catch (error) {
      next(error)
    }
  }

  async getBoardComments(req, res, next) {
    try {
      let boardComments = await commentsService.getBoardComments(req.params.boardId, req.userInfo);
      res.send(boardComments);
    } catch (error) {
      next(error);
    }
  }

  async getBoardTasks(req, res, next) {
    try {
      let boardTasks = await tasksService.getBoardTasks(req.params.boardId, req.userInfo);
      res.send(boardTasks);
    } catch (error) {
      next(error)
    }
  }
  async createBoard(req, res, next) {
    try {
      let createdBoard = await boardsService.createBoard(req.body, req.userInfo);
      res.send(createdBoard);
    } catch (error) {
      next(error);
    }

  }

  async updateBoard(req, res, next) {
    try {
      let updatedBoard = await boardsService.updateBoard(req.params.id, req.body, req.userInfo);
      res.send(updatedBoard);
    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      let result = await boardsService.deleteBoard(req.params.id, req.userInfo);
      res.send({ id: result });
    } catch (error) {
      next(error);
    }
  }

  // TODO Test all endpoints to ensure proper operation.
  // TODO think about adding collaborator logic to Profile controller to grab all boards that the user is a collaborator of.

}