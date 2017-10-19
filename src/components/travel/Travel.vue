<template>
    <div class="travel">
        <travel-item v-for="item in travelItems" :data="item" :key="item.key"></travel-item>
    </div>
</template>

<script>
import TravelItem from './TravelItem'
export default {
    data: function() {
        return {
            travelItems: [{
                key: 0,
                title: '我去成都那次',
                abstract: '我去成都那次我去成都那次我去成都那次我去成都那次我去成都那次我去成都那次我去成都那次我去成都那次我去成都那次'
            }, {
                key: 1,
                title: '我去厦门那次',
                abstract: '我去厦门那次我去厦门那次我去厦门那次我去厦门那次我去厦门那次我去厦门那次我去厦门那次我去厦门那次我去厦门那次'
            }]
        }
    },
    components: {
        TravelItem
    }
}
</script>

<style lang="scss" scoped>
    .travel {
        margin-top: 50px;
    }
</style>
