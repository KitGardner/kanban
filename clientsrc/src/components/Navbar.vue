<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Kanban Home</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="$auth.isAuthenticated">
          <router-link class="nav-link" :to="{ name: 'Dashboard.Profile' }">My-Dashboard</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <div v-if="!$auth.isAuthenticated">
          <button class="btn btn-success" @click="login()">Login</button>
        </div>
        <div class="d-flex" v-else>
          <user-avatar :user="profile" show-name height="40" circle />
          <button class="btn btn-danger" @click="logout">logout</button>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import { ConfigureResource } from "../store/resource";
export default {
  name: "Navbar",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWithRedirect();
        // NOTE this is only needed if logging in with popup
        // if (this.$auth.isAuthenticated) {
        //   ConfigureResource(this);
        //   this.$store.dispatch("initUserData");
        // }
      } catch (e) {
        console.error(e);
      }
    },
    async logout() {
      await this.$auth.logout({
        redirectTo: window.location.origin
      });
    }
  },
  components: {
    UserAvatar
  }
};
</script>

<style scoped lang="scss">
.router-link-active {
  color: white !important;
}
</style>