import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:taskId", this.getTaskComments)
      .post("", this.createComment)
      .put("/:boardId", this.updateComment)
      .delete("/:id", this.deleteComment);
  }

  async getTaskComments(req, res, next) {
    try {
      // FIXME MUST be abstracted to a service
      let boards = await dbContext.Boards.find({ creatorEmail: req.userInfo.email });
      res.send(boards);
    } catch (error) {
      next(error);
    }

  }
  async createComment(req, res, next) {
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

  async updateComment(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

}