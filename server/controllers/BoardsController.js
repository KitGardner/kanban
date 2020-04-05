import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import boardsService from "../services/BoardsService";
import boardListsService from "../services/BoardListsService";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("", this.getAllBoards)
      .get("/:id", this.getBoard)
      .get("/:boardId/lists", this.getBoardLists)
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

  // TODO implement full delete for all objects. This delete should delete all children objects as well. NO ORPHANS!!
  // TODO Add Board Id to all objects. This way for any call we can verify if the user is the creator and or collaborator for this board before making changes.
  // TODO Test all endpoints to ensure proper operation.
  // TODO think about adding collaborator logic to Profile controller to grab all boards that the user is a collaborator of.

}