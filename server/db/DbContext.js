import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import { BoardSchema } from "../models/Board";
import { BoardListSchema } from "../models/BoardList";
import CollaboratorSchema from "../models/Collaborator";
import { CommentSchema } from "../models/Comment"
import { TaskSchema } from "../models/Task"

class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Values = mongoose.model("Value", ValueSchema);
  Boards = mongoose.model("Board", BoardSchema);
  BoardLists = mongoose.model("BoardList", BoardListSchema);
  Collaborators = mongoose.model("Collaborator", CollaboratorSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Tasks = mongoose.model("Task", TaskSchema);
}

async function deleteTaskComments(task, next) {
  try {
    let doc = await dbContext.Tasks.findOne(this.getQuery());
    if (doc.deleted) {
      await dbContext.Comments.updateMany({ taskId: doc.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function deleteListTasks(boardList, next) {
  try {
    if (boardList.deleted) {
      await dbContext.Tasks.updateMany({ boardListId: boardList.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

TaskSchema.post("findOneAndUpdate", deleteTaskComments);
TaskSchema.post("updateMany", deleteTaskComments);

BoardListSchema.post("findOneAndUpdate", deleteListTasks)
BoardListSchema.post("updateMany", deleteListTasks)

BoardSchema.post("findOneAndUpdate", async function (board, next) {
  try {
    if (board.deleted) {
      await dbContext.BoardLists.updateMany({ boardId: board.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
})

export const dbContext = new DbContext();
