<template>
    <div id="navigator">
        <el-row type="flex" :gutter="15" align="middle">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">Logo</div>
            </el-col>
            <el-col :span="14">
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
            <el-col :span="6">
                <el-row type="flex" class="operation" align="middle">
                    <el-col :span="24">
                        <span v-for="(menu, key) in buttons" :key="menu.router" @click="moveTo(menu.router)">
                            <span class="button">{{menu.text}}</span>
                        </span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Navigator',
    data() {
        return {
            user: 'Primo',
            onSearch: false,
            buttons: [{
                text: 'Map',
                router: '/map'
            }, {
                text: 'Settings',
                router: '/'
            }, {
                text: 'Primo',
                router: '/user'
            }]
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
        },
        moveTo: function(router) {
            this.$router.push({ path: router })
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
        height: 50px;

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
                height: 50px;
                position: relative;
                .search-button {
                    width: 35px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 18px 0;
                }
            }
        }

        .operation {
            .button {
                height: 50px;
                padding: 0 20px;
                display: inline-block;
                line-height: 50px;
                cursor: pointer;
                &:hover {
                    background-color: #336699;
                }
            }
            .el-col {
                height: 50px;
            }
        }
    }
}
</style>
