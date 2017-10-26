<template>
    <div>
        <router-link :to="getUrl()">{{data.title}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'ProblemItem',
    props: ['data'],
    methods: {
        getUrl: function() {
            return '/problems/' + this.data.articleID
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>
