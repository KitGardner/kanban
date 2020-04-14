import { $resource } from "./resource";
import Comment from "../models/Comment"
import { toastError, toast } from "@bcwdev/quickvue";
export default {
  state: {
    boardComments: []
  },
  mutations: {
    setBoardComments(state, boardComments) {
      state.boardComments = boardComments;
    },
    addTaskComment(state, taskComment) {
      state.boardComments.push(taskComment);
    },
    updateTaskComment(state, taskComment) {
      let index = state.boardComments.findIndex(t => t.id == taskComment.id);
      state.boardComments.splice(index, 1, taskComment);
    },
    deleteTaskComment(state, commentId) {
      let index = state.boardComments.findIndex(t => t.id == commentId);
      state.boardComments.splice(index, 1);
    }
  },
  actions: {
    async getTaskComments({ commit }, taskId) {
      try {
        let data = await $resource.get(`api/tasks/${taskId}/comments`);
        let taskComments = data.map(d => new Comment(d));
        commit("setTaskComments", taskComments);
      } catch (error) {
        toastError(error)
      }
    },
    async getBoardComments({ commit }, boardId) {
      try {
        let data = await $resource.get(`api/boards/${boardId}/comments`);
        let comments = data.map(d => new Comment(d));
        commit("setBoardComments", comments);
      } catch (error) {
        toastError(error)
      }
    },
    async createTaskComment({ commit }, commentData) {
      try {
        let data = await $resource.post("api/comments", commentData);
        let newComment = new Comment(data);
        commit("addTaskComment", newComment);
      } catch (error) {
        toastError(error)
      }
    },
    async updateTaskComment({ commit }, commentData) {
      try {
        let data = await $resource.put("api/comments/" + commentData.id, commentData);
        let updatedTaskComment = new Comment(data);
        commit("updateTaskComment", updatedTaskComment);
      } catch (error) {
        toastError(error)
      }
    },
    async deleteTaskComment({ commit }, commentId) {
      try {
        let deleted = await $resource.delete("api/comments/" + commentId)
        commit("deleteTaskComment", deleted.Id);
      } catch (error) {
        toastError(error)
      }
    }
  }
}