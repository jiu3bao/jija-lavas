<template>
    <div class="page-index" v-loading="loading">
        <div class='breadcrumb'>
            <p @click='backYN'>云南省</p>
            <p v-show='area.name&&area.name.length>0'>
                >
                <span class='blue border-b'>{{area.name}}</span>
            </p>
            <p class='time'>{{month.replace('-','.')}}-{{month.replace('-','.')}}</p>
        </div>
        <div class="time-picker" style='padding:4px 20px'>
            <span class="text">时间区间</span>
            <el-date-picker
                v-model="month"
                type="month"
                placeholder="选择月"
                @change='get_cate_data'
                :picker-options='options'
                value-format='yyyy-MM'
                >
            </el-date-picker>
        </div>
        <div style='height:100%;position:relative;padding-top:94px;box-sizing:border-box'>
            <div class='list-head first-level'>
                <p>材料</p>
                <p>价格</p>
                <p>涨跌</p>
            </div>
            <div class='content'>
                <ul class='cate-list'>
                    <li class='first-level' v-for='(item,index) in cateList' :key='item.id'>
                        <p>{{item.name}}</p>
                        <p>{{item.price?Number(item.price).toFixed(2):'-'}}</p>
                        <p>
                            {{item.huanbi?(Number(item.huanbi)*100).toFixed(4):'-'}}% 
                            <i class='iconfont iconicon-arrow-top4' v-if='Number(item.huanbi)>0'></i>
                            <i class='iconfont iconicon-arrow-top4 trans' v-if='Number(item.huanbi)<0'></i>
                        </p>
                    </li>
                </ul>
            </div>
            <div class='map-box'>
                <Map :areaList='areaList' :map_data='map_data' ></Map>
                <img src='../../static/img/line.png'>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import $ from 'jquery'
import Map from './map'
import api from '../../api/api'
function setState(store) {}

export default {
    name: 'index',
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    data() {
        return {
            //area:this.$store.state.map.chosed_map.name,
            // area_code:'',
            month:[],
            options:{
                disabledDate(time) {
                    return (time.getTime() > Date.now() || time.getFullYear()<2018);
                },
            },
            cateList:[],
            chosedCateId:'',
            scrollIndex:0,
            scrolling:null,//跑马灯计时器
            areaList:[],
            map_data:[],
            loading:false
        }
    },
    computed:{
        area() {
            return this.$store.state.map.chosed_map
        }
    },
    watch:{
        area:{
            handler(val) {
                if(val.id) {
                    this.area_code = val.id
                } else {
                    this.area_code = ''
                }
                this.get_cate_data()
            },
            deep:true
        }
    },
    components:{
        Map
    },
    created() {
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth()+1
        let exmonth = date.getMonth()
        if(month<10) month = '0'+month
        this.month = year+'-' + month
        this.get_cate_data()
        this.get_area()
        
    },
    mounted() {
        this.start()
    },
    methods: {
        async get_cate_data() { //获取一级类及数据 
            this.loading = true
            const data = {
                startDate: this.month,
                endDate: this.month,
                pid: '0',
                type:'0',
                area: this.area_code,
            }
            const res = await api.get_cate_data(data)
            this.cateList = res.data
            this.get_area_data()
        },
        scroll() {
            const _this = this
             _this.scrollIndex++
            if(_this.scrollIndex == _this.cateList.length) {
                _this.scrollIndex =0
            }
            $(".content ul").animate({"margin-top":"-"+40*this.scrollIndex+"px"}, function() {
                _this.map_data = _this.cateList[_this.scrollIndex].area_data
            });
        },
        start() {
            clearInterval(this.scrolling);
            this.scrolling = setInterval(this.scroll, 5000);
            const _this = this
            $('.content').hover(function() {
                clearInterval(_this.scrolling);
            }, function() {
                _this.start()
            });
        },
        stop() {
            clearInterval(this.scrolling);
        },
        chose_area(val) {
            // this.area_code = val.id
            // this.area = val.city
        },
        backYN() {
            this.$store.commit('map/SET_CHOSED_MAP', {})
        },
        async get_area() {
            const res = await api.get_area()
            this.areaList = res.data
        },
        async get_area_data() {
            const data = {
                area:this.area_code && this.area_code.length>0?this.area_code:'53',
                level: '1',
                startDate: this.month,
                endDate: this.month,
                type:'0'
            }
            const res = await api.get_area_data(data)
            const list = res.data
            // let cate = []
            
            this.cateList.forEach(cate => {
                cate.area_data = []
                list.forEach(item => {
                    if(cate.cid == item.mid) {
                        cate.area_data.push(item)
                    }
                })
            })
            // list.forEach((item,index) => {
            //     if(index == 0) {
            //         let obj = {
            //             cate_id: item.mid,
            //             cate_name: item.mat_name,
            //             area_data:[item]
            //         }
            //         cate.push(obj)
            //     } else {
            //         if(item.mid == list[index-1].mid) {
            //             cate[cate.length-1].area_data.push(item)
            //         } else {
            //             let obj = {
            //                 cate_id: item.mid,
            //                 cate_name: item.mat_name,
            //                 area_data:[item]
            //             }
            //             cate.push(obj)
            //         }
            //     }
            // })
            this.map_data = this.cateList[0].area_data
            this.loading = false
        }
    },
    updated() {
        clearInterval(this.scrolling);
        this.start()
    },
    beforeRouteLeave(to,from,next) {
        clearInterval(this.scrolling);
        next()
    }
};
</script>

<style lang="stylus" scoped>
.page-index
    height 100%
    position relative
    h2
        font-size 46px
        font-weight 500
        margin-bottom 0
    
.map-box 
    height 100%
    width 100%
    padding-top 54px
    text-align center
    box-sizing border-box
    img 
        margin-top 40px
        width:20%

.cate-list 
    width 20%
    height 242px
    
    //overflow-y scroll
    left 70%
    top 120px
    // background rgba(255,255,255,1)
    color #333

.first-level 
    display flex
    align-items center
    font-size 14px
    color #333
    //background #fff
    line-height 40px
    
    box-sizing border-box
    p 
        width 40%
        box-sizing border-box
    p+p 
        width 30%
    .iconfont 
        color #D82B0E

.next-level
    padding-left 5%
    background #fff
    li
        display flex
        align-items center
        font-size 14px
        color #333
        background #fff
        line-height 48px
        border-bottom 1px solid #EEF0F2
        p 
            width 33%
            padding 0
        .iconfont 
            color #D82B0E
.content
    width 400px
    height 40px
    overflow hidden
    //border #333 solid 1px
    margin auto
    //position absolute
    //box-shadow 0px 10px 12px 0px rgba(62,128,195,0.1)
    //border-radius 4px
.list-head
    width 400px
    margin auto

.trans:before
    transform rotate(180deg) 
    -webkit-transform rotate(180deg)
    -moz-transform rotate(180deg)
    -o-transform rotate(180deg)
    -ms-transform rotate(180deg)
    display inline-block
    color #9FC88C !important 

.content ul
    width 100%
    height 100%
    margin 0
    padding 0

</style>
