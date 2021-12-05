<template>
    <footer class="footer" />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import Storage from "@/utils/storage";

import Account from "@/components/Account.vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({});
</script>

<style scoped>
.footer {
    flex: 0 0 250px;
    position: relative;
    overflow: hidden;
}

.footer::before,
.footer::after {
    content: "";
    position: absolute;
    top: 50px;
    right: 0;
    bottom: -50px;
    left: 0;
    border-bottom: 50px solid #fff;
    box-sizing: content-box;
    padding-bottom: 48px;
}

.footer::before {
    background: url("../assets/images/smoke-img1.png") no-repeat center top / cover;
    animation: smoke 6s ease-in-out infinite;
}

.footer::after {
    top: 0;
    bottom: 0;
    background: url("../assets/images/smoke-img2.png") no-repeat center top / cover;
    opacity: 0.5;
    animation: smoke2 5s ease-in-out infinite;
}

@keyframes smoke {
    0%,
    100% {
        transform: translateY(10px);
    }

    50% {
        transform: translateY(0);
    }
}

@keyframes smoke2 {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(10px);
    }
}
</style>
