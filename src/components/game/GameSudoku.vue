<template>
    <div class="container">
        <div class="sudoku-table" :style="{width: clientSize, height: clientSize}">
            <div v-for="x in 9" :key="x" class="sudoku-row">
                <div v-for="y in 9" :key="y" class="sudoku-item"
                    :class="{'top-line': x === 1,
                             'bottom-line': x === 9,
                             'left-line': y === 1,
                             'right-line': y === 9,
                             'top-split': x === 4 || x === 7,
                             'left-split': y === 4 || y === 7}">{{x}}{{y}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            clientSize: 0
        }
    },
    mounted () {
        this.$bus.$emit('full-screen', true)
        this.clientSize = this.getClientSize()

        window.onresize = () => {
            this.clientSize = this.getClientSize()
        }
    },
    destroyed () {
        this.$bus.$emit('full-screen', false)
    },
    methods: {
        getClientSize () {
            let w = document.body.clientWidth
            let h = document.body.clientHeight
            return (w > h ? h : w) + 'px'
        }
    }
}
</script>

<style lang="scss">
$borderColor: rgb(165, 140, 59);
.container {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgb(28, 51, 77);
    display: flex;
    justify-content: center;
    align-items: center;

    .sudoku-table {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .sudoku-row {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .sudoku-item {
        width: 10%;
        height: 100%;
        color: #e0e0e0;
        font-size: 20px;
        display: inline-block;
        border-left: 1px solid $borderColor;
        border-top: 1px solid $borderColor;

        display: flex;
        justify-content: center;
        align-items: center;

        &.top-line {
            border-top-width: 3px;
        }
        &.left-line {
            border-left-width: 3px;
        }

        &.bottom-line {
            border-bottom: 3px solid $borderColor;
        }

        &.right-line {
            border-right: 3px solid $borderColor;
        }

        &.top-split {
            border-top-width: 3px;
        }

        &.left-split {
            border-left-width: 3px;
        }
    }
}
</style>

