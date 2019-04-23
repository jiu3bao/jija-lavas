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
                            <div v-if='tableData.length ==0' class='nodata pos'>
                                <i class='iconfont iconkongbaiye'></i>
                                <p>没有找到相关数据</p>
                            </div>
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
                                <el-radio-button label="exponent">指数</el-radio-button>
                                <el-radio-button label="tongbi">同比</el-radio-button>
                                <el-radio-button label="huanbi">环比</el-radio-button>
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
                                            :label="item.asmdate?item.asmdate.substr(0,7):''">
                                            <template slot-scope="scoped" v-if='scoped.row[index][tab]'>
                                                <span v-if="tab == 'price'">
                                                    {{scoped.row[index][tab] != '-'?Number(scoped.row[index][tab]).toFixed(2):"-"}}
                                                </span>
                                                <span v-else>
                                                    {{scoped.row[index][tab].length>0?Number(scoped.row[index][tab]).toFixed(4):'-'}}
                                                </span>
                                            </template>
                                            <template v-else>
                                                -
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
                'exponent',
                'tongbi',
                'huanbi'
            ],
            options:{
                disabledDate(time) {
                    return (time.getTime() > Date.now() || time.getFullYear()<2018);
                },
            },
            areaList:[],
            area:[],
            month:[],
            chosed_cate:{},
            cateList:[],
            cateList_two:[],
            defaultProps: {
                children: 'childrenList',
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
            showTop:false,

        }
    },
    components:{
        scrollTop
    },
    created() {
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth()+1
        let exmonth = date.getMonth()-2
        if(month<10) month = '0'+month
        if(exmonth<10) exmonth = '0'+exmonth
        this.month = [year+'-' + exmonth, year+'-' + month]
        this.get_area()
        this.get_cate()
    },
    watch:{
        contrastCate1(val) {
            this.contrastCate2 = ''
            this.cateList.forEach(item => {
                if(item.id == val) {
                    this.cateList_two = item.childrenList
                    return false
                }
            })
        },
        activeName(val) {
            this.tableData = []
            this.get_data()
        },
        constractList: {
            handler(val) {
                console.log(val,789798)
            }, deep:true
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
            this.areaList = res.data
        },
        async get_cate() {
            const res = await api.get_cate()
            this.cateList = res.data
            this.cateList.map(item => {
                this.cateList_two.push(...item.childrenList)
            })
            this.handleNodeClick(this.cateList[0])
        },
        handleNodeClick(data) {
            this.chosed_cate = data
            this.constractList = []
            this.tableData = []
            let myChart = echarts.init(document.getElementById('main'))
            myChart.dispose()
            this.get_data()
        },
        ref() {
            if(this.activeName != '数据统计表') {
                let myChart = echarts.init(document.getElementById('main'))
                myChart.dispose()
                this.constractList = []
                this.get_data()
            } else {
                if(this.constractList.length > 0) {
                    this.constractList.filter(item => {
                        let data = {
                            startDate: this.month[0],
                            endDate: this.month[1],
                            area: this.area.toString(),
                            id: item.id,
                            orderType:'1',
                            type:'0',
                            level: this.chosed_cate.level?this.chosed_cate.level:'2'
                        }
                        api.get_cate_data(data).then(r => {
                            if(!r.data || r.data.length ==0) {
                                item.data = []
                            } else {
                               let area_list=[]
                                const ll = r.data
                                if(ll.length>0) {
                                    ll.map(item => {
                                        let has = false
                                        if(area_list.length ==0) {
                                            area_list.push([])
                                        }
                                        area_list.map(arr => {
                                            if(arr.length ==0) {
                                                arr.push(item)
                                                has = true
                                            } else {
                                                if(arr[0].area == item.area) {
                                                    arr.push(item)
                                                    has = true
                                                } else {
                                                    has = false
                                                }
                                            }
                                        })
                                        if(!has) {
                                            area_list.push([item])
                                        }
                                    })
                                }
                                item.data = area_list
                                item.data.filter(son => {
                                    if(son[0].area.length > '2') {
                                        this.areaList.forEach(area => {
                                            if(area.id == son[0].area) {
                                                son[0].add = area.name
                                                return
                                            }
                                        })
                                    } else {
                                        son[0].add = '全省'
                                    }
                                    let x = this.getMonthBetween(this.month[0], this.month[1])
                                    for(let i =0, len = x.length;i<len;i++) {
                                        if(!son[i] || x[i] != son[i].asmdate.split(' ')[0].substr(0,7)) {
                                            son.splice(i,0,{
                                                price:'-',
                                                add:son[0].add
                                            })
                                        }
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
                startDate: this.month[0],
                endDate: this.month[1],
                area: this.area.toString(),
                id: this.chosed_cate.id,
                orderType:'1',
                type:'0',
                level: this.chosed_cate.level?this.chosed_cate.level:'2'
            }
            const res = await api.get_cate_data(data) 
            if(!res.data || res.data.length ==0) {
                this.tableData = []
            } else {
                const ll = res.data
                let area_list=[]
                if(ll.length>0) {
                    ll.map(item => {
                        let has = false
                        if(area_list.length ==0) {
                            area_list.push([])
                        }
                        area_list.map(arr => {
                            if(arr.length ==0) {
                                arr.push(item)
                                has = true
                            } else {
                                if(arr[0].area == item.area) {
                                    arr.push(item)
                                    has = true
                                } else {
                                    has = false
                                }
                            }
                        })
                        if(!has) {
                            area_list.push([item])
                        }
                        this.tableData = area_list
                    })
                }
            }
            
            // console.log(this.tableData,'2121321321')
            //只有在tab=='动态图表时渲染图'
            if(this.tableData.length >0){
                let lengend = []
                let x =[], y=[]
                this.tableData.filter(item => {
                    let areaname ='全省'
                    this.areaList.forEach(area => {
                        if(area.id == item[0].area) {
                            lengend.push(area.name)
                            areaname = area.name
                            item[0].add = areaname
                            return
                        } else {
                            item[0].add = areaname
                        }
                    })
                    let yy = []
                    x = this.getMonthBetween(this.month[0], this.month[1])
                    for(let i =0, len = x.length;i<len;i++) {
                        if(!item[i] || x[i] != item[i].asmdate.split(' ')[0].substr(0,7)) {
                            item.splice(i,0,{
                                price:'-',
                                add:item[0].add
                            })
                        }
                    }
                    item.forEach(data => {
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
            } else {
                this.constractList = []
            }
        },
        getMonthBetween(start,end){  
            let result = [];  
            let s = start.split("-");  
            let e = end.split("-");  
            let min = new Date();  
            let max = new Date();  
            min.setFullYear(s[0],s[1]-1);  
            max.setFullYear(e[0],e[1]-1);   
            let curr = min; 
            while(curr <= max){  
                let month = curr.getMonth();  
                let fm 
                if(month<9&&month>=0) 
                    { fm = '0'+(month+1)}

                if(month < 0 || month >=9) { fm = month+1}
                let str=curr.getFullYear()+"-"+(fm);
                let s=curr.getFullYear()+"-0";
                if(str==s){
                    str=curr.getFullYear()+"-12";
                }
                result.push(str);  
                curr.setMonth(month+1);
            }  
            return result;  
        }, 
        init(x,y,lengend=[]) {
            console.log(x,y,lengend)
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
                right:'40px'
            },
            tooltip : {
                trigger: 'axis',
                position:[10,10]
            },
            toolbox: {
                show : true,
                feature : {
                    magicType : {show: true, type: ['line', 'bar']},
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
                    min:function(val){
                        return Math.floor(val.min)
                    }
                }
            ],
            series : y
            }

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        async contrast() {
            let data = {
                startDate: this.month[0],
                endDate: this.month[1],
                area: this.area.toString(),
                orderType:'1',
                type:'0',
            }
            let name
            if(this.contrastCate2&&this.contrastCate2.length>0) {
                data.id = this.contrastCate2
                data.level = 2
                this.cateList_two.forEach(item => {
                    if(item.id == this.contrastCate2) {
                        name = item.name
                        return false
                    }
                })
            } else if (this.contrastCate1&&this.contrastCate1.length>0) {
                data.id = this.contrastCate1
                data.level = 1
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
            const res = await api.get_cate_data(data)
            if(!res.data || res.data.length ==0) return
            let ll = res.data
            let area_list=[]
            if(ll.length>0) {
                ll.map(item => {
                    let has = false
                    if(area_list.length ==0) {
                        area_list.push([])
                    }
                    area_list.map(arr => {
                        if(arr.length ==0) {
                            arr.push(item)
                            has = true
                        } else {
                            if(arr[0].area == item.area) {
                                arr.push(item)
                                has = true
                            } else {
                                has = false
                            }
                        }
                    })
                    if(!has) {
                        area_list.push([item])
                    }
                    //this.tableData = area_list
                })
            }
            area_list.filter(son => {
                this.areaList.forEach(area => {
                    if(son[0].area.length > '2') {
                        if(area.id == son[0].area) {
                            son[0].add = area.name
                            return
                        }
                    } else {
                        son[0].add = '全省'
                    } 
                })
                let x = this.getMonthBetween(this.month[0], this.month[1])
                for(let i =0, len = x.length;i<len;i++) {
                    if(!son[i] || x[i] != son[i].asmdate.split(' ')[0].substr(0,7)) {
                        son.splice(i,0,{
                            price:'-',
                            add:son[0].add
                        })
                    }
                }
            })
            const obj = {data:area_list, name: name, tab:'price',checked:false,id:data.id}
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
    .pos 
        position absolute
        top 0
</style>