<template>
    <div id="app">
        <el-container>
            <el-header class='header'>
                <div class='left'>
                    <img src='static/img/loginlogo@2x.png'>
                    <p>云南省建设工程材料及设备价格监测系统</p>
                </div>
                <div class='right'>
                    <p @click='loginOrOut'>{{userName&&userName.length>0?userName:"登录"}}</p>
                    <i></i>
                    <p class='gray' @click='$router.push("/helping-center")'>帮助中心</p>
                </div>
            </el-header>
            <el-container style='height:100%'>
                <el-aside width="100px">
                    <el-menu
                        default-active="/"
                        class="el-menu-vertical-demo"
                        background-color="#2E3447"
                        text-color="#fff"
                        router>
                        <el-menu-item  :index="item.router" v-for='(item, index) in navList' :key='index'>
                            <i :class="'iconfont navicon' + ' ' + item.icon"></i>
                            <template slot="title">
                                <span>{{item.name}}</span>
                            </template>
                        </el-menu-item >
                    </el-menu>
                </el-aside>
                <el-main class='main'>
                    <router-view ></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'app',
    computed: {
        ...mapState("login", {
            userName : state => state.user_name
        }),
    },
    data() {
        return {
            navList: [
                {
                    name: '我的首页',
                    icon: 'iconshouye',
                    router: '/'
                }, {
                    name: '月度数据',
                    icon: 'icontijianyuedufenxi',
                    router: '/month-data'
                }, {
                    name: '季度数据',
                    icon: 'iconjidu',
                    router: '/season-data'
                }, {
                    name: '年度数据',
                    icon: 'iconniandukaohe',
                    router: '/year-data'
                }, {
                    name: '分析报告',
                    icon: 'iconweibiaoti1',
                    router: '/analysis-report'
                }, {
                    name: '我的订阅',
                    icon: 'icondingyue',
                    router: '/my-subscrib'
                }
            ],
            mainHeight: 0
        };
    },
    methods: {
        loginOrOut() {
            if(this.userName&&this.userName.length>0) {
                this.$confirm('用户 '+this.userName+' 是否退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$store.commit('login/setToken', '')
                        this.$store.commit('login/setUSER_NAME', '')
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                });
            } else {
                this.$router.push('login')
            }
        },
    },
    mounted() {
    },
};
</script>

<style lang="stylus">

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    // text-align center
    color #2c3e50
    height 100%
    background #edf2f7
.header 
    display flex
    justify-content space-between
    align-items center
    padding 17px 40px
    background #fff
    line-height 34px
    .left 
        display flex
        align-items center
        img 
            height 34px
            margin-right 6px
        p 
            font-size 18px
            font-weight bold
            color rgba(46,52,71,1)
    .right 
        display flex
        align-items center
        p 
            font-size 16px
            font-weight 400
            color rgba(53,119,236,1)
            cursor pointer
        i 
            display block
            width 1px
            height 14px
            background rgba(102,102,102,1)
            margin 0 16px
        .gray 
            color rgba(51,51,51,1)


</style>
