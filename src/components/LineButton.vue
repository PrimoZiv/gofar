<template>
    <div>
        <div class="btn-container" :class="type" v-if="type === 'menu'">
            <div class="btn-line"></div>
            <div class="btn-line"></div>
            <div class="btn-line"></div>
        </div>
        <div class="btn-container" :class="type" v-if="type === 'prev'">
            <div class="btn-line"></div>
            <div class="btn-line"></div>
        </div>
        <div class="btn-container" :class="type" v-if="type === 'next'">
            <div class="btn-line"></div>
            <div class="btn-line"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: ['type']
}
</script>

<style lang="scss" scoped>
    .btn-container {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        background: rgb(132, 190, 238);
        box-shadow: 0px 0px 8px 1px rgba(123, 123, 123, 0.3);
    }
    .btn-line {
        width: 22px;
        height: 0;
        border-bottom: 1px solid #fff;
        overflow: hidden;
    }
    .btn-container.menu {
        height: 18px;
        padding: 16px 0;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .btn-container.menu:hover .btn-line:first-child {
        animation: hoverUp 1s 1;
    }
    .btn-container.menu:hover .btn-line:nth-child(2) {
        animation: clickTurn 0.8s 1;
    }
    .btn-container.menu:hover .btn-line:last-child {
        animation: hoverDown 1s 1;
    }
    @keyframes hoverUp {
        0% {
            transform: translateY(0);
        }
        70% {
            transform: translateY(-2px);
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes hoverDown {
        0% {
            transform: translateY(0);
        }
        70% {
            transform: translateY(2px);
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes clickUp {
        0% {
            transform: translateY(0);
        }
        70% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes clickTurn {
        0% {
            transform: rotateZ(0);
        }
        100% {
            transform: rotateZ(180deg);
        }
    }
    @keyframes clickDown {
        0% {
            transform: translateY(0);
        }
        70% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .btn-container.prev, .btn-container.next {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .btn-line {
            width: 16px;
            border-width: 2px;
        }
    }
    .btn-container.next {
        transform: rotateZ(180deg);
    }
    .btn-container.prev .btn-line:first-child,
    .btn-container.next .btn-line:first-child {
        position: absolute;
        transform: translateX(5px) rotateZ(45deg);
    }
    .btn-container.prev:hover .btn-line:first-child,
    .btn-container.next:hover .btn-line:first-child {
        position: absolute;
        transform: translateX(7px) rotateZ(30deg);
        transition: 0.5s all ease;
    }
    .btn-container.prev .btn-line:last-child,
    .btn-container.next .btn-line:last-child {
        position: absolute;
        transform: translateX(-5px) rotateZ(-45deg);
    }
    .btn-container.prev:hover .btn-line:last-child,
    .btn-container.next:hover .btn-line:last-child {
        position: absolute;
        transform: translateX(-7px) rotateZ(-30deg);
        transition: 0.5s all ease;
    }
</style>

