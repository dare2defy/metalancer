import { createApp } from "vue";
import { createWebHashHistory, createRouter } from "vue-router";
import store from "./store";
import "@/utils/fathom";

import App from "./App.vue";

import Swap from "./pages/Swap.vue";
import SecondPage from "./pages/SecondPage.vue";
import About from "./pages/About.vue";

const routerHistory = createWebHashHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        { path: "/", redirect: "/swap" },
        { path: "/swap/:assetIn?/:assetOut?", name: "swap", component: Swap },
        { path: "/invest", name: "invest", component: SecondPage },
        { path: "/about", name: "about", component: About }
    ]
});

const app = createApp(App);

app.directive("autofocus", {
    mounted(el) {
        el.focus();
    }
});

app.use(router);
app.use(store);

app.mount("#app");

export { routerHistory, router, store };
