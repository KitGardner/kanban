import { dbContext } from "../db/DbContext";
import helpers from "../utils/Helpers";
import { UnAuthorized } from "../utils/Errors";

class CommentsService {
  async deleteComment(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let comment = await dbContext.Comments.findById(id);
    if (comment.creatorId != profile.id) {
      throw new UnAuthorized("You are not the creator of this comment, therefore you cannot delete it.")
    }

    let updatedComment = await dbContext.Comments.findByIdAndUpdate(id, { deleted: false }, { new: true });
    return updatedComment;
  }
  async updateComment(id, commentData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let comment = await dbContext.Comments.findById(id);
    if (comment.creatorId != profile.id) {
      throw new UnAuthorized("You are not the creator of this comment, therefore you cannot edit it.")
    }

    let updatedComment = await dbContext.Comments.findByIdAndUpdate(id, commentData, { new: true });
    return updatedComment;
  }
  async createComment(commentData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newComment = dbContext.Comments.create({ ...commentData, creatorId: profile.id });
    return newComment;
  }
  async getCommentsForTask(taskId) {
    return await dbContext.Comments.find({ taskId: taskId, deleted: false }).populate("creatorId", ["name", "picture"]);
  }

}

const commentsService = new CommentsService();
export default commentsService;