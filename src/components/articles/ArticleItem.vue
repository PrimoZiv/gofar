<template>
    <div class="article-item">
        <router-link :to="getUrl()">{{data.title}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['data'],
    methods: {
        getUrl: function() {
            return '/articles/' + this.data.articleID
        }
    }
}
</script>

<style lang="scss" scoped>
.article-item {
    padding: 10px;
    font-size: 18px;

    a {
        &:link, &:visited {
            color: #000;
            text-decoration: none;
        }
        &:hover, &:active {
            color: #ffb400;
            text-decoration: underline;
        }
    }
}
</style>
