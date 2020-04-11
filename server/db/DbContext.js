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

async function deleteTaskCommentsBulk(taskCommand, next) {
  try {
    let task = await dbContext.Tasks.findOne(this.getQuery());
    if (task && task.deleted) {
      await dbContext.Comments.updateMany({ taskId: task.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function deleteTaskCommentsSingle(task, next) {
  try {
    if (task && task.deleted) {
      await dbContext.Comments.updateMany({ taskId: task.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function deleteListTasksBulk(boardListCommand, next) {
  try {
    let boardList = await dbContext.BoardLists.findOne(this.getQuery());
    if (boardList && boardList.deleted) {
      await dbContext.Tasks.updateMany({ boardListId: boardList.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function deleteListTasksSingle(boardList, next) {
  try {
    if (boardList && boardList.deleted) {
      await dbContext.Tasks.updateMany({ boardListId: boardList.id }, { deleted: true })
    }
    next();
  } catch (error) {
    next(error);
  }
}

TaskSchema.post("findOneAndUpdate", deleteTaskCommentsSingle);
TaskSchema.post("updateMany", deleteTaskCommentsBulk);

BoardListSchema.post("findOneAndUpdate", deleteListTasksSingle)
BoardListSchema.post("updateMany", deleteListTasksBulk)

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
