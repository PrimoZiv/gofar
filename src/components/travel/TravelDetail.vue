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
            key: this.$route.params.key
        }
    },
    mounted: function() {
        let articles
        this.$http.get('/static/data/articles.json').then(data => {
            articles = data.body.data
            for (let article of articles) {
                if (parseInt(this.key, 10) === article.key) {
                    this.content = article.content
                    break
                }
            }
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
    }
    .other {
        width: 300px;
        height: 600px;
        float: right;
    }
}
</style>
