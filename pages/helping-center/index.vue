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
                placeholder="请输入文章编号"
                prefix-icon="el-icon-search"
                v-model="text">
            </el-input>
        </div>
        <el-container style='height:100%;padding-top:114px;box-sizing:border-box;flex-direction:column'>
            <div v-if='!article_list||article_list.length ==0' class='nodata'>
                <i class='iconfont iconkongbaiye'></i>
                <p>没有找到相关数据</p>
            </div>
            <ul class='article-ul'>
                <li v-for='(item, index) in article_list' :key='index'>
                    <div>
                        <p>文章编号{{item.code}}</p>
                        <h1>{{item.title}}</h1>
                        <p>更新日期 {{item.time?item.time.split('T')[0]:''}}</p>
                    </div>
                    <a @click='$router.push("/help-detail?id="+item.id)'>查看详情></a>
                </li>
            </ul>
            <el-pagination
                v-if='article_list&&article_list.length>0'
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                class='float-right'
                :current-page='pageNum'
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-container>
        
    </div>
</template>

<script>
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
    created() {
        this.get_data()
    },
    mounted() {
        const that = this
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                that.ref()
            }
        }; 
    },
    methods: {
        handleCurrentChange(val) {
            this.pageNum = val
            this.get_data()
        },
        ref() {
            this.pageNum = 1
            this.get_data()
        },
        async get_data() {
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                code: this.text
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