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
                        <p>文章编号{{index.length==3?index+1:index.length<2 ?"0"+ (index+1):"00"+(index+1)}}</p>
                        <h1>{{item.title}}</h1>
                        <p>更新日期 {{item.time?item.time.split('T')[0]:''}}</p>
                    </div>
                    <a @click='$router.push("/help-detail?id="+item.id)'>查看详情></a>
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
            total: 0,
            article_list:[],
            pageNum:1,
            pageSize:10
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
        async get_data() {
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            const res = await api.get_help(data)
            this.article_list = res.data.list 
            this.total = res.data.count
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