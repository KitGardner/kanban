import { $resource } from "./resource";
import { toastError, toast } from "@bcwdev/quickvue";
import Task from "../models/Task";

export default {
  state: {
    listTasks: [],
    activeTask: {}
  },
  mutations: {
    setListTasks(state, listTasksData) {
      state.activeTasks = {};
      state.listTasks = state.listTasks.concat(listTasksData.tasks);
    },
    clearListTasks(state) {
      state.listTasks = [];
      state.activeTask = {};
    },
    setActiveTask(state, task) {
      state.activeTask = task;
    },
    addTask(state, task) {
      state.listTasks.push(task);
    },
    updateTask(state, task) {
      let index = state.listTasks.findIndex(t => t.id == task.id);
      state.listTasks.splice(index, 1, task);
    },
    deleteTask(state, taskId) {
      let index = state.listTasks.findIndex(t => t.id == taskId);
      state.listTasks.splice(index, 1);
    }
  },
  actions: {
    async getListTasks({ commit }, listId) {
      try {
        console.log("Getting List Tasks");

        let data = await $resource.get(`api/boardLists/${listId}/tasks`);
        let listTasks = data.map(d => new Task(d));
        commit("setListTasks", { listId: listId, tasks: listTasks }); // TODO Change this to just the task data if not needed.
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