<template>
    <div v-html="beautify"></div>
</template>

<script>
export default {
    name: 'Markdown',
    props: ['content'],
    computed: {
        beautify: function() {
            return '<h1>' + this.content + '</h1>'
        }
    }
}
</script>

<style>

</style>
