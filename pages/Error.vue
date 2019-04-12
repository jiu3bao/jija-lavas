<template>
    <div class="page-error">
        <div class='center'>
            <img src='static/img/duanwang.png'>
            <p class='msg'>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error',
    computed: {
        message() {
            return this.$route.params.error || '您的网络好像不太给力，请稍后再试';
        }
    },
    created() {
        let query = this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.$router.replace({
                name: 'error',
                params: query
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.page-error
    display flex
    justify-content center
    align-items center
    flex-direction column
    position absolute
    top 5%
    left 50%
    margin-left -114px
    height 100%
    box-sizing border-box
    img 
        width 227px
.msg 
    font-size 18px
    font-weight 400
    color rgba(147,151,155,1)

</style>
