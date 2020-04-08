<template>
  <div class="board-card">
    <div class="board-content">
      <div class="d-flex justify-content-between">
        <div>
          <h3 class="inline">{{board.name}}</h3>
          <i class="fa fa-folder-open icon"></i>
        </div>
        <div>
          <i class="fa fa-edit icon"></i>
          <i @click="deleteBoard" class="fa fa-trash icon"></i>
        </div>
      </div>
      <div>
        <p>{{board.description}}</p>
      </div>
      <div>
        <table width="100%">
          <tr>
            <th width="40%">Creator</th>
            <th width="60%">Collaborators</th>
          </tr>
          <tr>
            <td>
              <user-avatar :user="board.creatorId" show-name height="40" circle />
            </td>
            <td>
              <img
                :src="board.creatorId.picture"
                v-for="n in 5"
                :key="n"
                height="45"
                width="45"
                class="rounded-circle collaborator-img"
              />
              +5
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";

export default {
  name: "BoardCard",
  props: {
    board: { type: Object, required: true }
  },
  methods: {
    deleteBoard() {
      this.$emit("delete", this.board);
    }
  },
  components: {
    UserAvatar
  }
};
</script>

<style>
.board-card {
  padding: 10px;
}

.board-content {
  padding: 10px;
  background-color: lightgray;
}

.collaborator-img {
  margin-right: 10px;
}

.icon {
  font-size: 2rem;
  margin-left: 10px;
}

.inline {
  display: inline;
}
</style>