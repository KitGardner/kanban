import { dbContext } from "../db/DbContext";
import { BadRequest, Unexpected } from "../utils/Errors";

class CollaboratorsService {
  async deleteCollaboration(id) {
    // TODO Add logic about who can remove collaborators
    return await dbContext.Collaborators.findByIdAndRemove(id);
  }

  async createCollaboration(collabData, loadedProfile = null) {
    // TODO Add logic about who can add collaborators to a project

    if (!loadedProfile) {
      let profile = await dbContext.Profile.find({ email: collabData.email });
      if (profile.length == 0) {
        throw new BadRequest("Could not add collaborator. Did not find a profile with email " + collabData.email);
      }

      if (profile.length > 1) {
        throw new Unexpected("Multiple accounts were found for email " + collabData.email);
      }

      loadedProfile = profile[0];
    }

    return await dbContext.Collaborators.create({ profile: loadedProfile.id, board: collabData.board });
  }
  async getCollaborators(boardId) {
    return await dbContext.Collaborators.find({ board: boardId }).populate("profile", ["name", "picture"]);
  }

}

const collaboratorsService = new CollaboratorsService();
export default collaboratorsService;