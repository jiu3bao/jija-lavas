<template>
    <div style='height:100%;position:relative'>
        <div class='breadcrumb'>
            <p>我的首页</p>
            <p v-if='true'>
                >
                <span class='blue border-b'>帮助中心</span>
            </p>
            <!--p class='time'>{{month}}-{{month}}</p-->
        </div>
        <div class="time-picker">
            <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="text">
            </el-input>
        </div>
        <el-container style='height:100%;padding-top:114px;box-sizing:border-box;flex-direction:column'>
            <ul class='article-ul'>
                <li v-for='(item, index) in article_list' :key='index'>
                    <div>
                        <p>文章编号001</p>
                        <h1>关于如何使用本平台来进行相关的操作</h1>
                        <p>更新日期 2018.06.23 </p>
                    </div>
                    <a @click='$router.push("/help-detail")'>查看详情></a>
                </li>
            </ul>
            <el-pagination
                layout="prev, pager, next"
                :total="total"
                class='float-right'>
            </el-pagination>
        </el-container>
        
    </div>
</template>

<script>
import scrollTop from '../../components/scroll-top'
import echarts from 'echarts'
import api from '../../api/api'
export default {
    data() {
        return {
            text:'',
            total: 50,
            article_list:[{},{},{}]
        }
    },
    components:{
        scrollTop
    },
    created() {
        this.get_data()
    },
    mounted() {
        // this.init()
    },
    methods: {
        handleNodeClick(data) {
            this.chosed_cate = data
        },
        ref() {
            this.get_data()
        },
        get_data() {
            
        }
    },
}
</script>

<style lang="stylus" scoped>
    .time-picker 
        width 260px
        padding 0
    .article-ul 
        width 100%
        li 
            display flex
            align-items center
            justify-content space-between
            padding 17px 45px
            font-size 14px
            font-weight 400
            background #fff
            margin-bottom 20px
            transition .3s
            div
                display flex
                align-items center 
            p 
                color rgba(153,153,153,1)
                margin-right 40px
            h1 
                font-size 14px
                font-weight 400
                color #333
                margin-right 80px
            a 
                color #3577EC
                text-decoration none
                cursor pointer
        li:hover 
            background:#D9D9D9
    .float-right 
        float:right
</style>