<template>
  <div>
    <h3>Task</h3>
    <input type="text" name="name" class="form-field" v-model="task.name" />
    <h3>List</h3>
    <select name="listId" id v-model="task.boardListId" class="form-field">
      <option v-for="option in listOptions" :key="option.id" :value="option.value">{{option.text}}</option>
    </select>
    <h3>Description</h3>
    <textarea name="description" id cols="45" rows="5" v-model="task.description"></textarea>
    <div v-if="showComments">
      <div>
        <textarea
          class="comment-box"
          name
          id
          cols="45"
          rows="3"
          placeholder="Enter Comment here"
          v-model="editableComment.comment"
        ></textarea>
        <button @click="saveComment">Save Comment</button>
      </div>
      <div v-if="comments.length > 0" class="comment-section">
        <div v-for="comment in comments" :key="comment.id">
          <div :hidden="!(isDeleting && editableComment.id == comment.id)">
            Delete this comment?
            <button @click="deleteComment">Yes</button>
            <button @click="closeModal">No</button>
          </div>
          <comment-card :comment="comment" @edit="editComment" @delete="confirmDeleteComment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "../models/Task";
import CommentCard from "./CommentCard";
import Comment from "../models/Comment";
import Modal from "../components/Modal";
export default {
  name: "task",
  props: {
    task: { type: Task, required: true },
    showComments: { type: Boolean, default: false }
  },
  data() {
    return {
      editableComment: new Comment(),
      isModalOpen: false,
      isDeleting: false
    };
  },
  computed: {
    listOptions() {
      let boardLists = this.$store.state.boardListsStore.boardLists;
      let options = [];
      boardLists.forEach(list => {
        options.push({ text: list.name, value: list.id });
      });
      return options;
    },
    comments() {
      return this.$store.state.commentsStore.boardComments.filter(
        c => c.taskId == this.task.id
      );
    }
  },
  methods: {
    saveComment() {
      if (this.editableComment.id) {
        this.$store.dispatch("updateTaskComment", this.editableComment);
      } else {
        this.editableComment.taskId = this.task.id;
        this.editableComment.boardId = this.task.boardId;
        this.$store.dispatch("createTaskComment", this.editableComment);
      }

      this.editableComment = new Comment();
    },
    editComment(comment) {
      this.editableComment = new Comment(comment);
    },
    confirmDeleteComment(comment) {
      this.editableComment = comment;
      this.isDeleting = true;
      this.openModal();
    },
    deleteComment() {
      this.$store.dispatch("deleteTaskComment", this.editableComment.id);
      this.closeModal();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isDeleting = false;
      this.editableComment = new Comment();
      this.isModalOpen = false;
    }
  },
  components: {
    CommentCard,
    Modal
  }
};
</script>

<style>
.comment-section {
  height: 30vh;
  width: 100%;
  margin-top: 10px;
  overflow-y: scroll;
}

.comment-box {
  display: block;
  background-color: lightgray;
  border-style: inset;
}

.form-field {
  width: 95%;
  margin-bottom: 5px;
}
</style>