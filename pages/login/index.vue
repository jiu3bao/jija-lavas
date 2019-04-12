<template>
    <div class='login'>
        <div class='input-box'>
            <div class='left'> 
                <img src='static/img/login.png'>
                <h1>
                    云南省建设工程材料及设备价格
                </h1>
                <p>监测系统</p>
            </div>
            
            <div class='right'>
                <h1>用户登录</h1>
                <div class='input'>
                    <p>账号</p>
                    <input placeholder='请输入账号' v-model='name' :class='error1&&error1.length>0?"red":name&&name.length>0?"blue":""'>
                    <p class='error'>{{error1}}</p>
                </div>
                <div class='input'>
                    <p>密码</p>
                    <input placeholder='请输入密码' v-model='password' type='password'
                        :class='error2&&error2.length>0?"red":password&&password.length>0?"blue":""'>
                    <p class='error'>{{error2}}</p>
                </div>
                <el-button @click='login' 
                    :class='!name || name.length ==0 || !password || password.length==0?"loginbtn disabled":"loginbtn abled"'>登录</el-button>
                <div class='tool'>
                    <p @click='$router.replace("/")'>&lt;返回首页</p>
                    <p @click='$router.push("/helping-center")'>帮助中心</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/api'
//import {mapMutations} from 'vuex';
export default {
    data() {
        return {
            error1:'',
            error2:'',
            name:'',
            password:''
        }
    },
    watch:{
        name(val) {
            this.error1 = ''
        },
        password(val) {
            this.error2 =''
        }
    },
    methods:{
        // ...mapMutations('../../store/login',[
        //     // SET_TOKEN,
        //     // SET_USER_NAME
        // ]),
        async login() {
            this.check()
            const data = {
                name: this.name,
                password: this.password
            }
            const res = await api.login(data)
            console.log(res)
            if(res.code !== 200) {
                res.msg == '该账号无效'?this.error1 = res.msg:res.msg='密码错误'?this.error2=res.msg:''
                //res.data.data.errmsg == '该账号无效'? this.error1 = res.data.data.errmsg:res.data.data.errmsg == '密码错误'? this.error2=res.data.data.errmsg:''
            } else {
                console.log(res.data.data)
                this.$store.commit('login/setToken', res.data.token)
                this.$store.commit('login/setUSER_NAME', res.data.name)
                // this.SET_TOKEN(res.data.token)
                // this.SET_USER_NAME(res.data.name)
                this.$router.replace('/')
            }
        },
        check() {
            if(!this.name || this.name.length==0) {
                this.error1 = '请输入账号'
                return 
            } else if(!this.password || this.password.length==0) {
                this.error1 = '请输入密码'
                return 
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .login 
        width 100%
        height 100%
        position fixed
        top 0
        left 0
        background url('../../static/img/beijing.png') no-repeat
        background-size 100% 100% 
        .input-box
            display flex
            width 844px
            height 500px
            background rgba(255,255,255,1)
            box-shadow 0px 15px 40px 0px rgba(0, 0, 0, 0.3)
            border-radius 12px
            position absolute
            top 50%
            left 50%
            margin-top -250px
            margin-left -422px
            .left 
                width 340px
                height 100%
                flex-shrink 0
                background url('../../static/img/jianzhu.png') no-repeat
                background-size 100% 100%
                text-align center
                padding-top 135px
                box-sizing border-box
                img
                    width 160px
                    margin-bottom 28px
                h1
                p
                    font-size 18px
                    font-weight bold
                    color rgba(255,255,255,1)
            .right 
                width 100%
                height 100%
                padding 90px 103px 0
                box-sizing border-box
                h1 
                    text-align center
                    font-size 30px
                    margin-bottom 50px
                .input 
                    font-size 14px
                    color rgba(153,153,153,1)
                    width 100%
                    margin-bottom 14px
                    input 
                        width 100%
                        border none
                        border-bottom 1px solid #333
                        outline none
                        line-height 32px
                    .blue
                        border-color #3577EC
                    .red 
                        border-color #D82B0E
                    .error 
                        color #D82B0E
                        font-size 12px
                        height 16px
                        line-height 16px
            .loginbtn 
                width 100%
                margin-bottom 20px
                color #fff
                font-weight bold
                font-size 16px
                
                border-radius 4px
            
            .abled
                background linear-gradient(90deg,rgba(41,105,219,1) 0%,rgba(28,92,208,1) 100%)
                box-shadow 0px 10px 14px 0px rgba(36,133,250,0.14)
            .abled:hover 
                background linear-gradient(90deg,rgba(74,135,243,1) 0%,rgba(37,104,226,1) 100%)
                box-shadow 0px 10px 14px 0px rgba(36,133,250,0.14)
            .disabled 
                background #666    

            .tool 
                display flex
                justify-content space-between
                font-size 14px
                p 
                    color #3577EC
                    cursor pointer
                p+p 
                    color #333
</style>