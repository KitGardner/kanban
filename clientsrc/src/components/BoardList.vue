<template>
  <div class="box">
    <div>
      <h3>
        {{list.name}}
        <i @click="deleteList" class="fa fa-trash icon"></i>
        <i @click="editList" class="fa fa-edit icon"></i>
      </h3>
    </div>
    <div>Here will be the tasks</div>
  </div>
</template>

<script>
import BoardList from "../models/BoardList";
export default {
  name: "BoardList",
  props: {
    list: { type: BoardList, required: true }
  },
  methods: {
    deleteList() {
      this.$emit("delete", this.list);
    },
    editList() {
      this.$emit("edit", this.list);
    }
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
  background-color: var(--gray);
}
</style>