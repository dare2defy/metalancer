<template>
  <footer class="footer" />
</template>

<style lang="scss" scoped>
.footer {
  flex: 0 0 250px;
  position: relative;
  overflow: hidden;
  min-height: 250px;

  &::before,
  &::after {
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

  &::before {
    background: url("~@/assets/images/decor/smoke-img1.png") no-repeat center
      top / cover;
    animation: smoke 6s ease-in-out infinite;
  }

  &::after {
    top: 0;
    bottom: 0;
    background: url("~@/assets/images/decor/smoke-img2.png") no-repeat center
      top / cover;
    opacity: 0.5;
    animation: smoke2 5s ease-in-out infinite;
  }
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
