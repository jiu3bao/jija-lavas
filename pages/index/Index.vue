<template>
    <div class="page-index">
        <div class='breadcrumb'>
            <p @click='backYN'>云南省</p>
            <p v-show='area.name&&area.name.length>0'>
                >
                <span class='blue border-b'>{{area.name}}</span>
            </p>
            <p class='time'>{{month[0].replace('-','.')}}-{{month[1].replace('-','.')}}</p>
        </div>
        <div class="time-picker" style='padding:4px 20px'>
            <span class="text">时间区间</span>
            <el-date-picker
            v-model="month"
            type="monthrange"
            value-format='yyyy-MM'
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :picker-options='options'
            @change='get_cate_data'>
            </el-date-picker>
        </div>
        <div style='height:100%;position:relative;padding-top:94px;box-sizing:border-box'>
            <div class='content'>
                <ul class='cate-list'>
                    <li class='first-level' v-for='(item,index) in cateList' :key='item.id'>
                        <p>{{item.name}}</p>
                        <p>{{item.date&&item.date.length>0?item.date[0].price.toFixed(2):''}}</p>
                        <p>
                            {{item.date&&item.date.length>0?item.date[0].mindex.toFixed(2):''}} 
                            <i class='iconfont iconicon-arrow-top4' v-if='item.date&&item.date[0].mindex>0'></i>
                            <i class='iconfont iconicon-arrow-top4 trans' v-if='item.date&&item.date[0].mindex<0'></i>
                        </p>
                    </li>
                </ul>
            </div>
            <div class='map-box'>
                <Map :areaList='areaList'></Map>
                <img src='static/img/line.png'>
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
                    return time.getTime() > Date.now();
                },
            },
            cateList:[],
            chosedCateId:'',
            scrollIndex:0,
            scrolling:null,//跑马灯计时器
            areaList:[],
        }
    },
    computed:{
        area() {
            return this.$store.state.map.chosed_map
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
        if(exmonth<10) exmonth = '0'+exmonth
        this.month = [year+'-' + exmonth, year+'-' + month]
        this.get_cate()
        this.get_area()
    },
    mounted() {
        this.start()
    },
    methods: {
        async get_cate() {
            const res = await api.get_cate({a:1})
            res.data.data.filter(item => {
                const data = {
                    //area_id: this.area_code,
                    startTime: this.month[0],
                    endTime: this.month[1],
                    cateId: item.id
                }
                const r = api.get_cate_data(data)
                item.date = r.data.data
            })
            this.cateList = res.data.data  
            console.log(this.cateList)
        },
        async get_cate_data() {
            const data = {
                startTime: this.month[0],
                endTime: this.month[1],
                //area_id: this.area_code,
            }
            const res = await api.get_cate_data(data)
        },
        scroll() {
            const _this = this
            $(".content ul").animate({"margin-top":"-"+40*this.scrollIndex+"px"}, function() {
                _this.scrollIndex++
                if(_this.scrollIndex == _this.cateList.length) {
                    _this.scrollIndex =0
                }
            });
        },
        start() {
            clearInterval(this.scrolling);
            this.scrolling = setInterval(this.scroll, 2000);
            const _this = this
            $('.content').hover(function() {
                clearInterval(_this.scrolling);
            }, function() {
                _this.start()
            });
        },
        chose_area(val) {
            // this.area_code = val.id
            // this.area = val.city
        },
        backYN() {
            this.$store.commit('map/SET_CHOSED_MAP', {})
            // this.area_code = ''
            // this.area = ''
        },
        async get_area() {
            const res = await api.get_area()
            console.log(res)
            this.areaList = res.data
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

.trans 
    transform rotate(180deg)

.content ul
    width 100%
    height 100%
    margin 0
    padding 0

</style>
