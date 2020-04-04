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

export const dbContext = new DbContext();
