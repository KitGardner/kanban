<template>
  <div class="board-card">
    <div v-if="creatorBoard" class="board-content transparent" @click="createBoard">
      <h1 class="create-symbol">Add new Board</h1>
    </div>
    <div v-else class="board-content">
      <div>
        <div>
          <h3 class="inline">{{board.name}}</h3>
        </div>
      </div>
      <div>
        <p>{{board.description}}</p>
      </div>
      <div>
        <router-link :to="{name: 'Board', params:{boardId: board.id}}">
          <i class="fa fa-folder-open icon"></i>
        </router-link>
        <i @click="editBoard" class="fa fa-edit icon"></i>
        <i @click="deleteBoard" class="fa fa-trash icon"></i>
      </div>
      <div>
        <table width="100%">
          <tr>
            <th width="40%">Creator</th>
            <th width="60%">Collaborators</th>
          </tr>
          <tr>
            <td>
              <user-avatar :user="board.creator" show-name height="40" circle />
            </td>
            <td>
              <img
                :src="board.creator.picture"
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
    board: { type: Object, required: false },
    creatorBoard: { type: Boolean, default: false }
  },
  methods: {
    deleteBoard() {
      this.$emit("delete", this.board);
    },
    editBoard() {
      this.$emit("edit", this.board);
    },
    createBoard() {
      this.$emit("create");
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
  min-height: 20vh;
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

.create-symbol {
  font-size: 3.5rem;
}

.transparent {
  opacity: 50%;
  margin-top: 20px;
}
</style>