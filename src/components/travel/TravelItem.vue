<template>
    <div class="travel-item">
        <div class="pic">
            <div class="mask">
                <span>{{data.title}}</span>
                <div>{{data.abstract}}</div>
            </div>
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
    margin-bottom: 30px;
    hr {
        border: none;
        border-top: 1px solid #E0E0E0;
    }
    .pic {
        height: 220px;
        text-align: left;
        margin-bottom: 20px;
        position: relative;
        background: url(../../assets/carousel3.jpg) no-repeat bottom;
        background-size: 100% auto;

        &:hover {
            .mask {
                background: -webkit-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3));
            }
        }

        .mask {
            height: 50px;
            padding: 20px 20px 150px 20px;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));

            span {
                font-size: 20px;
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-weight: bold;
            }
        }
    }
}
</style>
