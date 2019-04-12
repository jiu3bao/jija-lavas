<template>
    <div>
        <div class='breadcrumb'>
            <p>我的首页</p>
            <p v-if='true'>
                >
                <span class='blue border-b'>分析报告</span>
            </p>
            <!--p class='time'>{{month}}-{{month}}</p-->
        </div>
        <el-container style='height:100%;padding-top:66px;box-sizing:border-box'>
            <el-tabs v-model="activeName" @tab-click="handleClick" style='width:100%'>
                <el-tab-pane label="全部报告" name="全部报告">
                    <h1>{{activeName}}</h1>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="text"
                        class='w-260'>
                    </el-input>
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail")'>
                            <div>
                                <img :src="li.type=='pt'?'static/img/cumpter.png':'static/img/guang.png'">
                            </div>
                            <p>
                            <i :class='li.type=="pt"?"purple":"red"'>{{li.type == "pt"?"平台":"我的"}}</i>
                            </p>
                            <h2>{{li.name}}</h2>
                            <p>{{li.time}}</p>
                        </li>
                    </ul>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        class='float-right'>
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="平台发布" name="平台发布">
                    <h1>{{activeName}}</h1>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="text"
                        class='w-260'>
                    </el-input>
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail")'>
                            <div>
                                <img src='static/img/cumpter.png'>
                            </div>
                            <p>
                            <i class='purple'>平台</i>
                            </p>
                            <h2>{{li.name}}</h2>
                            <p>{{li.time}}</p>
                        </li>
                    </ul>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        class='float-right'>
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="我的报告" name="我的报告">
                    <h1>{{activeName}}</h1>
                    <div>
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="text"
                            class='w-260'>
                        </el-input>
                        <el-button class='redbtn' @click='dialogFormVisible = true'>新建智能报告</el-button>
                    </div>
                    
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail")'>
                            <div>
                                <img src='static/img/guang.png'>
                            </div>
                            <p>
                            <i class='red'>我的</i>
                            </p>
                            <h2>{{li.name}}</h2>
                            <p>{{li.time}}</p>
                        </li>
                    </ul>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        class='float-right'>
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-container>
        <el-dialog title="新建智能报告" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
                <el-form-item label="报告名称" :label-width="formLabelWidth" prop='name'>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间区间" :label-width="formLabelWidth" prop='month'>
                    <el-date-picker
                        v-model="form.month"
                        type="month"
                        placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="材料类型" :label-width="formLabelWidth" prop='cate'>
                    <el-select v-model="form.cate" placeholder="请选择">
                        <el-option
                            v-for="item in cateList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="对比地区" :label-width="formLabelWidth" prop='area'>
                    <el-select
                        v-model="form.area"
                        multiple
                        collapse-tags
                        placeholder="请选择">
                        <el-option
                            v-for="item in areaList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="其他内容" :label-width="formLabelWidth">
                    <el-select v-model="form.other1" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="其他内容" :label-width="formLabelWidth">
                    <el-select v-model="form.other2" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">立即创建</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '../../api/api'
export default {
    data() {
        return {
            rules:{
                name:[{
                    required: true, message: '请输入活动名称', trigger: 'blur'
                }],
                month:[{
                    required: true, message: '请选择日期', trigger: 'change'
                }],
                cate:[{
                    required: true, message: '请选择类型', trigger: 'change'
                }],
                area:[{
                    required: true, message: '请选择地区', trigger: 'change'
                }],
            },
            text:'',
            total: 50,
            options:[],
            form:{
                name:'',
                month:'',
                cate:'',
                area:[]
            },
            cateList:[],
            areaList:[],
            report:[[{
                type:'pt',
                name:'关于钢材价格的相关分析报告',
                time: '2019-01-23'
            },{
                type:'pt',
                name:'关于钢筋价格的相关分析报告',
                time: '2019-01-24'
            },{
                type:'my',
                name:'关于钢管价格的相关分析报告',
                time: '2019-01-25'
            },{
                type:'pt',
                name:'关于材料价格的相关分析报告',
                time: '2019-01-26'
            },{
                type:'my',
                name:'关于水泥价格的相关分析报告',
                time: '2019-01-27'
            },{
                type:'pt',
                name:'关于石灰价格的相关分析报告',
                time: '2019-01-28'
            },{
                type:'my',
                name:'关于钢材1价格的相关分析报告',
                time: '2019-01-29'
            },{
                type:'my',
                name:'关于钢材2价格的相关分析报告',
                time: '2019-01-30'
            }],[{
                type:'pt',
                name:'关于钢材3价格的相关分析报告',
                time: '2019-02-03'
            },{
                type:'my',
                name:'关于钢材4价格的相关分析报告',
                time: '2019-02-03'
            },{
                type:'pt',
                name:'关于钢材价格的相关分析报告',
                time: '2019-01-23'
            },{
                type:'my',
                name:'关于钢材价格的相关分析报告',
                time: '2019-02-23'
            },{
                type:'pt',
                name:'关于钢材5价格的相关分析报告',
                time: '2019-02-23'
            },{
                type:'pt',
                name:'关于钢材6价格的相关分析报告',
                time: '2019-02-23'
            },{
                type:'my',
                name:'关于钢材7价格的相关分析报告',
                time: '2019-02-23'
            },{
                type:'my',
                name:'关于钢材8价格的相关分析报告',
                time: '2019-02-23'
            }]],
            activeName:'全部报告',
            dialogFormVisible: false,
            formLabelWidth:'90px'
        }
    },
    created() {
        this.get_area()
        this.get_data()
        this.get_cate()
    },
    mounted() {
        // this.init()
    },
    methods: {
        async get_area() {
            const res = await api.get_area()
            this.areaList = res.data
        },
        async get_cate() {
            const res = await api.get_cate({a:1})
            this.cateList = res.data.data
        },
        handleClick() {

        },
        ref() {
            this.get_data()
        },
        async get_data() {
            
        },
        creat_report() {

        }
    },
}
</script>

<style lang="stylus" scoped>
    .el-dialog__footer
        text-align left
    .w-260
        width 260px
        margin-bottom 40px
    .redbtn 
        background linear-gradient(90deg,rgba(219,79,41,1) 0%,rgba(226,41,16,1) 100%)
        color #fff
    .el-tab-pane
        h1 
            font-size 16px !important
    .report-ul 
        display flex
        width 100%
        justify-content space-between
        //flex-wrap wrap
        li 
            width 12%
            margin 10px 0
            flex-shrink 1
            background #fff
            padding 40px 12px 18px
            box-sizing border-box
            box-shadow 0px 4px 8px 0px rgba(62,128,195,0.04)
            border-radius 4px
            transition .3s
            cursor pointer
            div
                width 50%
                margin 0 auto
                img 
                   width 100% 
            i 
                display block
                width 34px
                font-style normal
                padding 2px 0
                text-align center
                border-radius 4px
                color #fff
                font-size 10px
                margin-top 20px
                margin-bottom 12px
            .purple 
                background #866FFB
            .red 
                background #D82B0E
            h2 
                width 100%
                font-size 14px
                font-weight 400
                color rgba(51,51,51,1)
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                margin-bottom 12px
            p 
                color #999
                font-size 12px
    .report-ul li:hover
        background rgba(217,217,217,1)
        box-shadow 0px 14px 16px 0px rgba(62,128,195,0.26)
        border-radius 4px
    .float-right 
        float:right
</style>