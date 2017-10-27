<template>
    <div id="navigator">
        <el-menu :default-active="activeIndex" mode="horizontal"
            background-color="#1199cc"
            text-color="#fff"
            menu-trigger="click"
            active-text-color="#FFB400"
            :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-submenu index="/">
                <template slot="title">Map</template>
                <el-menu-item index="/map-place">地点</el-menu-item>
                <el-menu-item index="/map-province">省份</el-menu-item>
            </el-submenu>
            <el-menu-item index="/travel">游记</el-menu-item>
            <el-menu-item index="/articles">文章</el-menu-item>

            <el-row type="flex" :gutter="15" align="middle">
                <el-col :span="16" :offset="7">
                    <el-row class="search" type="flex" align="middle">
                        <el-col class="button-wrap" :span="2" :offset="22" v-show="!onSearch">
                            <el-button type="text" icon="el-icon-search" class="search-button" @click="search"></el-button>
                        </el-col>
                        <el-col v-show="onSearch" :span="24">
                            <transition name="slide-fade">
                                <el-form v-show="onSearch">
                                    <el-form-item>
                                        <el-input placeholder="Search" suffix-icon="el-icon-search" @blur="search" ref="searchBox"></el-input>
                                    </el-form-item>
                                </el-form>
                            </transition>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'Navigator',
    data() {
        return {
            user: 'Primo',
            onSearch: false
        }
    },
    computed: {
        activeIndex: function() {
            // use main menu
            return this.$route.path.split('/').slice(0, 2).join('/')
        }
    },
    methods: {
        search: function() {
            this.onSearch = !this.onSearch
            if (this.onSearch) {
                this.$nextTick(function() {
                    this.$refs.searchBox.focus()
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
}

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

        .search {
            .el-form-item {
                margin-bottom: 0;
            }
            .button-wrap {
                height: 60px;
                position: relative;
                .search-button {
                    width: 35px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 23px 0;
                }
            }
        }
    }
}
</style>
