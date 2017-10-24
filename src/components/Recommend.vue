<template>
    <el-card>
        <div slot="header">可能感兴趣的？</div>
        <div class="recommend_content">
            <div class="recommend_item" v-for="r in recommends" :key="r.link">
                <router-link :to="r.link">{{r.title}}</router-link>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'Recommend',
    data() {
        return {
            recommends: [{
                title: 'Map place',
                link: '/map-place'
            }, {
                title: 'Map province',
                link: '/map-province'
            }]
        }
    }
}
</script>

<style lang="scss">
.recommend_content {
    .recommend_item {
        padding: 5px;
        margin-top: 10px;
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
