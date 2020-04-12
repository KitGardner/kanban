import Vue from 'vue';
import Vuex from 'vuex';
import { $resource } from "./resource";
import boardsStore from "./BoardsStore";
import boardListsStore from "./BoardListsStore"
import tasksStore from "./TasksStore"
import commentsStore from "./CommentsStore"
import { Board } from "../models/Board";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    async initUserData({ dispatch }) {
      dispatch("getProfile");
      dispatch("getBoards");
    },
    async getProfile({ commit }) {
      let profile = await $resource.get("api/profile");
      commit("setProfile", profile);
    },

    async updateProfile({ commit }, update) {
      let profile = await $resource.put("api/profile", update);
      commit("setProfile", profile);
    },
    async clearBoardData({ commit }) {
      commit("setBoard", new Board());
      commit("setBoardLists", []);
      commit("clearListTasks");
      commit("setTaskComments", []);
    }

  },
  modules: {
    boardsStore,
    boardListsStore,
    tasksStore,
    commentsStore
  }
});
