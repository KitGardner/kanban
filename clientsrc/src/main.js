// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./AuthConfig.js";
import { QuickVue } from "@bcwdev/quickvue";

Vue.use(QuickVue);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

console.log("This is a change to mess with master");


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
