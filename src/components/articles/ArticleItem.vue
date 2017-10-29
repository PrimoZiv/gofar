<template>
    <div class="article-item">
        <router-link :to="getUrl()">{{data.title}}</router-link>
        <el-tag size="mini">{{data.time | convertTime}}</el-tag>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['data', 'dir'],
    methods: {
        getUrl: function() {
            return '/' + this.dir + '/' + this.data.articleID
        }
    },
    filters: {
        convertTime: function(val) {
            return new Date(val).toLocaleString()
        }
    }
}
</script>

<style lang="scss" scoped>
.article-item {
    padding: 20px 10px;
    font-size: 18px;
    border-bottom: 1px solid #efefef;

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
    .el-tag {
        float: right;
    }
}
</style>
