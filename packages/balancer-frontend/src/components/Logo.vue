<template>
    <router-link class="logo" :to="'/'">
        <span class="logo__d">D</span>
        <span class="logo__2">2</span>
    </router-link>
</template>

<style scoped>
.logo {
    position: relative;
    font-size: 40px;
    font-weight: 900;
    line-height: 1;
    color: #fff;
}

.logo__d {
    font-size: 1em;
}

.logo__2 {
    position: absolute;
    top: -0.3em;
    right: -0.3em;
    font-size: 0.4em;
}
</style>
