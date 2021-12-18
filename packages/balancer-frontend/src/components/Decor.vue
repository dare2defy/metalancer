<template>
    <div class="decor">
        <div class="stars" />
        <div class="planet planet-1" />
        <div class="planet planet-2" />
        <div class="planet planet-3" />
        <div class="planet planet-4" />
        <div class="planet planet-5" />
        <div class="shooting-star shooting-star-1" />
        <div class="shooting-star shooting-star-2" />
        <div class="shooting-star shooting-star-3" />
        <div class="shooting-star shooting-star-4" />
        <div class="shooting-star shooting-star-5" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.decor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    animation: animateBg 14s linear infinite;
    background-image: linear-gradient(70deg, #2d3256, #283659, #202d42, #2d3256, #2d3256);
    background-size: 400% 100%;
}

@keyframes animateBg {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% 0;
    }
}

.stars {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../assets/images/stars.png") no-repeat center / cover;
    animation: stars 5s ease-in-out infinite;
}

@keyframes stars {
    0%,
    100% {
        opacity: 0.1;
    }

    50% {
        opacity: 0.5;
    }
}

.planet {
    position: absolute;
    opacity: 0.1;
}

.planet-1 {
    top: 50px;
    right: 50px;
    width: 301px;
    height: 309px;
    background: url("../assets/images/planet1.png") no-repeat center / contain;
    animation: planet1 120s ease-in-out infinite;
}

@keyframes planet1 {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    50% {
        transform: translate(-50px, -50px) scale(2);
    }
}

.planet-2 {
    top: 90px;
    left: -20px;
    width: 141px;
    height: 141px;
    background: url("../assets/images/planet2.png") no-repeat center / contain;
    animation: planet2 80s linear infinite;
}

@keyframes planet2 {
    0% {
        transform: translate(-140px, 0) scale(1);
    }

    100% {
        transform: translate(600px, 1200px) scale(0.5);
    }
}

.planet-3 {
    top: 70%;
    left: 50%;
    width: 141px;
    height: 72px;
    background: url("../assets/images/planet3.png") no-repeat center / contain;
    animation: planet3 100s linear infinite;
}

@keyframes planet3 {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

.planet-4 {
    top: 60%;
    left: -40px;
    width: 117px;
    height: 87px;
    background: url("../assets/images/planet4.png") no-repeat center / contain;
    animation: planet4 30s ease-in-out infinite;
}

.planet-5 {
    top: 65%;
    right: 20px;
    width: 117px;
    height: 87px;
    background: url("../assets/images/planet4.png") no-repeat center / contain;
    animation: planet5 40s ease-in-out infinite;
}

@keyframes planet4 {
    0%,
    100% {
        transform: scaleX(1);
    }

    50% {
        transform: scaleX(-1);
    }
}

@keyframes planet5 {
    0%,
    100% {
        transform: scaleX(-1);
    }

    50% {
        transform: scaleX(1);
    }
}

.shooting-star {
    position: absolute;
    top: -79px;
    width: 79px;
    height: 79px;
    background: url("../assets/images/shooting-star.png") no-repeat center / contain;
    animation: star 20s linear infinite;
}

.shooting-star-1 {
    left: 55%;
}

.shooting-star-2 {
    left: 105%;
    animation-delay: 4s;
}

.shooting-star-3 {
    left: 25%;
    animation-delay: 8s;
}

.shooting-star-4 {
    left: 70%;
    animation-delay: 12s;
}

.shooting-star-5 {
    left: 40%;
    animation-delay: 16s;
}

@keyframes star {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-1200px, 1200px);
    }
}
</style>
