<template>
    <div>
        <div class="photos">
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in 5" :key="item">
                    <h3>{{item}}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="types">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Map</div>
                        <div><router-link to="/map-place">地点图</router-link></div>
                        <div><router-link to="/map-province">省份图</router-link></div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header"><router-link to="/travel">Travel</router-link></div>
                        <div><router-link to="/travel/detail/0">成都</router-link></div>
                        <div><router-link to="/travel/detail/1">厦门</router-link></div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Articles</div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    mounted: function() {
        this.$emit('loading')
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
