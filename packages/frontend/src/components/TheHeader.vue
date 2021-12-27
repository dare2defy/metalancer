<script setup lang="ts">
import ProjectLogo from "@/components/ProjectLogo.vue";
import UserAccount from "@/components/UserAccount.vue";
</script>

<template>
  <header class="header">
    <div class="header-left">
      <router-link class="brand" :to="'/'">
        <ProjectLogo />
        <span class="title">Dare2Defy</span>
      </router-link>
    </div>
    <div class="header-right">
      <UserAccount class="account" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  flex: 0 0 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;

  &-left {
    display: flex;
    align-items: center;
  }

  &-right {
    display: flex;
    align-items: center;
  }
}

a {
  text-decoration: none;
  color: var(--text-primary);
}

.brand {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.logo {
  height: 22px;
  width: 27px;
}

.title {
  margin-left: 12px;
  font-size: var(--font-size-large);
}

.commit-label {
  margin-left: 8px;
  font-size: var(--font-size-small);
  color: var(--text-secondary);
}

.page-links {
  display: flex;
  align-items: flex-end;
  margin-left: 48px;
}

.link {
  margin-right: 20px;
  color: var(--text-secondary);
  cursor: pointer;
}

.link.active {
  color: var(--text-primary);
}

.account {
  margin: 0 16px;
}

@media only screen and (max-width: 768px) {
  .brand {
    margin-left: 16px;
  }

  .title,
  .commit-label,
  .link {
    display: none;
  }
}
</style>
