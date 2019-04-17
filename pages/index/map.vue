<template>
    <div class='map' id='map'>
            <!--YN @choseMap='chose_map' v-if='!city_code || city_code.length ==0'></YN>
            <DQ v-if='city_code == "533400000000"' @showIfra = 'show_ifra'></DQ>
            <NJ v-if='city_code == "533300000000"' @showIfra = 'show_ifra'></NJ>
            <DH v-if='city_code == "533100000000"' @showIfra = 'show_ifra'></DH>
            <DL v-if='city_code == "532900000000"' @showIfra = 'show_ifra'></DL>
            <BN v-if='city_code == "532800000000"' @showIfra = 'show_ifra'></BN>
            <WS v-if='city_code == "532600000000"' @showIfra = 'show_ifra'></WS>
            <HH v-if='city_code == "532500000000"' @showIfra = 'show_ifra'></HH>
            <CX v-if='city_code == "532300000000"' @showIfra = 'show_ifra'></CX>
            <LC v-if='city_code == "530900000000"' @showIfra = 'show_ifra'></LC>
            <PE v-if='city_code == "530800000000"' @showIfra = 'show_ifra'></PE>
            <LJ v-if='city_code == "530700000000"' @showIfra = 'show_ifra'></LJ>
            <ZT v-if='city_code == "530600000000"' @showIfra = 'show_ifra'></ZT>
            <BS v-if='city_code == "530500000000"' @showIfra = 'show_ifra'></BS>
            
            <KM v-if='city_code == "530100000000"' @showIfra = 'show_ifra'></KM>
            <QJ v-if='city_code == "530300000000"' @showIfra = 'show_ifra'></QJ>
            <YX v-if='city_code == "530400000000"' @showIfra = 'show_ifra'></YX-->
    </div>
</template>

<script>
import yn from '../../static/maps/云南省.json'
import KM from '../../static/maps/昆明市.json'//昆明
import QJ from '../../static/maps/曲靖市.json'//曲靖
import YX from '../../static/maps/玉溪市.json'//玉溪
import BS from '../../static/maps/保山市.json'//保山
import ZT from '../../static/maps/昭通市.json'//昭通
import LJ from '../../static/maps/丽江市.json'//丽江
import PE from '../../static/maps/普洱市.json'//普洱
import LC from '../../static/maps/临沧市.json'//临沧
import CX from '../../static/maps/楚雄彝族自治州.json'//楚雄
import HH from '../../static/maps/红河哈尼族彝族自治州.json'//红河
import WS from '../../static/maps/文山壮族苗族自治州.json'//文山
import BN from '../../static/maps/西双版纳傣族自治州.json'//版纳
import DL from '../../static/maps/大理白族自治州.json'//大理
import DH from '../../static/maps/德宏傣族景颇族自治州.json'//德宏
import NJ from '../../static/maps/怒江傈僳族自治州.json'//怒江
import DQ from '../../static/maps/迪庆藏族自治州.json'//迪庆
import echarts from 'echarts'
// import YN from './maps/ynMap.vue'//云南省
// import KM from './maps/kunming.vue'//昆明
// import QJ from './maps/qujing.vue'//曲靖
// import YX from './maps/yuxi.vue'//玉溪
// import BS from './maps/baoshan.vue'//保山
// import ZT from './maps/zhaotong.vue'//昭通
// import LJ from './maps/lijiang.vue'//丽江
// import PE from './maps/puer.vue'//普洱
// import LC from './maps/lincang.vue'//临沧
// import CX from './maps/chuxiong.vue'//楚雄
// import HH from './maps/honghe.vue'//红河
// import WS from './maps/wenshan.vue'//文山
// import BN from './maps/banna.vue'//版纳
// import DL from './maps/dali.vue'//大理
// import DH from './maps/dehong.vue'//德宏
// import NJ from './maps/nujiang.vue'//怒江
// import DQ from './maps/diqin.vue'//迪庆

