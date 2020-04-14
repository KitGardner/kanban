import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import commentsService from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .post("", this.createComment)
      .put("/:id", this.updateComment)
      .delete("/:id", this.deleteComment);
  }

  async createComment(req, res, next) {
    try {
      let newComment = await commentsService.createComment(req.body, req.userInfo)
      res.send(newComment);
    } catch (error) {
      next(error);
    }

  }
  async updateComment(req, res, next) {
    try {
      let updatedComment = await commentsService.updateComment(req.params.id, req.body, req.userInfo);
      res.send(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      let deleted = await commentsService.deleteComment(req.params.id, req.userInfo);
      res.send({ id: deleted.id });
    } catch (error) {
      next(error);
    }
  }

}