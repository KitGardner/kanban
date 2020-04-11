<template>
  <div>
    <div v-for="board in boards" :key="board.id" class="board-preview">
      <board-card :board="board" @delete="deleteBoardPrompt" @edit="editBoard" />
    </div>
    <board-card creatorBoard @create="editBoard" class="board-preview" />
    <modal v-if="openModal && isDeleting" @close="closeModal" @confirm="deleteBoard">
      <div slot="header">Delete Board?</div>
      <div slot="body">Deleting this board will delete all data tied to it. Continue?</div>
    </modal>
    <modal v-if="openModal && isEditing" @close="closeModal" @confirm="createBoard">
      <div slot="header">Board Information</div>
      <div slot="body">
        <div class="input-group">
          <label for="id"></label>
          <input type="text" name="id" hidden v-model="editable.id" />
        </div>
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" name="name" v-model="editable.name" />
        </div>
        <div class="input-group">
          <label for="description">Description:</label>
          <input type="text" name="description" v-model="editable.description" />
        </div>
      </div>
    </modal>
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
      openModal: false,
      isDeleting: false,
      isEditing: false
    };
  },
  methods: {
    editBoard(board) {
      let editableBoard = new Board(board); // Break references
      this.isEditing = true;
      this.openModal = true;
      this.editable = editableBoard;
    },
    createBoard() {
      if (this.editable.id) {
        this.$store.dispatch("updateBoard", this.editable);
      } else {
        this.$store.dispatch("createBoard", this.editable);
      }
      this.editable = new Board();
      this.closeModal();
    },
    deleteBoardPrompt(board) {
      this.editable = board;
      this.isDeleting = true;
      this.openModal = true;
    },
    deleteBoard() {
      this.$store.dispatch("removeBoard", this.editable.id);
      this.closeModal();
    },
    closeModal() {
      this.isDeleting = false;
      this.isEditing = false;
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