export default {
    data() {
        return {
            //area_item: this.$store.state.map.chosed_map
        }
    },
    props:{
        areaList: Array
    },
    computed:{
        area_item() {
            return this.$store.state.map.chosed_map
        }
    },
    watch:{
        area_item:{
            handler(val) {
                console.log(val,12123)
                this.chose_map(val)
            },
            deep:true
        }
    }, 
    mounted() {
        this.chose_map()
    },
    methods:{
        chose_map(area) {
            if(area&& area.name) {
                switch (area.name) {
                    case '昆明市': 
                    echarts.registerMap('maps', KM); 
                    break;
                    case '曲靖市':
                        echarts.registerMap('maps', QJ); 
                    break;
                    case '玉溪市':
                        echarts.registerMap('maps', YX); 
                    break;
                    case '保山市':
                        echarts.registerMap('maps', BS); 
                    break;
                    case '昭通市': 
                    echarts.registerMap('maps', ZT); 
                    break;
                    case '丽江市':
                        echarts.registerMap('maps', LJ); 
                    break;
                    case '普洱市':
                        echarts.registerMap('maps', PE); 
                    break;
                    case '临沧市':
                        echarts.registerMap('maps', LC); 
                    break;
                    case '楚雄彝族自治州': 
                    echarts.registerMap('maps', CX); 
                    break;
                    case '红河哈尼族彝族自治州':
                        echarts.registerMap('maps', HH); 
                    break;
                    case '文山壮族苗族自治州':
                        echarts.registerMap('maps', WS); 
                    break;
                    case '西双版纳傣族自治州':
                        echarts.registerMap('maps', BN); 
                    break;
                    case '大理白族自治州': 
                    echarts.registerMap('maps', DL); 
                    break;
                    case '德宏傣族景颇族自治州':
                        echarts.registerMap('maps', DH); 
                    break;
                    case '迪庆藏族自治州':
                        echarts.registerMap('maps', DQ); 
                    break;
                    case '怒江傈僳族自治州':
                        echarts.registerMap('maps', NJ); 
                    break;
                    default:
                        return
                        //echarts.registerMap('maps', yn);
                    break;
                }
            } else {
                echarts.registerMap('maps', yn);
            }
            
            var chart = echarts.init(document.getElementById('map'));
            let color_setting = []
            this.$store.state.map.barData.forEach(item => {
                color_setting.push({
                    name: item.name,
                    itemStyle:{
                        areaColor: item.color,
                        color:item.color
                    }
                })
            })
            chart.setOption({
                // visualMap: {
                //     min: 0,
                //     max: 1500,
                //     left: 'left',
                //     top: 'bottom',
                //     text: ['High','Low'],
                //     seriesIndex: [1],
                //     inRange: {
                //         color: ['#e0ffff', '#006edd']
                //     },
                //     calculable : true
                // },
                series: [{
                    type: 'map',
                    data: this.$store.state.map.barData,
                    // map: 'maps',
                    // aspectScale:1.1,
                    // itemStyle: {
                    //     normal: {
                    //         show:true,
                    //         label: {
                    //             show: true,//默认是否显示省份名称 
                    //             color:'#fff',//修改字体颜色
                    //             fontSiae:'14px' 
                    //         },
                    //         areaColor:'rgb(185, 211, 144)',//设置背景颜色
                    //         areaStyle:{
                    //             color:'white',
                    //         },
                    //         borderWidth:1,
                    //         borderColor:'#fff',//设置边框颜色
                    //     },
                    //     emphasis: {//鼠标移入动态的时候显示的默认样式
                    //         show:false,
                    //         label: {
                    //             show: true,//选中状态是否显示省份名称
                    //             color:'#fff',//修改字体颜色
                    //             fontSiae:'14px' 
                    //         },
                    //         textStyle:{
                    //             color:'fff',
                    //         },
                    //         areaColor:'rgb(185, 211, 144)',
                    //     },
                    // }
                }],
                geo: {
                    map:'maps',
                    regions:color_setting,
                    aspectScale:1.1,
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称 
                                color:'#fff',//修改字体颜色
                                fontSiae:'14px' 
                            },
                            areaColor:'rgb(185, 211, 144)',//设置背景颜色
                            areaStyle:{
                                color:'white',
                            },
                            borderWidth:1,
                            borderColor:'#fff',//设置边框颜色
                        },
                        emphasis: {//鼠标移入动态的时候显示的默认样式
                            show:false,
                            label: {
                                show: true,//选中状态是否显示省份名称
                                color:'#fff',//修改字体颜色
                                fontSiae:'14px' 
                            },
                            textStyle:{
                                color:'fff',
                            },
                            areaColor:'rgb(185, 211, 144)',
                        },
                    }
                }
            });
            chart.on("click", par => {
                const area_item = this.areaList.find(item => {
                    return item.name == par.name
                })
                if(area_item) {
                    this.$store.commit('map/SET_CHOSED_MAP', area_item)
                }
                
            })
        },
        
    },
    // components:{
    //     YN,
    //     KM,
    //     QJ,
    //     YX,
    //     BS,
    //     ZT,
    //     LJ,
    //     PE,
    //     LC,
    //     CX,
    //     HH,
    //     WS,
    //     BN,
    //     DL,
    //     DH,
    //     NJ,
    //     DQ
    // }
    

    // get city_code(): string {
    //     return this.$store.state.area_code
    // }

    // get show_qu(): boolean {
    //     return this.$store.state.show_qu
    // }

    // chose_map(data:any) {
    //     this.$store.commit('SET_AREA_CODE', data.id)
    //     this.$store.commit('SET_AREA_NAME',data.city)
    // }
}
</script>

<style lang="stylus">
    .map 
        width 80%
        margin 0 auto
        position relative 
        height 80%
        div
            width 100%
            height 100%
            display flex
            justify-content center
            align-items center
            canvas 
                width 100%
                height 100% 
        
</style>
