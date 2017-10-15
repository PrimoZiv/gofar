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
                        <div slot="header">Something.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Something.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">Something.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                        <div>Something else.</div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main'
}
</script>

<style lang="scss" scoped>
.el-carousel {
    margin: 50px 0;

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
}
</style>
