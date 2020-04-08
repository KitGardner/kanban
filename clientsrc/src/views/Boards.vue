<template>
  <div>
    <div v-for="board in boards" :key="board.id" class="board-preview">
      <board-card :board="board" @delete="deleteBoard" />
    </div>
    <modal v-if="openModal" @close="openModal = false" @confirm="removeBoard" />
  </div>
</template>

<script>
import { Board } from "../models/Board";
import BoardCard from "../components/BoardCard";
import Modal from "../components/Modal";
export default {
  name: "Boards",
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.state.boardsStore.boards;
    }
  },
  data() {
    return {
      editable: new Board(),
      openModal: false
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    },
    deleteBoard(board) {
      this.editable = board;
      this.openModal = true;
    },
    removeBoard() {
      this.$store.dispatch("removeBoard", this.editable.id);
      this.openModal = false;
      this.editable = new Board();
    }
  },
  components: {
    BoardCard,
    Modal
  }
};
</script>

<style>
.board-preview {
  width: 33%;
  display: inline-block;
  padding-right: 10px;
}
</style>