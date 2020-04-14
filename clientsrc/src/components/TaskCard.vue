<template>
  <div class="task-card">
    <h4 :title="task.description">{{task.name}}</h4>
    <div class="d-flex justify-content-between">
      <div>
        <i @click="editTask" class="fa fa-edit icon"></i>
        <i @click="deleteTask" class="fa fa-trash icon"></i>
      </div>
      <div>
        <user-avatar :user="task.creator" height="40" circle class="avatar" />
      </div>
    </div>
  </div>
</template>

<script>
import Task from "../models/Task";
import userAvatar from "./UserAvatar";
export default {
  name: "taskCard",
  props: {
    task: { type: Task, required: true }
  },
  methods: {
    deleteTask() {
      this.$emit("delete", this.task);
    },
    editTask() {
      this.$emit("edit", this.task);
    }
  },
  components: {
    userAvatar
  }
};
</script>

<style>
.task-card {
  width: 90%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.avatar {
  padding-right: 5px;
  padding-bottom: 5px;
}
</style>