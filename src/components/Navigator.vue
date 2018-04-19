<template>
    <div id="navigator">
        <el-row type="flex">
            <el-col :span="22">
                <el-menu :default-active="activeIndex" mode="horizontal"
                    background-color="#1199cc"
                    text-color="#fff"
                    menu-trigger="click"
                    active-text-color="#FFB400"
                    :router="true">
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/notes">笔记</el-menu-item>
                    <el-menu-item index="/articles">文章</el-menu-item>
                    <el-menu-item index="/album">相册</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="2">
                <el-menu :default-active="activeIndex" mode="horizontal"
                    background-color="#1199cc"
                    text-color="#fff"
                    menu-trigger="click"
                    active-text-color="#FFB400"
                    :router="true">
                    <el-submenu index="/">
                        <template slot="title">Map</template>
                        <el-menu-item index="/map-place">地点</el-menu-item>
                        <el-menu-item index="/map-province">省份</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Navigator',
    data() {
        return {
            user: 'Primo'
        }
    },
    computed: {
        activeIndex: function() {
            // use main menu
            return this.$route.path.split('/').slice(0, 2).join('/')
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
#navigator {
    color: white;
    box-shadow: 0 0px 8px 0px #363636;
    background-color: #0099CC;

    .el-row {
        height: 60px;

        .el-from {
            .el-form-item {
                margin-bottom: 0;
            }
        }

        .el-button {
            color: white;
        }
    }
}
</style>
