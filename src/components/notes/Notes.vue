<template>
    <div class="note-list">
        <article-item v-for="n in notes" :key="n.key" :data="n"></article-item>
    </div>
</template>

<script>
import ArticleItem from '../articles/ArticleItem'
export default {
    name: 'Notes',
    data () {
        return {
            notes: []
        }
    },
    mounted () {
        this.$getData('/static/data/notes.json').then(data => {
            this.notes = this.notes.concat(data)
        })
    },
    components: {
        ArticleItem
    }
}
</script>

<style scoped>
.note-list {
    width: 850px;
}
</style>
