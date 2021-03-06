<template>
    <div class="container">
        <transition-group tag="div" name="cell" class="match-table" :style="{width: clientSize, height: clientSize}">
            <div v-for="(v, id) of icons" :key="v.id" class="match-item"
                @click="turnOver(id)"
                :class="{'turn' : turn.includes(id),
                    'active': hintCell === v.name}">

                <div class="match-icon"
                    :class="['el-icon-' + v.name,
                        turn.includes(id) ? 'turn' : '',
                        successCells.includes(v.name) ? 'success' : '']">
                    
                </div>
            </div>
        </transition-group>
        <div class="match-mask" v-show="complete"></div>
        <div class="btn-start" v-show="complete">
            <div class="tip">
                <span>按Esc键退出</span>
            </div>
            <div>
                <el-button type="primary" @click="refresh">{{btnText}}</el-button>
            </div>
        </div>
        <div class="btn-area">
            <span class="match-record" v-if="matchRecord">Record: {{matchRecord}}</span>
            <el-button type="primary" @click="hint">Hint ({{hintCount}})</el-button>
        </div>
    </div>
</template>

<script>
import {shuffle} from 'lodash'
const MAX_HINT_NUM = 3
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
                        id: index,
                        name: name
                    }
                }),
            isActive: false,
            clientSize: 0,
            turn: [],
            successCells: [],
            hintCell: '',
            hintHistory: [],
            hintCount: MAX_HINT_NUM,
            complete: false,
            btnText: 'Refresh',
            stepCount: 0,
            matchRecord: localStorage.getItem('matchRecord')
        }
    },
    mounted () {
        this.$bus.$emit('full-screen', true)
        this.clientSize = this.getClientSize()

        window.onresize = () => {
            this.clientSize = this.getClientSize()
        }

        document.onkeyup = (e) => {
            if (e.keyCode === 27) {
                this.$router.push('/')
            } else if (e.keyCode === 83) {
                this.refresh()
            }
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

            this.stepCount++
            this.hintHistory.push(this.hintCell)
            this.hintCell = ''

            if (!t.includes(index) && !this.successCells.includes(this.icons[index].name)) {
                m = t.push(index)
            }

            if (m % 2 === 0) {
                {
                    let x = t[m - 1]
                    let y = t[m - 2]
                    setTimeout(() => {
                        this.turnSplice(x)
                        this.turnSplice(y)
                        if (this.icons[x].name === this.icons[y].name && !this.successCells.includes(this.icons[x].name)) {
                            this.successCells.push(this.icons[x].name)
                        }
                        this.checkSuccess()
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
            this.complete = false
            this.turn.splice(0)
            this.hintCell = ''
            this.successCells.splice(0)
            this.icons = shuffle(this.icons)
            this.stepCount = 0
            this.hintCount = MAX_HINT_NUM
        },
        checkSuccess () {
            if (this.successCells.length === this.types) {
                if (!this.matchRecord || parseInt(this.matchRecord, 10) > this.stepCount) {
                    this.btnText = 'New record! Use ' + this.stepCount + ' steps.'
                    this.matchRecord = this.stepCount
                    localStorage.setItem('matchRecord', this.stepCount)
                } else {
                    this.btnText = 'Success! Use ' + this.stepCount + ' steps.'
                }
                this.complete = true
            }
        },
        hint () {
            if (!this.hintCount) {
                this.$message('Reach maximum limit.')
                return
            }

            for (let i of this.icons) {
                if (!this.successCells.includes(i.name) && !this.hintHistory.includes(i.name)) {
                    this.hintCell = i.name
                    this.hintCount--
                    return
                }
            }
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

    .match-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
    }

    .btn-start {
        position: absolute;
        background: #fff;
        opacity: 1;
        font-size: 40px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
        padding: 20px;
        z-index: 50;
    }

    .btn-area {
        position: absolute;
        right: 2%;
        top: 2%;
        z-index: 10;
        color: #ccc;

        .match-record {
            padding: 0 10px;
        }
    }

    .match-table {
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

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
        box-sizing: border-box;

        &.active {
            border: 5px rgb(134, 36, 36) solid;
        }
    }

    .match-icon {
        opacity: 0;
    }
    .tip {
        font-size: 16px;
        line-height: 30px;
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
    transform: rotateY(180deg);
    opacity: 1;
}
.cell-move {
  transition: transform 1s;
}

</style>
