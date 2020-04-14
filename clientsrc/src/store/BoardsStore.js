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
    },
    updateBoard(state, boardData) {
      let updatedBoard = new Board(boardData);
      let index = state.boards.findIndex(b => b.id == updatedBoard.id);
      state.boards.splice(index, 1, updatedBoard);
    }
  },
  actions: {
    async getBoards({ commit }) {
      let data = await $resource.get("api/boards");
      let boards = data.map(d => new Board(d));
      commit("setBoards", boards);
    },
    async getBoard({ commit, dispatch }, id) {
      let data = await $resource.get("api/boards/" + id);
      let board = new Board(data);
      commit("setBoard", board);
      dispatch("getBoardLists", board.id);
      dispatch("getBoardTasks", board.id);
    },
    async createBoard({ commit }, boardData) {
      let board = await $resource.post("api/boards/", boardData);
      // REVIEW when creating a board this sets it as the active board
      commit("setBoard", board);
      commit("addBoard", board);
    },
    async removeBoard({ commit }, id) {
      try {
        let deleted = await $resource.delete("api/boards/" + id);
        commit("removeBoard", deleted.id);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBoard({ commit }, boardData) {
      try {
        let updatedBoard = await $resource.put("api/boards/" + boardData.id, boardData);
        commit("updateBoard", updatedBoard)
      } catch (error) {
        console.log(error);
      }
    }
  }
};