import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyBRkjZ56F5mmL_63HTHR7bMvrAWdGza06I",
  authDomain: "minichi-1734a.firebaseapp.com",
  databaseURL: "https://minichi-1734a-default-rtdb.firebaseio.com/",
  projectId: "minichi-1734a",
  storageBucket: "minichi-1734a.appspot.com",
  messagingSenderId: "161533544818",
  appId: "1:161533544818:web:74a29e9a0effeda98e75eb",
};

firebase.initializeApp(config);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
