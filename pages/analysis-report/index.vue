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
        <el-container style='height:100%;padding-top:66px;box-sizing:border-box;flex-direction:column'>
            <el-tabs v-model="activeName" style='width:100%'>
                <el-tab-pane label="全部报告" name="全部报告">
                    <h1>{{activeName}}</h1>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="text"
                        class='w-260'>
                    </el-input>
                    <div v-if='report[0].length ==0' class='nodata'>
                        <i class='iconfont iconkongbaiye'></i>
                        <p>没有找到相关数据</p>
                    </div>
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail?id="+ li.id)'>
                            <div class='li'>
                                <div>
                                    <img :src="li && li.type=='1'?'../../static/img/cumpter.png':'../../static/img/guang.png'">
                                </div>
                                <p>
                                <i :class='li && li.type=="1"?"purple":"red"'>{{li &&li.type == "1"?"平台":"我的"}}</i>
                                </p>
                                <h2>{{li.title}}</h2>
                                <p>{{li.createTime.split('T')[0]}}</p>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="平台发布" name="平台发布">
                    <h1>{{activeName}}</h1>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="text"
                        class='w-260'>
                    </el-input>
                    <div v-if='report[0].length ==0' class='nodata'>
                        <i class='iconfont iconkongbaiye'></i>
                        <p>没有找到相关数据</p>
                    </div>
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail?id="+ li.id)'>
                            <div class='li'>
                                <div>
                                    <img src='../../static/img/cumpter.png'>
                                </div>
                                <p>
                                <i class='purple'>平台</i>
                                </p>
                                <h2>{{li.title}}</h2>
                                <p>{{li.createTime.split('T')[0]}}</p>
                            </div>
                        </li>
                    </ul>
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
                    <div v-if='report[0].length ==0' class='nodata'>
                        <i class='iconfont iconkongbaiye'></i>
                        <p>没有找到相关数据</p>
                    </div>
                    <ul class='report-ul' v-for='(item, index) in report' :key='index'>
                        <li v-for='(li, i) in item' :key='i' @click='$router.push("/report-detail?id="+ li.id)'>
                            <div class='li'>
                                <div>
                                    <img src='../../static/img/guang.png'>
                                </div>
                                <p>
                                <i class='red'>我的</i>
                                </p>
                                <h2>{{li.title}}</h2>
                                <p>{{li.createTime.split('T')[0]}}</p>

                            </div>
                            
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
            <div style='width:100%'>
                <el-pagination
                    v-if='report[0].length>0'
                    layout="prev, pager, next"
                    :total="total"
                    :current-page='pageNum'
                    @current-change="handleCurrentChange"
                    :page-size='pageSize'
                    class='float-right'>
                </el-pagination>
            </div>
            
        </el-container>
        <el-dialog title="新建智能报告" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref='form'>
                <el-form-item label="报告名称" :label-width="formLabelWidth" prop='name'>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间区间" :label-width="formLabelWidth" prop='timeInterval'>
                    <el-date-picker
                        v-model="form.timeInterval"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="材料类型" :label-width="formLabelWidth" prop='materialClassID'>
                    <el-select v-model="form.materialClassID" placeholder="请选择">
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
                <el-button type="primary" @click="add_report">立即创建</el-button>
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
                timeInterval:[{
                    required: true, message: '请选择日期', trigger: 'change'
                }],
                materialClassID:[{
                    required: true, message: '请选择类型', trigger: 'change'
                }],
                area:[{
                    required: true, message: '请选择地区', trigger: 'change'
                }],
            },
            text:'',
            total: 0,
            pageNum:1,
            pageSize:16,
            options:[],
            form:{
                name:'',
                timeInterval:'',
                materialClassID:'',
                area:[]
            },
            cateList:[],
            areaList:[],
            report:[[],[]],
            activeName:'全部报告',
            dialogFormVisible: false,
            formLabelWidth:'90px',
            type:''
        }
    },
    created() {
        this.get_area()
        this.get_cate()
        this.get_reports()
    },
    watch:{
        activeName(val) {
            if(val =='全部报告') {
                this.type = '3'
            } else if(val =='平台发布'){
                this.type = '1'
            } else if(val == '我的报告') {
                this.type = '2'
            }
            this.pageNum = 1
            this.get_reports()
        }
    },
    mounted() {
        const that = this
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                that.ref()
                if(that.text.length>0) {
                    
                }
            }
        }; 
    },
    methods: {
        async get_reports() {
            this.report = [[],[]]
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                type: this.type == 3?'': this.type,
                token: this.$store.state.login.token,
                title: this.text,
                // token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiZXhwIjoxNTU1NjQwMzA4LCJuYmYiOjE1NTU1NTM5MDh9.bnac7MF4SqPSV0mv-FtSb0LI0KS0Ds0JiNPKd_dO0SE'
            }
            const res = await api.get_reports(data)
            this.total =res.data.count
            if(!res.data.list) return
            let list = res.data.list
            for(let i=0,len=list.length;i<len;i++) {
                if(i<8) {
                    this.report[0].push(list[i])
                } else {
                    this.report[1].push(list[i])
                }
            }
        },
        async get_area() {
            const res = await api.get_area()
            this.areaList = res.data
        },
        async get_cate() {
            const res = await api.get_cate({a:1})
            this.cateList = res.data.data
        },
        async ref() {
            this.report = [[],[]]
            this.pageNum = 1
            this.get_reports()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.get_reports()
        },
        add_report() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.contrastRegionID = this.form.area.toString()
                    this.form.token = this.$store.state.login.token
                    delete this.form.cate
                    delete this.form.area
                    api.add_report(this.form).then(r => {
                        this.dialogFormVisible = false
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.pageNum =1
                        this.get_reports()
                    })
                } else {
                    return false;
                }
            });
        }
    },
    beforeRouteEnter(to,from, next) {
        next(vm => {
            if(vm.$store.state.login.token && vm.$store.state.login.token.length>0) {
                
            } else {
                vm.$router.replace('/login')
            }
        });
    }
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
        //justify-content space-between
        //flex-wrap wrap
        li 
            width 12.5%
            padding-right 10px
            box-sizing border-box
        .li 
            width 100%
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
    .report-ul .li:hover
        background rgba(217,217,217,1)
        box-shadow 0px 14px 16px 0px rgba(62,128,195,0.26)
        border-radius 4px
    .float-right 
        float:right
</style>