<template>
    <div class="md" v-html="beautify" v-highlight></div>
</template>

<script>
import mark from '../plugins/markdown.js'
import hl from 'highlight.js/lib/highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// import part of languages
hl.registerLanguage('json', require('highlight.js/lib/languages/json'))
hl.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hl.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hl.registerLanguage('css', require('highlight.js/lib/languages/css'))
hl.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hl.registerLanguage('php', require('highlight.js/lib/languages/php'))
hl.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))

export default {
    name: 'Markdown',
    props: ['content'],
    computed: {
        beautify: function() {
            return mark(this.content)
        }
    },
    directives: {
        highlight: {
            update: function(el) {
                // hl.configure({useBR: true});
                hl.fixMarkup('<br>')
                Array.from(el.childNodes).filter(node => {
                    return node.nodeName === 'PRE'
                }).map(node => {
                    hl.highlightBlock(node.childNodes[0])
                })
            }
        }
    }
}
</script>

<style lang="scss">
$width: 800px;
.md {
    width: $width;
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
    a {
        &:link, &:visited {
            color: #006485;
            text-decoration: underline;
        }
        &:hover, &:active {
            color: #0099CC;
            text-decoration: underline;
        }
    }
    img {
        vertical-align: bottom;
        box-shadow: 0 0 20px 0 #666;
        max-width: $width;
    }
    pre {
        vertical-align: top;
        background: #f2f2f2;
        overflow-x: auto;
        line-height: 1.45em;
        border-radius: 5px;

        code {
            padding: 1em;
        }
    }
    span.inline-code, pre code {
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
