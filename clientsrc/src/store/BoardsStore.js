import { Board } from "../models/Board";
import { $resource } from "./resource";

export default {
  state: {
    boards: [],
    board: new Board()
  },
  mutations: {
    setBoards(state, boards = []) {
      state.boards = boards;
    },
    setBoard(state, board = new Board()) {
      state.board = board;
    },
    addBoard(state, board) {
      state.boards.push(new Board(board));
    },
    removeBoard(state, id) {
      let index = state.boards.findIndex(b => b.id == id);
      state.boards.splice(index, 1);
    }
  },
  actions: {
    async getBoards({ commit }) {
      let boards = await $resource.get("api/boards");
      commit("setBoards", boards);
    },
    async getBoard({ commit }, id) {
      let boards = await $resource.get("api/boards/" + id);
      commit("setBoard", boards);
    },
    async createBoard({ commit }, boardData) {
      let board = await $resource.post("api/boards/", boardData);
      // REVIEW when creating a board this sets it as the active board
      commit("setBoard", board);
      commit("addBoard", board);
    },
    async removeBoard({ commit }, id) {
      try {
        let deletedId = await $resource.delete("api/boards/" + id);
        commit("removeBoard", id);
      } catch (error) {
        console.log(error);
      }
    }
  }
};