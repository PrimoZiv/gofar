<template>
    <div class="traveldetail">
        <div class="traveldetail_content">
            {{content}}
        </div>
        <div class="other">
            <recommend></recommend>
        </div>
    </div>
</template>

<script>
import Recommend from '../Recommend.vue'
export default {
    name: 'TravelDetail',
    data() {
        return {
            content: '',
            key: parseInt(this.$route.params.key, 10)
        }
    },
    mounted: function() {
        this.$getData('/static/data/articles.json', {key: this.key}).then((data) => {
            this.content = data.content
        })
    },
    components: {
        Recommend
    }
}
</script>

<style lang="scss">
.traveldetail {
    overflow: hidden;

    .traveldetail_content {
        width: 850px;
        display: inline-block;
    }
    .other {
        width: 300px;
        height: 600px;
        float: right;
    }
}
</style>
