<template>
    <div v-html="beautify"></div>
</template>

<script>
import mark from '../plugins/markdown.js'
export default {
    name: 'Markdown',
    props: ['content'],
    computed: {
        beautify: function() {
            return mark(this.content)
        }
    }
}
</script>

<style>

</style>
