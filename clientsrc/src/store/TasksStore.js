import { $resource } from "./resource";
import { toastError, toast } from "@bcwdev/quickvue";
import Task from "../models/Task";

export default {
  state: {
    boardTasks: [],
    activeTask: {}
  },
  mutations: {
    setBoardTasks(state, boardTasksData) {
      state.boardTasks = state.boardTasks = boardTasksData;
    },
    setActiveTask(state, task) {
      state.activeTask = task;
    },
    addTask(state, task) {
      state.boardTasks.push(task);
    },
    updateTask(state, task) {
      let index = state.boardTasks.findIndex(t => t.id == task.id);
      state.boardTasks.splice(index, 1, task);
    },
    deleteTask(state, taskId) {
      let index = state.boardTasks.findIndex(t => t.id == taskId);
      state.boardTasks.splice(index, 1);
    }
  },
  actions: {
    async getBoardTasks({ commit }, boardId) {
      try {
        let data = await $resource.get(`api/boards/${boardId}/tasks`);
        let boardTasks = data.map(d => new Task(d));
        commit("setBoardTasks", boardTasks);
      } catch (error) {
        toastError(error);
      }
    },
    async setActiveTask({ commit }, task) {
      commit("setActiveTask", task);
    },
    async createTask({ commit }, taskData) {
      try {
        let data = await $resource.post("api/tasks/", taskData);
        let task = new Task(data);
        commit("addTask", task);
      } catch (error) {
        toastError(error);
      }
    },
    async updateTask({ commit }, taskData) {
      try {
        let data = await $resource.put("api/tasks/" + taskData.id, taskData);
        let task = new Task(data);
        commit("updateTask", task);
      } catch (error) {
        toast(error);
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        let deleted = await $resource.delete("api/tasks/" + taskId);
        commit("deleteTask", deleted.id);
      } catch (error) {
        toast(error)
      }
    }
  }
}