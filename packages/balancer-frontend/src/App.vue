<template>
    <div class="app" id="app">
        <Decor />
        <Header />
        <router-view />
        <Footer />

        <ModalSettings :open="isSettingsModalOpen" />
        <ModalAccount :open="isAccountModalOpen" />
        <ModalConnectorSelector :open="isConnectorModalOpen" />
        <NotificationList :items="notifications" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";

import { RootState } from "@/store";
import Storage from "@/utils/storage";

import Decor from "@/components/Decor.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ModalAccount from "@/components/ModalAccount.vue";
import ModalConnectorSelector from "@/components/ModalConnectorSelector.vue";
import ModalSettings from "@/components/ModalSettings.vue";
import NotificationList from "@/components/NotificationList.vue";

export default defineComponent({
    components: {
        Decor,
        Header,
        Footer,
        ModalAccount,
        ModalConnectorSelector,
        ModalSettings,
        NotificationList
    },
    setup() {
        const store = useStore<RootState>();

        const isSettingsModalOpen = computed(() => store.state.ui.modal.settings.isOpen);
        const isAccountModalOpen = computed(() => store.state.ui.modal.account.isOpen);
        const isConnectorModalOpen = computed(() => store.state.ui.modal.connector.isOpen);

        const notifications = computed(() => store.state.ui.notifications);

        // const mode = Storage.isDarkmode();
        document.documentElement.setAttribute("data-theme", "dark");

        onMounted(() => {
            store.dispatch("assets/init");
            store.dispatch("account/init");
            store.dispatch("gas/init");
            store.dispatch("bal4gas/init");
            store.dispatch("price/init");
        });

        return {
            isSettingsModalOpen,
            isAccountModalOpen,
            isConnectorModalOpen,
            notifications
        };
    }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap");

:root {
    --background-primary: #2d3256;
    --background-secondary: #fff;
    --background-control: #fff;
    --background-hover: #f5f5f5;
    --border: #e5e5e5;
    --text-primary: #21222c;
    --text-secondary: #718b98;
    --success: #21b66f;
    --info: #7685d5;
    --warning: #ff9a1a;
    --error: #ff5b4c;
    --font-size-tiny: 11px;
    --font-size-small: 14px;
    --font-size-medium: 16px;
    --font-size-large: 18px;
    --font-size-header: 24px;
    --border-radius-large: 25px;
    --border-radius-medium: 10px;
    --border-radius-small: 5px;
    --block-height: 50px;
}

[data-theme="dark"] {
    --background-primary: #1c1d26;
    --background-secondary: #21222c;
    --background-control: #1f2029;
    --background-hover: #20222c;
    --border: #333;
    --text-primary: #fff;
    --text-secondary: #98aab4;
}

body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
        sans-serif;
    font-size: var(--font-size-medium);
    margin: 0;
    background: linear-gradient(to bottom, #20233f, var(--background-primary));
    color: var(--text-primary);
}

input {
    appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input:invalid {
    box-shadow: none;
}

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

@media only screen and (max-width: 768px) {
    .brand {
        margin-left: 16px;
    }

    .title {
        display: none;
    }

    .view {
        min-height: initial;
    }
}
</style>
