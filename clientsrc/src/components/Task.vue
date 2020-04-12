<template>
  <div>
    <label for="name">Task</label>
    <input type="text" name="name" v-model="task.name" />
    <label for="listId">List</label>
    <select name="listId" id v-model="task.boardListId">
      <option v-for="option in listOptions" :key="option.id" :value="option.value">{{option.text}}</option>
    </select>
    <label for="description">Description</label>
    <input type="text" name="description" v-model="task.description" />
  </div>
</template>

<script>
import Task from "../models/Task";

export default {
  name: "task",
  props: {
    task: { type: Task, required: true }
  },
  computed: {
    listOptions() {
      let boardLists = this.$store.state.boardListsStore.boardLists;
      let options = [];
      boardLists.forEach(list => {
        options.push({ text: list.name, value: list.id });
      });
      return options;
    }
  }
};
</script>

<style>
</style>