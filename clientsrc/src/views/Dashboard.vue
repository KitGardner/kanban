<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-1">
        <div class="d-flex flex-column links">
          <!-- TODO add routes -->
          <router-link
            v-for="route in dashboardRoutes"
            :key="route.name"
            :to="route"
          >{{route.displayName}}</router-link>
        </div>
      </div>
      <div class="col-11 mx-auto">
        <div class="card shadow">
          <div class="p-3">
            <h4>{{routeName}}</h4>
            <hr class="m-0 pb-0" />
          </div>
          <div class="card-body pt-1 m-0">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dashboardRoutes } from "../router/index";
export default {
  name: "Dashboard",
  data() {
    return {
      dashboardRoutes
    };
  },
  computed: {
    routeName() {
      return this.$route.name.slice(this.$route.name.lastIndexOf(".") + 1);
    }
  }
};
</script>

<style scoped lang="scss">
.links a {
  transition: all 0.2s linear;
  margin-bottom: 0.5rem;
  padding: 0.35rem;
  border-left: 3px solid transparent;
  color: var(--secondary);
  &.router-link-exact-active {
    padding-left: 1rem;
    border-left: 3px solid var(--primary);
    color: var(--primary);
  }
}
</style>