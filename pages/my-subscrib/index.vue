<template>
    <div style='height:100%;position:relative'>
        <div class='breadcrumb'>
            <p>我的首页</p>
            <p v-if='true'>
                >
                <span class='blue border-b'>我的订阅</span>
            </p>
            <!--p class='time'>{{month}}-{{month}}</p-->
        </div>
        <el-container style='height:100%;padding-top:66px;box-sizing:border-box'>
            <el-tabs v-model="activeName" @tab-click="handleClick" style='width:100%'>
                <el-tab-pane label="数据订阅" name="数据订阅">
                    <h1>{{activeName}}</h1>
                    <div>
                        <el-input
                            placeholder="请输入订阅编号"
                            prefix-icon="el-icon-search"
                            v-model="text"
                            class='w-260'>
                        </el-input>
                        <el-button class='redbtn' @click='dialogFormVisible = true'>新增数据订阅</el-button>
                    </div>
                    <div class='all' v-if='subscrib_list&&subscrib_list.length>0'>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <i class='iconfont iconicon' @click='delete_dy'></i>
                    </div>
                    <div v-if='!subscrib_list||subscrib_list.length ==0' class='nodata'>
                        <i class='iconfont iconkongbaiye'></i>
                        <p>没有找到相关数据</p>
                    </div>
                    <ul class='article-ul'>
                        <li v-for='(item, index) in subscrib_list' :key='index'>
                            <div class='title'>
                                <el-checkbox v-model="item.checked" label="item.id">订阅编号 {{item.number}}</el-checkbox>
                                <p>订阅内容</p>
                                <h1>
                                    {{item.title}}
                                </h1>
                                <p>更新日期 {{item.createTime.split('T')[0]}} </p>
                            </div>
                            <!--div>
                                <a>查看详情></a>
                                <i class='iconfont iconicon' @click='delet_item(item.id,index)'></i>
                            </div-->
                        </li>
                    </ul>
                    <el-pagination
                        @current-change="handleCurrentChange"
                        v-if='subscrib_list&&subscrib_list.length>0'
                        layout="prev, pager, next"
                        :total="total"
                        class='float-right'>
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="消息接收" name="消息接收">
                    <h1>{{activeName}}</h1>
                    <div>
                        <el-input
                            placeholder="请输入消息编号"
                            prefix-icon="el-icon-search"
                            v-model="text"
                            class='w-260'>
                        </el-input>
                    </div>
                    <div class='all' v-if='msgList&&msgList.length>0'>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <i class='iconfont iconicon' @click='delete_dy'></i>
                    </div>
                    <div v-if='!msgList||msgList.length ==0' class='nodata'>
                        <i class='iconfont iconkongbaiye'></i>
                        <p>没有找到相关数据</p>
                    </div>
                    <ul class='article-ul'>
                        <li v-for='(item, index) in msgList' :key='index'>
                            <div class='title'>
                                <el-checkbox v-model="item.checked" label="item.id">消息编号 {{item.number}}</el-checkbox>
                                <p>消息内容</p>
                                <h1>
                                    {{item.title}}
                                </h1>
                                <p>更新日期 {{item.time}} </p>
                            </div>
                            <div>
                                <i class='iconfont iconicon' @click='delet_item(item.id,index)'></i>
                            </div>
                            
                        </li>
                    </ul>
                    <el-pagination
                        v-if='msgList&&msgList.length>0'
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        @current-change="handleCurrentChange1"
                        class='float-right'>
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-container>
        <el-dialog title="新建数据订阅" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref='form'>
                <el-form-item label="订阅名称" :label-width="formLabelWidth" prop='title'>
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间区间" :label-width="formLabelWidth" prop='bookDate'>
                    <el-date-picker
                        v-model="form.bookDate"
                        type="monthrange"
                        value-format='yyyy-MM'
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        :picker-options='options'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="材料类型" :label-width="formLabelWidth" prop='materialID'>
                    <el-select v-model="form.materialID" placeholder="请选择">
                        <el-option
                            v-for="item in cateList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="对比地区" :label-width="formLabelWidth" prop='areaID'>
                    <el-select
                        v-model="form.areaID"
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
                <el-form-item label="其他内容" :label-width="formLabelWidth" prop='other1'>
                    <el-select v-model="form.other1" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否推送" :label-width="formLabelWidth" prop='isPush'>
                    <el-switch
                        v-model="form.isPush">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">立即订阅</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
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
            pageSize:10,
            pageNum:1,
            subscrib_list:[],
            msgList:[],
            activeName:'数据订阅',
            dialogFormVisible: false,
            formLabelWidth:'90px',
            form:{
                title:'',
                bookDate:'',
                materialID:'',
                areaID:[],
                isPush:false
            },
            rules:{
                title:[{
                    required: true, message: '请输入订阅名称', trigger: 'blur'
                }],
                bookDate:[{
                    required: true, message: '请选择日期', trigger: 'change'
                }],
                materialID:[{
                    required: true, message: '请选择类型', trigger: 'change'
                }],
                areaID:[{
                    required: true, message: '请选择地区', trigger: 'change'
                }],
                // other1:[{
                //     required: true, message: '请选择', trigger: 'change'
                // }],
                isPush:[{
                    required: true, message: '请选择是否推送', trigger: 'change'
                }],
            },
            checkAll:false,
            isIndeterminate:true,
            cateList:[],
            areaList:[],
            options:[]
        }
    },
    components:{
        scrollTop
    },
    created() {
        this.get_data()
        this.get_cate()
        this.get_area()
    },
    watch:{
        activeName(val) {
            this.pageNum = 1
            if(val == '数据订阅') {
                this.get_data()
            } else {
                this.get_msg()
            }
        }
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
        handleClick(data) {
            //this.chosed_cate = data
        },
        ref() {
            this.pageNum = 1
            if(this.activeName == '数据订阅') {
                this.get_data()
            } else {
                this.get_msg()
            }
            
        },
        async get_data() {
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                number: this.text,
                token: this.$store.state.login.token
                // token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiZXhwIjoxNTU1NjUzNjY5LCJuYmYiOjE1NTU1NjcyNjl9.u2L61LLEz1inFtFuuicvSLdAaG702rQTkQPSTweXLRo'
            }
            const res = await api.get_subscrib(data)
            this.total = res.data.count
            if(!res.data.list) {
                this.subscrib_list = [] 
                return 
            } else {
                res.data.list.forEach(item => {
                    item.checked = false
                })
                this.subscrib_list = res.data.list
            }
            
        },
        async get_msg() {
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                token: this.$store.state.login.token,
                number: this.text
                // token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiZXhwIjoxNTU1NjQwMzA4LCJuYmYiOjE1NTU1NTM5MDh9.bnac7MF4SqPSV0mv-FtSb0LI0KS0Ds0JiNPKd_dO0SE'
            }
            const res = await api.get_msg(data)
            this.msgList = res.data.data
            this.total = res.data.total
        },
        async get_cate() {
            const res = await api.get_cate()
            this.cateList = res.data
        },
        async get_area() {
            const res = await api.get_area()
            this.areaList = res.data
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.get_data()
        },
        handleCurrentChange1(val) {
            this.pageNum = val
            this.get_msg()
        },
        handleCheckAllChange(val) {
            if(val) {
                if(this.activeName == '数据订阅') {
                    this.subscrib_list.filter(item => {
                        item.checked = true
                    })
                } else {
                    this.msgList.filter(item => {
                        item.checked = true
                    })
                }
            } else {
                if(this.activeName == '数据订阅') {
                    this.subscrib_list.filter(item => {
                        item.checked = false
                    })
                } else {
                    this.msgList.filter(item => {
                        item.checked = false
                    })
                }
                
            }
            this.isIndeterminate = false;
        },
        delete_dy() {
            this.$confirm('是否删除所选表格信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = []
                if(this.activeName == '数据订阅') {
                    this.subscrib_list.map(item => {
                        if(!item.checked) {
                            arr.push(item)
                        } else {
                            api.delete_sub({id:item.id}).then(r => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            })
                        }
                    })
                    //setTimeout('this.get_data()',0)
                    this.subscrib_list = arr
                } else {
                    let del_arr = []
                    this.msgList.map(item => {
                        if(!item.checked) {
                            arr.push(item)
                        } else {
                            del_arr.push(item.id)
                            
                        }
                    })
                    api.delete_msg({ids:del_arr.toString(), token: this.$store.state.login.token}).then(r => {
                        this.get_msg()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        delet_item(id,index) {
            this.$confirm('是否删除所选表格信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.activeName == '数据订阅') {
                    api.delete_sub({id:id}).then(r => {
                        this.subscrib_list.splice(index,1)
                    })
                } else {
                    api.delete_msg({ids:id, token: this.$store.state.login.token}).then(r => {
                        this.msgList.splice(index,1)
                    })
                }
                
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        add() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.isPush = Number(this.form.isPush)
                    this.form.token = //'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiZXhwIjoxNTU1NjQwMzA4LCJuYmYiOjE1NTU1NTM5MDh9.bnac7MF4SqPSV0mv-FtSb0LI0KS0Ds0JiNPKd_dO0SE'
                            this.$store.state.login.token
                    this.form.areaID = this.form.areaID.toString()
                    this.form.startTimeStr = this.form.bookDate[0]
                    this.form.endTimeStr = this.form.bookDate[1]
                    delete this.form.bookDate
                    console.log(this.form)
                    api.add_sub(this.form).then(r => {
                        this.dialogFormVisible = false
                        this.$message({
                            message: '订阅成功',
                            type: 'success'
                        });
                        this.pageNum = 1
                        this.get_data()
                        this.form = {
                            title:'',
                            bookDate:'',
                            materialID:'',
                            areaID:[],
                            isPush:false
                        }
                    })
                } else {
                    return false;
                }
            });
            
        }
    },
    beforeRouteEnter(to,from, next) {
        next(vm => {
            console.log(vm.$store.state.login.token)
            if(vm.$store.state.login.token && vm.$store.state.login.token.length>0) {
                
            } else {
                vm.$router.replace('/login')
            }
        });
    }
}
</script>

<style lang="stylus" scoped>
    .w-260
        width 260px
        margin-bottom 40px
    .redbtn 
        background linear-gradient(90deg,rgba(219,79,41,1) 0%,rgba(226,41,16,1) 100%)
        color #fff
    .el-tab-pane
        h1 
            font-size 16px
    .all 
        display flex
        justify-content flex-end
        align-items center
        margin-bottom 20px
    .iconfont 
        color #999
        font-size 16px
        cursor pointer
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
                font-size 14px
                color rgba(153,153,153,1)
                flex-shrink 0
                //margin-right 40px
            h1 
                font-size 14px
                font-weight 400
                color #333
                margin-right 40px
            a 
                color #3577EC
                text-decoration none
                cursor pointer
                margin-right 30px
            .title
                width 70%
                h1 
                    width 100%
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap

        li:hover 
            background:#D9D9D9
    .float-right 
        float:right
</style>