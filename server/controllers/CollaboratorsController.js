import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import collaboratorsService from "../services/CollaboratorsService";

export class CollaboratorsController extends BaseController {
  constructor() {
    super("api/collaborators");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(Auth0Provider.isAuthorized)
      .get("/:boardId", this.getCollaborators)
      .post("", this.addCollaborator)
      .delete("/:id", this.removeCollaborator);
  }


  async getCollaborators(req, res, next) {
    try {
      let collaborators = await collaboratorsService.getCollaborators(req.params.boardId);
      res.send(collaborators);
    } catch (error) {
      next(error);
    }

  }
  async addCollaborator(req, res, next) {
    try {
      let collaborator = await collaboratorsService.createCollaboration(req.body);
      res.send(collaborator);
    } catch (error) {
      next(error);
    }

  }

  async removeCollaborator(req, res, next) {
    try {
      let result = await collaboratorsService.deleteCollaboration(req.params.id);
      res.send(result.id);
    } catch (error) {
      next(error)
    }
  }
}