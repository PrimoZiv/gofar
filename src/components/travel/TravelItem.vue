<template>
    <div class="travel-item">
        <div class="content">
            <span class="title">
                <router-link :to="getUrl()">
                   {{data.title}}
                </router-link>
            </span>
            <div class="abstract">{{data.abstract}}</div>
            <div class="tags">
                <span v-for="(t, index) in data.tags" :key="index">{{t}}</span>
            </div>
        </div>
        <div class="pics">
            <span class="pic" v-for="(p, index) in data.pics" :key="index">
                <img :src="p.src" :alt="p.alt" />
            </span>
        </div>
        <div class="footer">
            <span>{{data.time | convertTime}}</span>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'TravelItem',
    props: ['data'],
    methods: {
        getUrl: function() {
            return '/travel/' + this.data.key
        }
    },
    filters: {
        convertTime: function(val) {
            return new Date(val).toLocaleString()
        }
    }
}
</script>

<style lang="scss" scoped>
.travel-item {
    width: 850px;
    .content {
        height: 80px;
        padding: 15px 0;
        position: relative;

        .title {
            font-size: 20px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            cursor: pointer;

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
        }

        .abstract {
            height: 60px;
            font-size: 14px;
            color: #333;
        }

        .tags {
            position: absolute;
            right: 10px;
            top: 20px;

            span {
                padding: 5px 10px;
                font-size: 12px;
                color: #0099cc;
            }
        }
    }
    .pics {
        height: 120px;

        .pic {
            display: inline-block;
            height: 100px;
            width: 100px;
            margin-right: 20px;
            background: #e0e0e0;

            img {
                height: 100px;
                width: 100px;
            }
        }
    }
    .footer {
        position: relative;
        span {
            position: absolute;
            right: 0;
            bottom: 0;
            color: #888;
            font-size: 12px;
        }
    }
    hr {
        border: none;
        border-top: 1px solid #e0e0e0;
    }
}
</style>
