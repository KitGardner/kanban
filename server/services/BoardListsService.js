import { UnAuthorized, BadRequest, Unexpected } from "../utils/Errors";
import boardsService from "./BoardsService";
import { dbContext } from "../db/DbContext";
import helpers from "../utils/Helpers";

class BoardListsService {
  async getListsByBoardId(boardId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let boardLists = await dbContext.BoardLists.find({ boardId: boardId, deleted: false });
    return boardLists;
  }
  async deleteBoardList(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let boardList = await dbContext.BoardLists.findById(id);

    let board = await boardsService.getBoardById(boardList.boardId);
    if (board.creator.id != profile.id) {
      throw new UnAuthorized("You are not the creator of this board which means you cannot modify it.")
    }

    let updatedBoardList = await dbContext.BoardLists.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    return updatedBoardList.id;
  }
  async updateBoardList(boardListData, userInfo, boardListId) {
    let profile = await helpers.validateCaller(userInfo);

    let board = await boardsService.getBoardById(boardListData.boardId);
    if (board.creator.id != profile.id) {
      throw new UnAuthorized("You are not the creator of this board which means you cannot modify it.")
    }

    let updatedBoardList = await dbContext.BoardLists.findByIdAndUpdate(boardListId, boardListData, { new: true }).populate("creator", ["name", "picture"]);
    return updatedBoardList;
  }
  async createBoardList(boardListData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let board = await boardsService.getBoardById(boardListData.boardId);

    if (board.creator.id != profile.id) {
      throw new UnAuthorized("You are not the creator of this board which means you cannot modify it.")
    }

    let newBoardList = await dbContext.BoardLists.create({ ...boardListData, creator: profile.id });
    return newBoardList;
  }
  async getBoardLists(boardId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);

    let boardLists = await dbContext.BoardLists.find({ boardId: boardId, deleted: false });
    return boardLists;
  }

}

const boardListsService = new BoardListsService();
export default boardListsService;