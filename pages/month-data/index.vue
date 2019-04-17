<template>
    <div style='height:100%;position:relative'>
        <div class='breadcrumb'>
            <p>我的首页</p>
            <p>
                >
                <span class='blue border-b'>月度数据</span>
            </p>
        </div>
        <!--查询条件 start-->
        <div class="time-picker" style='padding:4px 20px;'>
            <span class="text">查询月份</span>
            <el-date-picker
                v-model="month"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                class='w-220'
                :picker-options='options'
                value-format='yyyy-MM'>
            </el-date-picker>
            <span class="text ml-40">地区</span>
            <el-select v-model="area" placeholder="请选择" class='w-260' 
                multiple collapse-tags>
                <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button type='primary' class='ml-40' @click='ref'>查询</el-button>
        </div>
        <!--查询条件 end-->
        <el-container style='height:100%;box-sizing:border-box;padding-top:114px'>
            <!--左侧分类树 start-->
            <el-aside width="320px" style='border-radius:4px;background:#fff;margin-right:20px'>
                <div class='list-title'>
                    材料列表
                </div>
                <el-tree :data="cateList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-aside>
            <!--左侧分类树 end-->
            
            <el-container class='charts-main'>
                <el-tabs v-model="activeName" style='height:100%'>
                    <!--右侧折线图 start-->
                    <el-tab-pane label="动态分析图" name="动态分析图" style='height:100%'>
                        <h1 class='title'>{{activeName}}</h1>
                        <div style='background:#fff;padding:40px;box-sizing:border-box;height:100%;box-shadow:0px 4px 8px 0px rgba(62,128,195,0.04);border-radius:4px;'>
                            <div class='charts' id='main'></div>
                        </div>
                    </el-tab-pane>
                    <!--右侧折线图 end-->
                    <!--右侧表格图 start-->
                    <el-tab-pane label="数据统计表" name="数据统计表" style='height:100%'>
                        <h1 class='title'>{{activeName}}</h1>
                        <div class="flex-be w100 bg-white" 
                            style='padding:4px 20px;box-sizing:border-box;box-shadow:0px 4px 8px 0px rgba(62,128,195,0.04);border-radius:4px;
                                    position:relative'>
                            <div class="time-picker" style='position: static'>
                                <span class="text">新增对比</span>
                                <el-select v-model="contrastCate1" placeholder="请选择一级材料大类" class='w-220'>
                                    <el-option
                                        v-for="item in cateList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="contrastCate2" placeholder="请选择二级对比材料" class='w-220 m-10'>
                                    <el-option
                                        v-for="item in cateList_two"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button type='primary' class='ml-40' @click='contrast'>确定</el-button>
                            </div>
                            <div style='text-align:right; flex-shirink:0;width:auto;color:#999;cursor:pointer' class='flex'>
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                <i class='iconfont iconicon' @click='delete_constract'></i>
                            </div>
                        </div>
                        <div v-if='constractList.length ==0' class='nodata'>
                            <i class='iconfont iconkongbaiye'></i>
                            <p>没有找到相关数据</p>
                        </div>
                        <div v-for='(data,index) in constractList' :key='index' class='table'>
                            <h1 class='title'>
                                <el-checkbox v-model="data.checked"></el-checkbox>
                                '{{data.name}}'详细数据表
                                <i class='iconfont iconicon delete' @click='delet_item(index)'></i>
                            </h1>
                            <el-radio-group v-model="data.tab" style="margin-bottom: 30px;">
                                <el-radio-button label="price">价格</el-radio-button>
                                <el-radio-button label="zs">指数</el-radio-button>
                                <el-radio-button label="tb">同比</el-radio-button>
                                <el-radio-button label="hb">环比</el-radio-button>
                            </el-radio-group>
                            <div v-for='tab in tabType' :key='tab'>
                                <el-table
                                :class='data.tab==tab?"show":"op"'
                                :data="data.data"
                                style="width: 100%">
                                <el-table-column
                                    prop="add"
                                    label="地区"
                                    width="150">
                                    <template slot-scope="scoped">
                                        {{scoped.row[0].add}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="时间" >
                                    <el-table-column
                                        v-for='(item, index) in data.data[0]'
                                        :key='index'
                                        prop="name"
                                        :label="item.time">
                                        <template >
                                            {{item[tab]}}
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                            </div>
                            
                        </div>
                        <!--右侧表格图 end-->
                    </el-tab-pane>
                </el-tabs>
                <!--div class='bottom'>已经到底啦~</div-->
            </el-container>
            
        </el-container>
        <scrollTop class='position' v-if='showTop'></scrollTop>
    </div>
</template>

<script>
import scrollTop from '../../components/scroll-top'
import echarts from 'echarts'
import api from '../../api/api'
export default {
    data() {
        return {
            activeName:'动态分析图',
            tabType:[
                'price',
                'zs',
                'tb',
                'hb'
            ],
            options:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            areaList:[],
            area:[],
            month:[],
            chosed_cate:{name:'全类型',id:''},
            cateList:[],
            cateList_two:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            tableData:[],
            tab:'price',
            contrastCate1:'',
            contrastCate2:'',
            constractList:[],//对比的列表
            checkAll:false,
            isIndeterminate:true,
            originChecked:false,
            showTop:false

        }
    },
    components:{
        scrollTop
    },
    created() {
        this.get_area()
        this.get_data()
        this.get_cate()
    },
    watch:{
        contrastCate1(val) {
            this.contrastCate2 = ''
            this.cateList.forEach(item => {
                if(item.id == val) {
                    this.cateList_two = item.children
                    return false
                }
            })
        },
        activeName(val) {
            this.get_data()
        }
    },
    mounted() {
        this.$nextTick(function () {
            //修改事件监听
            const main = document.getElementsByClassName('main')[0]
            main.addEventListener('scroll', this.handleScroll)
            
        });
    },
    methods: {
        handleScroll() {
            const main = document.getElementsByClassName('main')[0]
            const scrollTop = main.scrollTop || main.scrollTop
            if(scrollTop > 200) {
                this.showTop = true
            } else {
                this.showTop = false
            }
        },
        async get_area() {
            const res = await api.get_area({})
            // res.data.forEach(item => {
            //     if(item.pid == '14b9f21fc4c24b4b93843578b0e40c18'){
            //         this.areaList.push(item)
            //     }                
            // })
            this.areaList = res.data
        },
        async get_cate() {
            const res = await api.get_cate({})
            this.cateList = res.data.data
            this.cateList.map(item => {
                this.cateList_two.push(...item.children)
            })
        },
        handleNodeClick(data) {
            this.chosed_cate = data
            this.constractList = []
            this.get_data()
        },
        ref() {
            if(this.activeName != '数据统计表') {
                let myChart = echarts.init(document.getElementById('main'))
                myChart.dispose()
                this.get_data()
            } else {
                if(this.constractList.length > 0) {
                    this.constractList.filter(item => {
                        let data = {
                            startTime: this.month[0],
                            endTime: this.month[1],
                            area: this.area,
                            cateId: item.id
                        }
                        // api.get_cate_data(data).then(() => {
                        //     item.data = res.data
                        // })
                        const res = api.get_month_data(data) 
                        item.data = res.data.data
                        item.data.forEach(son => {
                            if(/^\+?[1-9][0-9]*$/.test(son[0].add)) {
                                this.areaList.forEach(area => {
                                    if(area.id == son[0].add) {
                                        son[0].add = area.name
                                        return
                                    }
                                })
                            }
                        })
                    })
                }
            }
            
        },
        async get_data() {
            const data = {
                startTime: this.month[0],
                endTime: this.month[1],
                area: this.area,
                cateId: this.chosed_cate.id
            }
            const res = await api.get_month_data(data) 
            this.tableData = res.data.data
            
            
            //只有在tab=='动态图表时渲染图'
            if(this.tableData.length >0){
                let lengend = []
                let x =[], y=[]
                console.log(this.tableData)
                this.tableData.map(item => {
                    let areaname ='全省'
                    this.areaList.forEach(area => {
                        if(area.id == item[0].add) {
                            lengend.push(area.name)
                            areaname = area.name
                            item[0].add = areaname
                            return
                        }
                    })
                    
                    let yy = []
                    item.map(data => {
                        if(x.length != item.length) {
                            x.push(data.x)
                        }
                        yy.push(data.price)
                    })
                    y.push({data:yy,type:'line',name:areaname})
                })
                
                if(this.activeName == '数据统计表') {
                    const obj = {data:this.tableData, name: this.chosed_cate.name, tab:'price',checked:false,id:this.chosed_cate.id}
                    this.constractList = []
                    this.constractList.push(obj)
                    return 
                }
                this.init(x,y,lengend)
            }
        },

        init(x,y,lengend=[]) {
            let myChart = echarts.init(document.getElementById('main'))
            const option = {
            title : {
                text: '全省各地区“'+this.chosed_cate.name+'”趋势',
                subtext: '基期指数值1000',
                textStyle:{
                    color: '#3577EC'
                }
            },
            legend:{
                data: lengend,
                type: 'scroll',
                bottom: '10px'
            },
            grid:{
                top:'100px',
                left:'40px',
                right:'20px'
            },
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    // mark : {show: true},
                    // dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    // restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                }
            ],
            series : y
            }

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        async contrast() {
            // if(has) {
            //     this.$message({
            //         message: '该类别已存在',
            //         type: 'warning'
            //     });
            //     return
            // }
            let data = {
                month: this.month,
                area: this.area,
            }
            let name
            if(this.contrastCate2&&this.contrastCate2.length>0) {
                data.cate_id = this.contrastCate2
                data.pid = this.contrastCate1
                this.cateList_two.forEach(item => {
                    if(item.id == this.contrastCate2) {
                        name = item.name
                        return false
                    }
                })
            } else if (this.contrastCate1&&this.contrastCate1.length>0) {
                data.cate_id = this.contrastCate1
                this.cateList.forEach(item => {
                    if(item.id == this.contrastCate1) {
                        name = item.name
                        return false
                    }
                })
            } else {
                this.$message({
                    message: '请选择一个类别进行对比',
                    type: 'warning'
                });
                return false
            }
            const res = await api.get_month_data(data).data.data
            res.forEach(son => {
                if(/^\+?[1-9][0-9]*$/.test(son[0].add)) {
                    this.areaList.forEach(area => {
                        if(area.id == son[0].add) {
                            son[0].add = area.name
                            return
                        }   
                    })
                }
            })
            const obj = {data:res, name: name, tab:'price',checked:false,id:data.cate_id}
            this.$message({
                message: '已成功添加对比',
                type: 'success'
            });
            this.constractList.push(obj)
        },
        handleCheckAllChange(val) {
            if(val) {
                this.constractList.filter(item => {
                    item.checked = true
                })
            } else {
                this.constractList.filter(item => {
                    item.checked = false
                })
            }
            this.isIndeterminate = false;
        },
        delete_constract() {
            this.$confirm('是否删除所选表格信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = []
                this.constractList.map(item => {
                    if(!item.checked) {
                        arr.push(item)
                    }
                })
                this.constractList = arr
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
        delet_item(index) {
            this.$confirm('是否删除所选表格信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.constractList.splice(index,1)
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
        }
    },
    beforeRouteLeave(to, from, next) {
        const main = document.getElementsByClassName('main')[0]
        console.log(this)
        main.removeEventListener('scroll',this.handleScroll)
        next()
    }
}
</script>

<style lang="stylus" scoped>
    h1
        font-size 18px
        text-align left
        color #000
        font-weight 400  

    .list-title 
        background #888D9C
        color #fff
        font-size 16px
        line-height 50px
        padding 0 20px
    
    .cate-list 
        padding 14px
        padding-right 0
        text-align left
        color #666
        font-size 14px 
        line-height 28px
        li
            cursor pointer
            div 
                padding 0 14px
        .chosed>div
            background rgba(245,247,250,1)

        .iconfont
            font-size 8px
            transition .3s
            cursor pointer
            width 8px
        .transition:before
            transform rotate(180deg)
            
        ul 
            padding-left 20px
    .charts
        width 100%
        height 435px 
        margin-top 30px
    .charts-main 
        flex-direction column
        div 
            width 100%
    .table
        margin-top 20px
        padding 44px 42px
        // padding-left 42px
        // padding-bottom 60px
        background #fff
        box-sizing border-box
        box-shadow 0px 4px 8px 0px rgba(62,128,195,0.04)
        border-radius 4px
        h1 
            font-size 20px
            font-weight 400
            color rgba(53,119,236,1)
            margin-bottom 40px
    .position 
        position fixed
        bottom 55px
        right 220px
    .bottom 
        padding 20px 0 42px 0
        text-align center
        font-size 16px
        font-weight 400
        color rgba(153,153,153,1)
    .delete 
        color #999
        font-size 16px
        float right
        cursor pointer
    .nodata 
        width 100%
        height 100%
        display flex
        flex-direction column
        justify-content center
        align-items center
        font-size 18px
        color #969EA5
        margin-top 100px
        .iconfont 
            font-size 84px
    .op 
        height 0  
        translate .3s  
        border none
    .show
        height auto
        translate .3s   
</style>