import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
// const baseURL = '/api'
const baseURL = '/'
const service = axios.create({
	baseURL: baseURL,
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({
	baseURL: baseURL,
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
    },
    get_cate(data) {
		return service.post('/PageMaterialController/getMaterialsClass', {})
    },
    get_cate_data(data) {
		return service.post('/PageMaterialController/getMaterialsInfo',data)
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
	get_area_data(data) {
		return service.post('PageMaterialController/getMaterialsInfoByArea', data)
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
		return service.post('/PageUserController/login',data)
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
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/getReportById', data)
	},
	updata_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/updateReport', data)
	},
	add_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/addReport', data)
	},
	get_subscrib(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/findPage', data)
	},
	delete_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/delete',data)
	},
	add_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/add',data)
	},
	get_help(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/pageHelperController/findHelperByPage', data)
	},
	get_help_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
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