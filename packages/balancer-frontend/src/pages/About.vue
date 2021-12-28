<template>
    <div class="page">
        <div class="content">
            <h1>About Us</h1>
            <p>Some content</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.page {
    flex: 1;
}

.content {
    position: relative;
    max-width: 980px;
    margin: 0 auto;
    padding: 16px;
}
</style>
