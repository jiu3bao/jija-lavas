/**
 * @file pageTransition module
 * @author lavas
 */

export const state = () => {
    return {
        barData:[{"id":"530100000000","name":"昆明市",itemStyle:{
                    normal:{
                        show:true,
                        areaColor:'#fff',
                        label:{
                            show:true,
                            color:'#fff',
                            fontSiae:'14px' 
                        },
                        areaStyle:{
                            color:'white',
                        },
                        areaColor:'#f00',
                        borderWidth:1,
                        borderColor:'#fff',
                    },
                    emphasis: {
                        show:false,
                        label: {
                            show: true,//选中状态是否显示省份名称
                            color:'#fff',//修改字体颜色
                            fontSiae:'14px' 
                        },
                        textStyle:{
                            color:'#fff',
                        },
                        areaColor:'#f00',
                    }
                }},
                {"id":"530300000000","name":"曲靖市"},
                {"id":"530400000000","name":"玉溪市"},
                {"id":"530500000000","name":"保山市"},
                {"id":"530600000000","name":"昭通市"},
                {"id":"530700000000","name":"丽江市"},
                {"id":"530800000000","name":"普洱市"},
                {"id":"530900000000","name":"临沧市"},
                {"id":"532300000000","name":"楚雄彝族自治州"},
                {"id":"532500000000","name":"红河哈尼族彝族自治州"},
                {"id":"532600000000","name":"文山壮族苗族自治州"},
                {"id":"532800000000","name":"西双版纳傣族自治州"},
                {"id":"532900000000","name":"大理白族自治州"},
                {"id":"533100000000","name":"德宏傣族景颇族自治州"},
                {"id":"533300000000","name":"怒江傈僳族自治州"},
                {"id":"533400000000","name":"迪庆藏族自治州"}],
        chosed_map: {}
    };
};

export const mutations = {
    SET_BAR_DATA(state, data) {
        state.barData = data
    },
    SET_CHOSED_MAP(state, data) {
        state.chosed_map = data
    }
};
