import { profilesService } from "./ProfilesService";
import { UnAuthorized, Unexpected, BadRequest } from "../utils/Errors";
import { dbContext } from "../db/DbContext";
import collaboratorsService from "./CollaboratorsService";
import helpers from "../utils/Helpers";

class BoardsService {
  // FIXME this looks like it might cause some redundancy. Look into cleaning it up.
  async getBoardById(id, userInfo) {
    if (userInfo) {
      let profile = await helpers.validateCaller(userInfo);
    }

    let userBoard = await dbContext.Boards.findById(id).populate("creator", ["name", "picture"]);
    if (!userBoard || userBoard.deleted) {
      throw new BadRequest("You are trying to grab a board that does not exist");
    }
    return userBoard;
  }
  async deleteBoard(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let userBoard = await dbContext.Boards.findById(id);

    if (userBoard.creator != profile.id) {
      throw new BadRequest("The calling user cannot delete the board because they are not the creator.")
    }

    let updatedBoard = await dbContext.Boards.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!updatedBoard) {
      throw new Unexpected("There was an error deleting the board with Id " + id);
    }

    return updatedBoard.id;
  }
  async updateBoard(id, boardData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let oldBoard = await dbContext.Boards.findById(id);
    if (oldBoard.creator != profile.id) {
      throw new BadRequest("The calling user is not the owner of the board with id " + id);
    }

    let updatedBoard = await dbContext.Boards.findByIdAndUpdate(id, boardData, { new: true }).populate("creator", ["name", "picture"]);
    return updatedBoard;

  }
  async createBoard(boardData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let createdBoard = await dbContext.Boards.create({ ...boardData, creator: profile.id });
    if (!createdBoard) {
      throw new Unexpected("There was an error creating the board");
    }

    let collaboration = await collaboratorsService.createCollaboration({ email: profile.email, board: createdBoard.id }, profile);
    return await this.getBoardById(createdBoard.id);
  }
  async getUserBoards(userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let userBoards = dbContext.Boards.find({ creator: profile.id, deleted: false }).populate("creator", ["name", "picture"]);
    // TODO Also grab boards that the user is a collaborator in and stitch them together
    return userBoards;
  }

}

const boardsService = new BoardsService();
export default boardsService;