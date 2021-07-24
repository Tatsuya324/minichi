import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAJRW-6HxaBQChXmZAuOveDDlMpcrsolHM",
  authDomain: "minichi-914d7.firebaseapp.com",
  databaseURL: "https://minichi-914d7-default-rtdb.firebaseio.com/",
  projectId: "minichi-914d7",
  storageBucket: "minichi-914d7.appspot.com",
  messagingSenderId: "1078225673841",
  appId: "1:1078225673841:web:276a3519418c2c5a1445d",
};

firebase.initializeApp(config);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
