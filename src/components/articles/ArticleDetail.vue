<template>
    <div>
        <markdown :content="content"></markdown>
    </div>
</template>

<script>
import Markdown from '../Markdown'
export default {
    name: 'ArticleDetail',
    data() {
        return {
            content: '',
            name: this.$route.params.name
        }
    },
    mounted () {
        this.$http.get('/static/articles/' + this.name + '/' + this.name + '.md').then(res => {
            this.content = res.body
        })
    },
    components: {
        Markdown
    }
}
</script>

<style>

</style>
