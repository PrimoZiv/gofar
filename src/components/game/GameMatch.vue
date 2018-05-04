<template>
    <div class="container">
        <div v-for="x of 6" :key="x - 1" class="match-row">
            <div v-for="y of 6" :key="(x - 1) * 6 + y - 1" class="match-item"
                :class="[isActive === icons[(x - 1) * 6 + y - 1] ? 'active' : '', 'el-icon-' + icons[(x - 1) * 6 + y - 1]]">
                {{icons[(x - 1) * 6 + y - 1] || ''}}
            </div>
        </div>
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
                'picture-outline', 'edit-outline', 'rank', 'circle-plus-outline', 'search'],
            isActive: false
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

<style lang="scss" scoped>

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
}
</style>
