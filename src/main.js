import "./assets/main.css";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles"; // Ensure styles are imported!

const vuetify = createVuetify();
createApp(App).use(vuetify).mount("#app");
