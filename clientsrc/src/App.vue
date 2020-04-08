<template>
  <div id="app">
    <navbar />
    <toaster location="top-right" />
    <div class="loader-container">
      <div class="loader" v-if="loading"></div>
    </div>
    <router-view @openModal="openModal" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { onAuth } from "@bcwdev/auth0-vue";
import { ConfigureResource } from "./store/resource";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        onAuth(this.configureApp);
      } catch (e) {
        console.error(e);
      }
    },
    configureApp() {
      console.log("here");
      if (this.$auth.isAuthenticated) {
        ConfigureResource(this);
        this.$store.dispatch("initUserData");
      }
    },
    openModal() {
      console.log("The app is listening");
    }
  }
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

.loader-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  pointer-events: none;
  user-select: none;
  .loader {
    font-size: 10px;
    text-indent: -9999em;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background: var(--primary);
    background: linear-gradient(
      to right,
      #ffffff 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    animation: loading 1.4s infinite linear;
    transform: translateZ(0);
    &:before {
      width: 50%;
      height: 50%;
      background: var(--primary);
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
    }
    &:after {
      background: var(--secondary);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: "";
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
