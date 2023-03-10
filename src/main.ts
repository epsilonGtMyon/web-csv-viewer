import { createApp } from "vue";
import "minireset.css"
import "./style.css";
import App from "./App.vue";
import { router } from "./common/router/index";

const app = createApp(App);
app.use(router);
app.mount("#app");
