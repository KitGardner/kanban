import { dbContext } from "../db/DbContext";
import helpers from "../utils/Helpers";
import { UnAuthorized } from "../utils/Errors";

class CommentsService {
  async getBoardComments(boardId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    return await dbContext.Comments.find({ boardId: boardId, deleted: false }).populate("creator", ["name", "picture"]);
  }
  async deleteComment(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let comment = await dbContext.Comments.findById(id);
    if (comment.creator != profile.id) {
      throw new UnAuthorized("You are not the creator of this comment, therefore you cannot delete it.")
    }

    let updatedComment = await dbContext.Comments.findByIdAndUpdate(id, { deleted: true }, { new: true });
    return updatedComment;
  }
  async updateComment(id, commentData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let comment = await dbContext.Comments.findById(id);
    if (comment.creator != profile.id) {
      throw new UnAuthorized("You are not the creator of this comment, therefore you cannot edit it.")
    }

    let updatedComment = await dbContext.Comments.findByIdAndUpdate(id, commentData, { new: true }).populate("creator", ["name", "picture"]);
    return updatedComment;
  }
  async createComment(commentData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newComment = await dbContext.Comments.create({ ...commentData, creator: profile.id });
    return await dbContext.Comments.findById(newComment.id).populate("creator", ["name", "picture"]);
  }
  async getCommentsForTask(taskId) {
    return await dbContext.Comments.find({ taskId: taskId, deleted: false }).populate("creator", ["name", "picture"]);
  }

}

const commentsService = new CommentsService();
export default commentsService;