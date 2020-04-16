<template>
  <div>
    <div>
      <board-card
        v-for="board in boards"
        :key="board.id"
        class="board-preview"
        :board="board"
        @delete="deleteBoardPrompt"
        @edit="editBoard"
      />
      <board-card creatorBoard @create="editBoard" class="board-preview" />
    </div>
    <modal v-if="openModal && isDeleting" @close="closeModal" @confirm="deleteBoard">
      <div slot="header">Delete Board?</div>
      <div slot="body">Deleting this board will delete all data tied to it. Continue?</div>
    </modal>
    <modal v-if="openModal && isEditing" @close="closeModal" @confirm="createBoard">
      <div slot="header">Board Information</div>
      <div slot="body">
        <label for="id" hidden></label>
        <input type="text" name="id" hidden v-model="editable.id" />
        <h3>Name:</h3>
        <input type="text" name="name" style="width: 95%;" v-model="editable.name" />
        <h3>Description</h3>
        <textarea name="description" id cols="45" rows="5" v-model="editable.description"></textarea>
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