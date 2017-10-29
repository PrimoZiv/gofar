<template>
    <div>
        <div class="photos">
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in 5" :key="item">
                    <h3></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="types">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Travel</div>
                        <div class="card__item" v-for="t in travel" :key="t.key">
                            <router-link :to="getUrl('travel', t.key)">{{t.title}}</router-link>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Articles</div>
                        <div class="card__item" v-for="a in articles" :key="a.key">
                            <router-link :to="getUrl('articles', a.articleID)">{{a.title}}</router-link>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Notes</div>
                        <div class="card__item" v-for="n in notes" :key="n.key">
                            <router-link :to="getUrl('notes', n.articleID)">{{n.title}}</router-link>
                        </div>
                    </el-card>
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
            travel: [],
            notes: [],
            articles: []
        }
    },
    mounted: function() {
        this.$getData('/static/data/articles.json').then(data => {
            let articles = data.sort((a1, a2) => {
                return a1.time - a2.time
            }).slice(0, 5)
            this.articles = this.articles.concat(articles)
        })
        this.$getData('/static/data/notes.json').then(data => {
            let notes = data.sort((a1, a2) => {
                return a1.time - a2.time
            }).slice(0, 5)
            this.notes = this.notes.concat(notes)
        })
        this.$getData('/static/data/travel.json').then(data => {
            let travel = data.sort((a1, a2) => {
                return a1.time - a2.time
            }).slice(0, 5)
            this.travel = this.travel.concat(travel)
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
.el-carousel {
    .el-carousel__item--card:nth-child(3) {
        background: url(../assets/carousel1.jpg);
    }
    .el-carousel__item--card:nth-child(4) {
        background: url(../assets/carousel2.jpg);
    }
    .el-carousel__item--card:nth-child(5) {
        background: url(../assets/carousel3.jpg);
    }
    .el-carousel__item--card:nth-child(6) {
        background: url(../assets/carousel4.jpg);
    }
    .el-carousel__item--card:nth-child(7) {
        background: url(../assets/carousel5.jpg);
    }
}

.types {
    margin-top: 70px;

    .card__item {
        padding: 3px 0;
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
}
</style>
