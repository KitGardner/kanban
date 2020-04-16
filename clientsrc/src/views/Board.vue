<template>
  <div class="board">
    <div class="d-flex justify-content-between">
      <div class="inline">
        <h1 class="inline">{{board.name}}</h1>
        <div class="inline" @click="editList">
          <i class="fa fa-plus"></i>
          <h3 class="inline">List</h3>
        </div>
        <div class="inline" @click="editTask">
          <i class="fa fa-plus"></i>
          <h3 class="inline">Task</h3>
        </div>
      </div>
    </div>
    <modal v-if="isModalOpen && isDeleting" @close="closeModal" @confirm="deleteList">
      <div slot="header">Delete List</div>
      <div slot="body">Deleting this list will delete all tasks under it. Continue?</div>
    </modal>
    <modal v-if="isModalOpen && isEditing" @close="closeModal" @confirm="saveList">
      <div slot="header">List Information</div>
      <div slot="body">
        <h3>Name</h3>
        <input type="text" class="form-field" name="name" v-model="editableList.name" />
        <h3>Order</h3>
        <select v-model="editableList.order">
          <option v-for="n in lists.length + 1" :key="n">{{n}}</option>
        </select>
        <h3>Description</h3>
        <textarea name="description" id cols="45" rows="5" v-model="editableList.description"></textarea>
      </div>
    </modal>
    <modal v-if="isModalOpen && isEditingTask" @close="closeModal" @confirm="saveTask">
      <div slot="header">Task Information</div>
      <div slot="body">
        <task :task="editableTask" />
      </div>
    </modal>
    <div class="boxes d-flex">
      <div class="m-1" v-for="list in lists" :key="list.id">
        <board-list-card :list="list" @delete="confirmDelete" @edit="editList" />
      </div>
    </div>
  </div>
</template>

<script>
import boardListCard from "../components/BoardList";
import BoardList from "../models/BoardList";
import Modal from "../components/Modal";
import Task from "../models/Task";
import task from "../components/Task";

export default {
  name: "Board",
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
  },
  data() {
    return {
      editableList: new BoardList(),
      editableTask: new Task(),
      isDeleting: false,
      isDeletingTask: false,
      isEditing: false,
      isEditingTask: false,
      isModalOpen: false
    };
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    lists() {
      return this.$store.state.boardListsStore.boardLists.sort(
        (listLeft, listRight) => listLeft.order > listRight.order
      );
    }
  },
  methods: {
    editList(list = new BoardList()) {
      this.editableList = new BoardList(list);
      this.isEditing = true;
      this.openModal();
    },
    editTask(task = new Task()) {
      this.editableTask = new Task(task);
      this.isEditingTask = true;
      this.openModal();
    },
    saveList() {
      if (this.editableList.id) {
        this.$store.dispatch("updateBoardList", this.editableList);
      } else {
        this.editableList.boardId = this.$route.params.boardId;
        this.$store.dispatch("addBoardList", this.editableList);
      }
      this.closeModal();
    },
    saveTask() {
      if (this.editableTask.id) {
        this.$store.dispatch("updateTask", this.editableTask);
      } else {
        this.editableTask.boardId = this.$route.params.boardId;
        this.$store.dispatch("createTask", this.editableTask);
      }
      this.closeModal();
    },
    deleteList() {
      console.log("Tried to delete the list");

      this.$store.dispatch("deleteList", this.editableList.id);
      this.closeModal();
    },
    confirmDelete(list = new BoardList()) {
      console.log("confirmation");

      this.editableList = list;
      this.isDeleting = true;
      this.openModal();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isDeleting = false;
      this.isEditing = false;
      this.isEditingTask = false;
      this.isDeletingTask = false;
      this.isModalOpen = false;
    }
  },
  components: {
    boardListCard,
    Modal,
    task
  }
};
</script>

<style>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}

.box {
  min-height: 80vh;
  width: 16.67vw;
  background-color: #cccccc;
}
.inline {
  display: inline;
  margin-left: 10px;
}
.icon {
  margin-left: 10px;
  margin-right: 5px;
  font-size: 2rem;
}

.form-field {
  width: 95%;
}
</style>