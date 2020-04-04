import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class CollaboratorsController extends BaseController {
  constructor() {
    super("api/collaborators");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:boardId", this.getCollaborators)
      .post("", this.addCollaborator);
  }


  async getCollaborators(req, res, next) {
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
  async addCollaborator(req, res, next) {
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
}