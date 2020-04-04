import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import boardsService from "../services/BoardsService";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("", this.getAllBoards)
      .get("/:id", this.getBoard)
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
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

}