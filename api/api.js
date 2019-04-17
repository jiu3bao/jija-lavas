import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const service = axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
      console.log(
        'fetch',
        error.config.url,
        error.config.params,
        'error. error:',
        error
      )
      return Promise.reject(error)
    }
)

const api = {
    get_area(data) {
		return service.post('/PageAreaController/getAreaList', {pid:53})
        return {
            data:[{"id":"530100000000","name":"昆明市","level":"2","pid":"53","geocode":"102.832891,24.880095"},{"id":"530300000000","name":"曲靖市","level":"2","pid":"53","geocode":"103.796167,25.489999"},{"id":"530400000000","name":"玉溪市","level":"2","pid":"53","geocode":"102.546543,24.352036"},{"id":"530500000000","name":"保山市","level":"2","pid":"53","geocode":"99.161761,25.112046"},{"id":"530600000000","name":"昭通市","level":"2","pid":"53","geocode":"103.717465,27.338257"},{"id":"530700000000","name":"丽江市","level":"2","pid":"53","geocode":"100.227750,26.855047"},{"id":"530800000000","name":"普洱市","level":"2","pid":"53","geocode":"100.966512,22.825065"},{"id":"530900000000","name":"临沧市","level":"2","pid":"53","geocode":"100.079583,23.877573"},{"id":"532300000000","name":"楚雄彝族自治州","level":"2","pid":"53","geocode":"101.528068,25.045532"},{"id":"532500000000","name":"红河哈尼族彝族自治州","level":"2","pid":"53","geocode":"103.374799,23.363130"},{"id":"532600000000","name":"文山壮族苗族自治州","level":"2","pid":"53","geocode":"104.216248,23.400733"},{"id":"532800000000","name":"西双版纳傣族自治州","level":"2","pid":"53","geocode":"100.797777,22.007351"},{"id":"532900000000","name":"大理白族自治州","level":"2","pid":"53","geocode":"100.267638,25.606486"},{"id":"533100000000","name":"德宏傣族景颇族自治州","level":"2","pid":"53","geocode":"98.584895,24.433353"},{"id":"533300000000","name":"怒江傈僳族自治州","level":"2","pid":"53","geocode":"98.853097,25.852547"},{"id":"533400000000","name":"迪庆藏族自治州","level":"2","pid":"53","geocode":"99.702234,27.818882"}],
            code:200
        }
    },
    get_cate(data) {
		// return service.post('/PageMaterialController/getMaterialsAndClass', {})
        if(data) {
            return {
                data:{
                    data: [{
						id: "1",
						name: "钢材",
						pid: "0",
						sort: "1",
						children: [{
								id: "11",
								name: "钢筋",
								pid: "1",
								sort: "1"
							},
							{
								id: "12",
								name: "钢板",
								pid: "1",
								sort: "2"
							},
							{
								id: "13",
								name: "钢管",
								pid: "1",
								sort: "3"
							},
							{
								id: "14",
								name: "型钢",
								pid: "1",
								sort: "3"
							},
							{
								id: "15",
								name: "钢绞线",
								pid: "1",
								sort: "3"
							},
							{
								id: "16",
								name: "钢丝绳",
								pid: "1",
								sort: "3"
							},
						]
					},
					{
						id: "3",
						name: "地区材料",
						pid: "0",
						sort: "2",
						children: [{
								id: "31",
								name: "钢筋水泥",
								pid: "3",
								sort: "1"
							},
							{
								id: "32",
								name: "砌体材料",
								pid: "3",
								sort: "2"
							},
							{
								id: "33",
								name: "建筑用砂",
								pid: "3",
								sort: "3"
							},
								{
								id: "34",
								name: "建筑用石",
								pid: "3",
								sort: "3"
							},
								{
								id: "35",
								name: "轻骨料",
								pid: "3",
								sort: "3"
							},
								{
								id: "36",
								name: "地基用材",
								pid: "3",
								sort: "3"
							},
								{
								id: "37",
								name: "混凝土",
								pid: "3",
								sort: "3"
							},
								{
								id: "38",
								name: "建筑砂浆",
								pid: "3",
								sort: "3"
							},
						]
					},
					{
						id: "4",
						name: "电线电缆及光纤光缆",
						pid: "0",
						sort: "3",
						children: [{
								id: "41",
								name: "电力电缆",
								pid: "4",
								sort: "1"
							},
							{
								id: "42",
								name: "电气装备用电",
								pid: "4",
								sort: "2"
							},
							{
								id: "43",
								name: "其他电气材料",
								pid: "4",
								sort: "3"
							},
						]
					},
					{
						id: "5",
						name: "管材",
						pid: "0",
						sort: "4",
						children: [{
								id: "51",
								name: "非金属管",
								pid: "5",
								sort: "1"
							},
							{
								id: "52",
								name: "复合管",
								pid: "5",
								sort: "2"
							},
							{
								id: "53",
								name: "金属管",
								pid: "5",
								sort: "3"
							},
						]
					},
					{
						id: "6",
						name: "防水材料",
						pid: "0",
						sort: "5",
						children: [{
								id: "61",
								name: "防水卷材",
								pid: "6",
								sort: "1"
							},
							{
								id: "62",
								name: "防水涂料",
								pid: "6",
								sort: "2"
							},
							{
								id: "63",
								name: "防水砂浆",
								pid: "6",
								sort: "3"
							},
						]
					},
					{
						id: "7",
						name: "建筑玻璃",
						pid: "0",
						sort: "6",
						children: [{
								id: "71",
								name: "特种琉璃",
								pid: "7",
								sort: "1"
						},
						]
					},
					{
						id: "31",
						name: "混凝土预制件",
						pid: "0",
						sort: "7",
						children: [{
								id: "81",
								name: "混凝土管",
								pid: "31",
								sort: "1"
							},
							{
								id: "82",
								name: "混凝土预制桩",
								pid: "31",
								sort: "2"
							},
						]
					}
				],
                },
                code:200
            }
        }
    },
    get_cate_data(data) {
		// return service.post('/PageMaterialController/findByTime',data)
        if(data) {
            return {
                data:{
                    data:[{
                        price: 12+Math.random(),
                        mindex: 15+Math.random(),
                        mdate: 2019.03,
                        idxval: 3+Math.random(),
                        idxpct: 4+Math.random(),
                        prcval: 5+Math.random()
                    },
                    {
                        price: 12+Math.random(),
                        mindex: 15+Math.random(),
                        mdate: 2019.03,
                        idxval: 3+Math.random(),
                        idxpct: 4+Math.random(),
                        prcval: 5+Math.random()
                    },
                    {
                        price: 12+Math.random(),
                        mindex: 15+Math.random(),
                        mdate: 2019.03,
                        idxval: 3+Math.random(),
                        idxpct: 4+Math.random(),
                        prcval: 5+Math.random()
                    }]
                },  
                code:200
            }
        }
    },
    get_month_data(data) {
        const par = data
        //return service.post('/idxapi/getCategory',data)
        let addList = par.area&&par.area.length>0?par.area:['全省']
        let res = []
        addList.map(item => {
            const data =[
                {
                    x:'2019.02.01',
                    price:(1000+Math.random()*1000).toFixed(2),
                    zs:(2000+Math.random()*1000).toFixed(2),
                    tb:(3000+Math.random()*1000).toFixed(2),
                    hb:(4000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: '2019.02.01'
                },{
                    x:'2019.02.02',
                    price:(1000+Math.random()*1000).toFixed(2),
                    zs:(2000+Math.random()*1000).toFixed(2),
                    tb:(2000+Math.random()*1000).toFixed(2),
                    hb:(4000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: '2019.02.01'
                },{
                    x:'2019.02.04',
                    price:(1000+Math.random()*1000).toFixed(2),
                    zs:(2000+Math.random()*1000).toFixed(2),
                    tb:(3000+Math.random()*1000).toFixed(2),
                    hb:(4000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: '2019.02.01'
                }
            ] 
            res.push(data)
        })
        return {
            data:{
                data:res
            },
            code:200
        }
    },
    get_season_data(data) {
        const par = data
        //return service.post('/idxapi/getCategory',data)
        let addList = par.area&&par.area.length>0?par.area:['全省']
        let res = []
        addList.map(item => {
            console.log(123)
            const data =[
                {
                    x:'2019.02.01',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                },{
                    x:'2019.02.02',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                },{
                    x:'2019.02.04',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                }
            ] 
            res.push(data)
        })
        return {
            data:{
                data:res
            },
            code:200
        }
    },
    get_year_data(data) {
        const par = data
        //return service.post('/idxapi/getCategory',data)
        let addList = par.area&&par.area.length>0?par.area:['全省']
        let res = []
        addList.map(item => {
            console.log(123)
            const data =[
                {
                    x:'2019.02.01',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                },{
                    x:'2019.02.02',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                },{
                    x:'2019.02.04',
                    y:(1000+Math.random()*1000).toFixed(2),
                    add: item,
                    time: par.year
                }
            ] 
            res.push(data)
        })
        return {
            data:{
                data:res
            },
            code:200
        }
    },
    login (data) {
		//let par = qs.stringify(data)
		return service.post('/SystemUserController/login',data)
        if(data.name != 'admin') {
            return {
                msg: '该账号无效',
                code:400
            }
        } else if(data.password != '123456') {
            return {
                msg: '密码错误',
                code:400
            }
        } else {
			console.log(123)
			//return service.post('/api/login',data)
			console.log(789)
            return {
                code:200,
                data:{
                    token: 'auhdfkhaufheb',
                    name: 'admin'
                }
                
            }
        }
	},
	get_reports(data) {
		return service.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/getReportById', data)
	},
	get_subscrib(data) {
		return formser.post('/PageSubscriptionController/findPage', data)
	},
	delete_sub(data) {
		return formser.post('/PageSubscriptionController/delete',data)
	},
	get_help(data) {
		return formser.post('/pageHelperController/findHelperByPage', data)
	},
	get_help_detail(data) {
		return formser.post('/pageHelperController/getArtInfo', data)
	},
	get_msg(data) {
		return service.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service.post('/PageMessageController/delMessage', data)
	}
}

export default api