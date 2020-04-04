import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("", this.getAllBoards)
      .get("/:boardId", this.getBoard)
      .post("", this.createBoard)
      .put("/:boardId", this.updateBoard)
      .delete("/:id", this.deleteBoard);
  }

  async getAllBoards(req, res, next) {
    try {
      // FIXME MUST be abstracted to a service
      let boards = await dbContext.Boards.find({ creatorEmail: req.userInfo.email });
      res.send(boards);
    } catch (error) {
      next(error);
    }

  }
  async getBoard(req, res, next) {
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
  async createBoard(req, res, next) {
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

  async updateBoard(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

}