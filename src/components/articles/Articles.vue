<template>
    <div>
        <article-item v-for="p in articles" :key="p.key" :data="p"></article-item>
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
        this.$getData('/static/data/articles.json').then(data => {
            this.articles = this.articles.concat(data)
        })
    },
    components: {
        ArticleItem
    }
}
</script>

<style>

</style>
