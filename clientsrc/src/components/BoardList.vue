<template>
  <div class="box">
    <div class="list-header">
      <h3 class="text-center" :title="list.description">{{list.name}}</h3>
      <div class="d-flex justify-content-between">
        <i @click="editList" class="fa fa-edit icon"></i>
        <i @click="deleteList" class="fa fa-trash icon"></i>
      </div>
    </div>
    <div>
      <task-card
        v-for="task in listTasks"
        :task="task"
        :key="task.name"
        @delete="confirmDelete"
        @edit="confirmEdit"
      />
    </div>
    <modal v-if="isModalOpen && isEditing" @close="closeModal" @confirm="updateTask">
      <div slot="header">Task Information</div>
      <div slot="body">
        <task :task="editableTask" :showComments="editableTask.id != undefined" />
      </div>
    </modal>
    <modal v-if="isModalOpen && isDeleting" @close="closeModal" @confirm="deleteTask">
      <div slot="header">Delete Task?</div>
      <div slot="body">This will remove the task and any comments tied to it. Continue?</div>
    </modal>
  </div>
</template>

<script>
import BoardList from "../models/BoardList";
import TaskCard from "./TaskCard";
import modal from "../components/Modal";
import Task from "../models/Task";
import task from "../components/Task";
export default {
  name: "BoardList",
  data() {
    return {
      isEditing: false,
      isDeleting: false,
      isModalOpen: false,
      editableTask: new Task()
    };
  },
  props: {
    list: { type: BoardList, required: true }
  },
  computed: {
    listTasks() {
      return this.$store.state.tasksStore.boardTasks.filter(
        task => task.boardListId == this.list.id
      );
    }
  },
  methods: {
    deleteList() {
      this.$emit("delete", this.list);
    },
    editList() {
      this.$emit("edit", this.list);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isEditing = false;
      this.isDeleting = false;
      this.isModalOpen = false;
      this.editableTask = new Task();
    },
    confirmDelete(task) {
      this.editableTask = task;
      this.isDeleting = true;
      this.openModal();
    },
    confirmEdit(task) {
      this.editableTask = new Task(task);
      this.isEditing = true;
      this.openModal();
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.editableTask.id);
      this.closeModal();
    },
    updateTask() {
      this.$store.dispatch("updateTask", this.editableTask);
      this.closeModal();
    }
  },
  components: {
    TaskCard,
    modal,
    task
  }
};
</script>

<style>
.boxes {
  max-width: 100vw;
  overflow-x: scroll;
}

.box {
  min-height: 80vh;
  width: 16.67vw;
  background-color: blue;
}

.list-header {
  background-color: #eeeeee;
  border: 2px solid black;
}
</style>