<template>
    <div>
        <markdown :content="content"></markdown>
    </div>
</template>

<script>
import Markdown from '../Markdown'
export default {
    name: 'ProblemDetail',
    data() {
        return {
            content: '',
            key: this.$route.params.key
        }
    },
    mounted () {
        this.$http.get('/static/articles/' + this.key + '.md').then(res => {
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
