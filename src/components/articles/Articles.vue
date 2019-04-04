<template>
    <div class="article-list">
        <article-item v-for="p in articles" :key="p.key" :data="p" dir="articles"></article-item>
    </div>
</template>

<script>
import ArticleItem from './ArticleItem'
export default {
    name: 'Articles',
    data () {
        return {
            articles: []
        }
    },
    mounted () {
        this.$getData('static/data/articles.json').then(data => {
            this.articles = this.articles.concat(data).sort((a1, a2) => {
                return a2.time - a1.time
            })
        })
    },
    components: {
        ArticleItem
    }
}
</script>

<style scoped>
.article-list {
    width: 850px;
}
</style>
