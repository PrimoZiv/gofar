<template>
    <div class="md" v-html="beautify"></div>
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

<style lang="scss">
.md {
    width: 800px;
    color: #333;
    font-size: 14px;
    line-height: 1.6em;
    box-sizing: border-box;

    & h4, & h5, & p, & ul, & ol, & pre, & blockquote, & table {
        margin: 1.5em 0;
    }
    &>h1:first-child, & h2:first-child, & h3:first-child, & h4:first-child, & p:first-child, & ul:first-child, & ol:first-child, & pre:first-child, & blockquote:first-child {
        margin-top: 0;
    }
    ul li, ol li {
        margin: .3em 0;
    }
    ul ul, ul ol, ol ul, ol ol {
        margin-top: 0;
        margin-bottom: 0;
    }
    pre {
        padding: 1em;
        vertical-align: top;
        background: #f2f2f2;
        overflow-x: auto;
        line-height: 1.45em;
        border-radius: 8px;
    }
    span.inline-code, pre {
        font-size: 0.93em;
        font-family: Consolas,"Lucida Console",monospace;
    }
    span.inline-code {
        padding: 2px 4px;
        font-size: 90%;
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 4px;
    }
    blockquote {
        border-left: 2px solid #009A61;
        background: #F6F6F6;
        color: #555;
        font-size: 1em;
        padding: 10px 20px;
    }
    h1, h2 {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    h1, h2, h3 {
        margin: 1.5em 0 0;
    }
    h1 {
        font-size: 2.25em;
    }
    h2 {
        font-size: 1.75em;
    }
    h3 {
        font-size: 1.5em;
    }
    h4 {
        font-size: 1.25em;
    }
    h5 {
        font-size: 1em;
    }
    h6 {
        font-size: 0.86em;
    }
}
</style>
