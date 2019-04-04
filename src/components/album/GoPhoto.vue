<template>
    <div class="container">
        <transition-group name="photo-switch">
            <div class="back-photo" v-for="(p, i) in photos" :key="p.key" 
                :style="{backgroundImage: 'url('+p.image+')'}"
                v-show="i === activePhoto"
                :class="{'active': i === activePhoto}">
                <div class="photo-mask">
                    <div class="photo-content">
                        <h3>{{p.title}}</h3>
                        <p>{{p.description}}</p>
                        <br><br><br><br>
                    </div>
                </div>
            </div>
        </transition-group>
        <div class="close-btn-wrap">
            <line-button type="menu" @click.native="backToBlog"></line-button>
        </div>
        <div class="photo-btn-wrap">
            <line-button type="prev" @click.native="activePrev"></line-button>
            <line-button type="next" @click.native="activeNext"></line-button>
        </div>
    </div>
</template>

<script>
import LineButton from '../LineButton'
export default {
    data () {
        return {
            activePhoto: 0,
            photos: []
        }
    },
    mounted () {
        this.$bus.$emit('full-screen', true)
        this.$getData('static/data/album.json').then(data => {
            this.photos = this.photos.concat(data)
        })
    },
    destroyed () {
        this.$bus.$emit('full-screen', false)
    },
    methods: {
        activePrev () {
            if (this.activePhoto > 0) {
                this.activePhoto--
            } else {
                this.activePhoto = this.photos.length - 1
            }
        },
        activeNext () {
            if (this.activePhoto < this.photos.length - 1) {
                this.activePhoto++
            } else {
                this.activePhoto = 0
            }
        },
        backToBlog () {
            this.$router.push('/')
        }
    },
    components: {
        LineButton
    }
}
</script>
<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgb(28, 51, 77);

    .back-photo {
        width:100%;
        height: 100%;
        background: rgb(82, 128, 180) no-repeat center center;
        background-size: cover;

        &.active {
            z-index: 10;
        }
    }

    .photo-mask {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 30px;
    }
    .photo-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        color: #aaa;
        width: 100%;
        height: 100%;
        background: #03070c;
        vertical-align: bottom;
        opacity: 0.5;

        p, h3 {
            padding: 0 50px;
        }
    }

    .close-btn-wrap {
        position: absolute;
        top: 20px;
        right: 20px;
    }
    .photo-btn-wrap {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
}
.photo-switch-enter {
    opacity: 0;
    transform: translateY(-100%);
}
.photo-switch-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}
.photo-switch-leave-active {
    position: absolute;
}
.back-photo {
    transition: all 1s ease;
}
</style>


