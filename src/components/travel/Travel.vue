<template>
    <div class="travel">
        <div class="list">
            <travel-item v-for="item in travelItems" :data="item" :key="item.key"></travel-item>
        </div>
        <div class="other">
            <recommend></recommend>
        </div>
    </div>
</template>

<script>
import Recommend from '../Recommend.vue'
import TravelItem from './TravelItem'
export default {
    data: function() {
        return {
            travelItems: []
        }
    },
    mounted: function() {
        this.$getData('/static/data/travel.json').then(data => {
            this.travelItems = this.travelItems.concat(data).sort((a1, a2) => {
                return a2.time - a1.time
            })
            this.$emit('loading')
        })
    },
    components: {
        TravelItem,
        Recommend
    }
}
</script>

<style lang="scss" scoped>
.list {
    display: inline-block;
}
.other {
    width: 300px;
    height: 600px;
    float: right;
}
</style>
