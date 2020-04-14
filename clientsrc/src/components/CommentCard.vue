<template>
  <div class="comment">
    <div class="d-flex justify-content-between">
      <user-avatar :user="comment.creator" showName circle />
      <div>
        <i
          v-if="this.$auth.userInfo.email == this.comment.creator.name"
          @click="editComment"
          class="fa fa-edit icon"
        ></i>
        <i
          v-if="this.$auth.userInfo.email == this.comment.creator.name"
          @click="deleteComment"
          class="fa fa-trash icon"
        ></i>
      </div>
    </div>
    <div>
      <p>{{comment.comment}}</p>
    </div>
  </div>
</template>

<script>
import Comment from "../models/Comment";
import userAvatar from "../components/UserAvatar";

export default {
  name: "comment",
  props: {
    comment: { type: Comment, required: true }
  },
  components: {
    userAvatar
  },
  methods: {
    editComment() {
      this.$emit("edit", this.comment);
    },
    deleteComment() {
      this.$emit("delete", this.comment);
    }
  }
};
</script>

<style>
.comment {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: lightcyan;
}
</style>