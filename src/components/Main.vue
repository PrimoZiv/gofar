<template>
    <div>
        <div class="types">
            <el-row :gutter="30">
                <el-col v-for="t in items" :key="t.id">
                    <div>
                        <span>[{{t.typeName}}]: </span>
                        <router-link :to="getUrl(t.type, t.type === 'travel' ? t.key : t.articleID)">{{t.title}}</router-link>
                        <span v-if="t.tags && t.tags.length">
                            <el-tag size="mini" type="success" v-for="(v, i) in t.tags" :key="i">{{v}}</el-tag>
                        </span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {
            items: [],
            travel: [],
            notes: [],
            articles: []
        }
    },
    mounted: function() {
        Promise.all([
            this.$getData('/static/data/articles.json'),
            this.$getData('/static/data/notes.json'),
            this.$getData('/static/data/travel.json')
        ]).then(data => {
            data[0].map(v => {
                v.type = 'articles'
                v.typeName = '文章'
                v.id = v.type + v.key
            })
            data[1].map(v => {
                v.type = 'notes'
                v.typeName = '笔记'
                v.id = v.type + v.key
            })
            data[2].map(v => {
                v.type = 'travel'
                v.typeName = '游记'
                v.id = v.type + v.key
            })
            this.items = [...data[0], ...data[1], ...data[2]].sort((a1, a2) => {
                return a2.time - a1.time
            })
        })
    },
    methods: {
        getUrl (type, name) {
            return '/' + type + '/' + name
        }
    }
}
</script>

<style lang="scss" scoped>

.types {
    .el-col {
        padding: 10px 0;
    }

    a {
        &:link, &:visited {
            color: #000;
            text-decoration: none;
        }
        &:hover, &:active {
            color: #0099CC;
            text-decoration: underline;
        }
    }

    .el-tag {
        margin-right: 5px;
    }
}
</style>
