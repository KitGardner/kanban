import helpers from "../utils/Helpers";
import { dbContext } from "../db/DbContext";

class TasksService {
  async getBoardTasks(boardId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let boardTasks = await dbContext.Tasks.find({ boardId: boardId, deleted: false });
    return boardTasks;
  }
  async getListTasks(listId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let listTasks = await dbContext.Tasks.find({ boardListId: listId, deleted: false });
    return listTasks;
  }
  async deleteTask(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let updatedTask = await dbContext.Tasks.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    return updatedTask;
  }
  async updateTask(id, taskData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newTask = await dbContext.Tasks.findByIdAndUpdate(id, taskData, { new: true });
    return newTask;
  }
  async createTask(taskData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newTask = await dbContext.Tasks.create({ ...taskData, creator: profile.id });
    return newTask;
  }
  async getTaskById(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let task = await dbContext.Tasks.find({ _id: id, deleted: false });
    return task;
  }

}

const tasksService = new TasksService();
export default tasksService;