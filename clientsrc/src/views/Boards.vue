<template>
  <div>
    <div v-for="board in boards" :key="board.id" class="board-preview">
      <board-card :board="board" />
    </div>
    <div class="board-preview">
      <board-card :board="board" creator />
    </div>
  </div>
</template>

<script>
import { Board } from "../models/Board";
import BoardCard from "../components/BoardCard";
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
      editable: new Board()
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    }
  },
  components: {
    BoardCard
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