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
        <div class="btn-start" v-show="menu" @click="sudoku">{{menuText}}</div>
    </div>
</template>

<script>
import {blink} from 'sudoku-matrix'
export default {
    data () {
        return {
            menu: true,
            menuText: 'Start',
            clientSize: 0,
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
            } else {
                this.fillNumber(e)
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
            this.menuText = 'Loading'
            setTimeout(() => {
                let m = blink()
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
                if (this.checkMatrix(this.matrix) === true) {
                    this.menu = true
                    this.menuText = 'Success!'
                }
            }
        },
        checkMatrix (matrix) {
            // Check row
            for (let [i, r] of matrix.entries()) {
                if (r.includes(0)) {
                    return false
                } else if ((new Set(r)).size < 9) {
                    return {
                        row: i
                    }
                }
            }

            // Check column
            let count = 9
            let s = new Set()
            while (count--) {
                s.clear()
                for (let i = 0; i < 9; i++) {
                    if (!/^[1-9]$/.test(matrix[i][count])) {
                        return false
                    }
                    s.add(matrix[i][count])
                }
                if (s.size < 9) {
                    return {
                        column: count
                    }
                }
            }

            // Check block
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    let m = x * 3
                    let n = y * 3
                    let block = [
                        matrix[m][n], matrix[m][n + 1], matrix[m][n + 2],
                        matrix[m + 1][n], matrix[m + 1][n + 1], matrix[m + 1][n + 2],
                        matrix[m + 2][n], matrix[m + 2][n + 1], matrix[m + 2][n + 2]
                    ]

                    if (block.includes(0)) {
                        return false
                    } else if ((new Set(block)).size < 9) {
                        return {
                            block: [x, y]
                        }
                    }
                }
            }

            return true
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

    .sudoku-mask, .sudoku-bingo {
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
    }

    .btn-start {
        position: absolute;
        width: 200px;
        height: 100px;
        line-height: 100px;
        background: #fff;
        opacity: 1;
        font-size: 40px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
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
}
</style>

