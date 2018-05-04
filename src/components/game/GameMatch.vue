<template>
    <div class="container">
        <transition-group tag="div" name="cell" class="match-table" :style="{width: clientSize, height: clientSize}">
            <!-- <div v-for="x of 6" :key="x - 1" class="match-row"> -->
                <div v-for="(v, id) of icons" :key="id" class="match-item"
                    @click="turnOver(id)"
                    :class="[turn.includes(id) ? 'turn' : '']">

                    <div class="match-icon"
                        :class="['el-icon-' + v.name,
                            turn.includes(id) ? 'turn' : '',
                            successCells.includes(v.name) ? 'success' : '']">
                        
                    </div>
                </div>
            <!-- </div> -->
        </transition-group>
    </div>
</template>

<script>
import {shuffle} from 'lodash'
export default {
    data () {
        return {
            types: 18,
            icons: ['goods', 'news', 'date', 'printer', 'time', 'message', 'bell',
                'phone', 'service', 'view', 'star-off', 'location-outline', 'zoom-in',
                'picture-outline', 'edit-outline', 'rank', 'circle-plus-outline', 'search',
                'goods', 'news', 'date', 'printer', 'time', 'message', 'bell',
                'phone', 'service', 'view', 'star-off', 'location-outline', 'zoom-in',
                'picture-outline', 'edit-outline', 'rank', 'circle-plus-outline', 'search'].map(function (name, index) {
                    return {
                        name: name
                    }
                }),
            isActive: false,
            clientSize: 0,
            turn: [],
            successCells: []
        }
    },
    mounted () {
        this.$bus.$emit('full-screen', true)
        this.clientSize = this.getClientSize()

        window.onresize = () => {
            this.clientSize = this.getClientSize()
        }

        this.refresh()
    },
    destroyed () {
        this.$bus.$emit('full-screen', false)
    },
    methods: {
        getClientSize () {
            let w = document.body.clientWidth
            let h = document.body.clientHeight
            return (w > h ? h : w) + 'px'
        },
        turnOver (index) {
            let m
            let t = this.turn

            if (!t.includes(index)) {
                m = t.push(index)
            }

            if (m % 2 === 0) {
                if (this.icons[t[m - 1]].name === this.icons[t[m - 2]].name) {
                    this.successCells.push(this.icons[t[m - 1]].name)
                }

                {
                    let x = t[m - 1]
                    let y = t[m - 2]
                    setTimeout(() => {
                        this.turnSplice(x)
                        this.turnSplice(y)
                    }, 800)
                }
            }
        },
        turnSplice (id) {
            let i = this.turn.findIndex((v) => {
                return id === v
            })
            this.turn.splice(i, 1)
        },
        refresh () {
            this.icons = shuffle(this.icons)
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgb(28, 51, 77);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .match-table {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    // .match-row {
    //     width: 100%;
    //     height: 15%;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: space-around;
    // }

    .match-item {
        width: 15%;
        height: 15%;
        background: rgb(129, 105, 60);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 200%;
        border-radius: 10%;
        backface-visibility: visible;
    }

    .match-icon {
        opacity: 0;
    }
}

.match-item.turn {
    transform: rotateY(180deg);
    transition: all 1s;
}
.match-icon.turn {
    opacity: 1;
    transition: all 1s;
}
.match-icon.success {
    opacity: 1;
}
.cell-move {
  transition: transform 1s;
}

</style>
