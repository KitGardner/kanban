import { $resource } from "./resource";
import BoardList from "../models/BoardList";
import { toastError } from "@bcwdev/quickvue";

export default {
  state: {
    boardLists: []
  },
  mutations: {
    setBoardLists(state, boardLists) {
      state.boardLists = boardLists;
    },
    addBoardList(state, boardList) {
      state.boardLists.push(boardList);
    },
    updateList(state, list) {
      let index = state.boardLists.findIndex(l => l.id == list.id);
      state.boardLists.splice(index, 1, list);
    },
    removeList(state, listId) {
      let index = state.boardLists.findIndex(l => l.id == listId);
      state.boardLists.splice(index, 1);
    }
  },
  actions: {
    async getBoardLists({ commit }, boardId) {
      try {
        let data = await $resource.get(`api/boards/${boardId}/lists`);
        let boardLists = data.map(d => new BoardList(d));
        commit("setBoardLists", boardLists)
      } catch (error) {
        console.log(error);
      }
    },
    async addBoardList({ commit }, boardListData) {
      try {
        let data = await $resource.post("api/boardLists", boardListData);
        let boardList = new BoardList(data);
        commit("addBoardList", boardList);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteList({ commit }, boardId) {
      try {
        let deleted = await $resource.delete("api/boardLists/" + boardId)
        commit("removeList", deleted.id);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBoardList({ commit }, boardData) {
      try {
        let data = await $resource.put("api/boardLists/" + boardData.id, boardData);
        let updatedList = new BoardList(data);
        commit("updateList", updatedList);
      } catch (error) {
        toastError(error);
      }
    }
  }

}