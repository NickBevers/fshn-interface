import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Camera from "simple-vue-camera";

createApp(App).component("camera", Camera).mount("#app");
