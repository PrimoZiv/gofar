<template>
    <div class="container">
        <div class="sudoku-table" :style="{width: clientSize, height: clientSize}">
            <div v-for="(row, x) in matrix" :key="x" class="sudoku-row">
                <div v-for="(v, y) in row" :key="y" class="sudoku-item"
                    :class="{'top-line': x === 0,
                             'bottom-line': x === 8,
                             'left-line': y === 0,
                             'right-line': y === 8,
                             'top-split': x === 3 || x === 6,
                             'left-split': y === 3 || y === 6,
                             'selected': x === selected.x && y === selected.y,
                             'active': getMmatrixMem(x, y) === 0}"
                    @click="selectBox(x, y)">
                    {{v || ''}}
                </div>
            </div>
        </div>
        <div class="sudoku-mask" v-show="menu"></div>
        <div class="btn-start" v-show="menu">
            <div class="tip">
                <span>按Esc键退出</span>
            </div>
            <div>
                <el-radio-group v-model="level">
                    <el-radio :label="16">入门</el-radio>
                    <el-radio :label="24">简单</el-radio>
                    <el-radio :label="38">中等</el-radio>
                    <el-radio :label="50">困难</el-radio>
                </el-radio-group>
            </div>
            <div>
                <el-button type="primary" @click="sudoku">{{menuText}}</el-button>
            </div>
        </div>
        <div class="btn-area">
            <el-button type="primary" @click="open">Check</el-button>
        </div>
    </div>
</template>

<script>
import {blink, checkMatrix} from 'sudoku-matrix'
export default {
    data () {
        return {
            menu: true,
            menuText: 'Start',
            clientSize: 0,
            level: 24,
            steps: 0,
            checkMsg: 'Not completed.',
            selected: {
                x: -1,
                y: -1
            },
            matrixM: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            matrix: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
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
            } else if ((e.keyCode >= 49 && e.keyCode <= 57) || (e.keyCode >= 97 && e.keyCode <= 105)) {
                this.fillNumber(e)
            } else if (e.keyCode >= 37 && e.keyCode <= 40) {
                this.focusCell(e.keyCode)
            }
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
        },
        selectBox (x, y) {
            // 如果不是disable的单元格则可以选中
            if (this.matrixM[x][y] === 0) {
                this.selected.x = x
                this.selected.y = y
            }
        },
        sudoku () {
            this.menuText = 'Loading...'
            setTimeout(() => {
                let m = blink(this.level)
                this.matrixM = m
                this.matrix.splice(0, this.matrix.length, [...m[0]], [...m[1]], [...m[2]], [...m[3]],
                        [...m[4]], [...m[5]], [...m[6]], [...m[7]], [...m[8]])
                this.menuText = 'Start'
                this.menu = false
            }, 10)
        },
        getMmatrixMem (x, y) {
            x = +x
            y = +y
            return this.matrixM && this.matrixM[x][y]
        },
        fillNumber (e) {
            let number = 0
            let code = e.keyCode
            if (code >= 49 && code <= 57) {
                number = code - 48
            } else if (code >= 97 && code <= 105) {
                number = code - 96
            }

            if (number && this.selected.x !== -1 && this.selected.y !== -1) {
                this.$set(this.matrix[this.selected.x], this.selected.y, number)
                let res = checkMatrix(this.matrix)
                if (res === true) {
                    this.selected.x = -1
                    this.selected.y = -1
                    this.menu = true
                    this.menuText = 'Success! Use ' + this.steps + ' steps.'
                    this.steps = 0
                    this.checkMsg = 'Not completed.'
                } else {
                    this.steps++
                    if (res === false) {
                        this.checkMsg = 'Not completed.'
                    } else if (res.row) {
                        this.checkMsg = 'The ' + (res.row + 1) + ' line repeats.'
                    } else if (res.column) {
                        this.checkMsg = 'The ' + (res.column + 1) + ' column repeats.'
                    } else if (res.block) {
                        this.checkMsg = 'The ' + (res.block[0] * 3 + res.block[1] + 1) + 'block repeats.'
                    }
                }
            }
        },
        // Keyboard arrow operation.
        focusCell (code) {
            let m = this.matrixM
            let x = this.selected.x
            let y = this.selected.y
            let first = false
            let last = false
            let next = false
            let prev = false

            if (code === 37 || code === 39) {
                for (let i = 0, len = m.length; i < len; i++) {
                    for (let j = 0, lenJ = m[i].length; j < lenJ; j++) {
                        if (m[i][j] === 0) {
                            if (!first) {
                                first = {
                                    x: i,
                                    y: j
                                }
                            }
                            last = {
                                x: i,
                                y: j
                            }
                            if (i < x || (i === x && j < y)) {
                                prev = {
                                    x: i,
                                    y: j
                                }
                            }
                            if (!next && (i > x || (i === x && j > y))) {
                                next = {
                                    x: i,
                                    y: j
                                }
                            }
                        }
                    }
                }
            } else {
                for (let i = 0, len = m.length; i < len; i++) {
                    for (let j = 0, lenJ = m[i].length; j < lenJ; j++) {
                        if (m[j][i] === 0) {
                            if (!first) {
                                first = {
                                    x: j,
                                    y: i
                                }
                            }
                            last = {
                                x: j,
                                y: i
                            }
                            if (i < y || (i === y && j < x)) {
                                prev = {
                                    x: j,
                                    y: i
                                }
                            }
                            if (!next && (i > y || (i === y && j > x))) {
                                next = {
                                    x: j,
                                    y: i
                                }
                            }
                        }
                    }
                }
            }

            switch (code) {
            case 37:
                if (x < first.x || (x === first.x && y <= first.y)) {
                    this.selected.x = last.x
                    this.selected.y = last.y
                } else {
                    this.selected.x = prev.x
                    this.selected.y = prev.y
                }
                break
            case 38:
                if (y < first.y || (y === first.y && x <= first.x)) {
                    this.selected.x = last.x
                    this.selected.y = last.y
                } else {
                    this.selected.x = prev.x
                    this.selected.y = prev.y
                }
                break
            case 39:
                if (x > last.x || (x === last.x && y >= last.y)) {
                    this.selected.x = first.x
                    this.selected.y = first.y
                } else {
                    this.selected.x = next.x
                    this.selected.y = next.y
                }
                break
            case 40:
                if (y > last.y || (y === last.y && x >= last.x)) {
                    this.selected.x = first.x
                    this.selected.y = first.y
                } else {
                    this.selected.x = next.x
                    this.selected.y = next.y
                }
                break
            }
        },
        open() {
            this.$message(this.checkMsg)
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

    .sudoku-mask {
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
    }

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
        font-size: 30px;
        display: inline-block;
        border-left: 1px solid $borderColor;
        border-top: 1px solid $borderColor;
        cursor: default;

        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
            cursor: pointer;
            background: rgb(71, 86, 109);
        }

        &.selected {
            background: $borderColor;
        }

        // Border Style
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
    .tip {
        font-size: 16px;
        line-height: 30px;
    }
}
</style>

