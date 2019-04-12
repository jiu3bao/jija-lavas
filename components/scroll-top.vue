<template>
    <div class='scroll-box' @click='scroll2top'>
        <i class='iconfont iconfanhuidingbu'></i>
    </div>
</template>

<script>
export default {
    methods: {
        scroll2top() {
            const main = document.getElementsByClassName('main')[0]
            main.scrollTop = 0
        }
    },
}
</script>

<style lang="stylus" scoped>
    .scroll-box 
        width 40px
        height 40px
        background rgba(67,134,252,1)
        border-radius 4px
        padding 8px 0
        text-align center
        box-sizing border-box
        cursor pointer
        .iconfont
            font-size 26px
            color #fff
</style>