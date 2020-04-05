import helpers from "../utils/Helpers";
import { dbContext } from "../db/DbContext";

class TasksService {
  async getListTasks(listId, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let listTasks = await dbContext.Tasks.find({ boardListId: listId, deleted: false });
    return listTasks;
  }
  async deleteTask(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let updatedTask = await dbContext.Tasks.findByIdAndUpdate(id, { deleted: true }, { new: true });
    return updatedTask;
  }
  async updateTask(id, taskData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newTask = await dbContext.Tasks.findByIdAndUpdate(id, taskData, { new: true });
    return newTask;
  }
  async createTask(taskData, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let newTask = await dbContext.Tasks.create({ ...taskData, creatorId: profile.id });
    return newTask;
  }
  async getTaskById(id, userInfo) {
    let profile = await helpers.validateCaller(userInfo);
    let task = dbContext.Tasks.find({ id: id, deleted: false });
    return task;
  }

}

const tasksService = new TasksService();
export default tasksService;