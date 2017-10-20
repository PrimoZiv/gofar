<template>
    <div class="travel-item">
        <div class="content">
            <span class="title">{{data.title}}</span>
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
        <hr>
    </div>
</template>

<script>
export default {
    name: 'TravelItem',
    props: ['data']
}
</script>

<style lang="scss" scoped>
.travel-item {
    height: 200px;
    margin-bottom: 30px;
    .content {
        height: 80px;
        padding: 15px 20px;
        position: relative;

        .title {
            font-size: 20px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            cursor: pointer;

            &:hover {
                color: #FFB400;
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
                color: #0099CC;
            }
        }
    }
    .pics {
        height: 120px;
        padding: 0 20px;

        .pic {
            display: inline-block;
            height: 100px;
            width: 100px;
            margin-right: 20px;
            background: #E0E0E0;

            img {
                height: 100px;
                width: 100px;
            }
        }
    }
    hr {
        border: none;
        border-top: 1px solid #E0E0E0;
    }

}
</style>
