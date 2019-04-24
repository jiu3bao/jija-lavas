import Vue from 'vue';
import Router from 'vue-router';

    
import _1556079334578841ca4d5197275510616ab370a047fce from '@/pages/analysis-report/index.vue';
    

    
import _15560793345789d49a922ebc8a6d77ca82c0a74289b98 from '@/pages/Appshell.vue';
    

    
import _1556079334578d2462dcf0c7beccd286c658e08187914 from '@/pages/Error.vue';
    

    
import _15560793345789428264c4e380ae489c6229abcdafd92 from '@/pages/help-detail/index.vue';
    

    
import _155607933457888c46714bf6edbbc977da060a0941ba0 from '@/pages/helping-center/index.vue';
    

    
import _15560793345783427e5efc90da1c015efd99bd7554e93 from '@/pages/index/index.vue';
    

    
import _15560793345788f9fe6e42ccba998fd734f1d63055852 from '@/pages/login/index.vue';
    

    
import _15560793345785bfee1c1d41d366a1f6e2f89de758aab from '@/pages/map/Index.vue';
    

    
import _155607933457855820f374abc4d0eb1f10ec9742299ce from '@/pages/map/map.vue';
    

    
import _15560793345781747b91a5f50e86fc78fccc53b07e380 from '@/pages/my-subscrib/index.vue';
    

    
import _15560793345786981b381182736f7bdef55f3cd178c61 from '@/pages/report-detail/index.vue';
    

    
import _1556079334578a8c88e4ebda62ba3d578157fd93abf03 from '@/pages/season-data/index.vue';
    

    
import _155607933457831ac34fed923a5a9be2058ba7c2195cd from '@/pages/year-data/index.vue';
    


let routes = [
    {
        "path": "/analysis-report",
        "component": _1556079334578841ca4d5197275510616ab370a047fce,
        "meta": {},
        "name": "analysis-report"
    },
    {
        "path": "/appshell",
        "component": _15560793345789d49a922ebc8a6d77ca82c0a74289b98,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/help-detail",
        "component": _15560793345789428264c4e380ae489c6229abcdafd92,
        "meta": {},
        "name": "help-detail"
    },
    {
        "path": "/helping-center",
        "component": _155607933457888c46714bf6edbbc977da060a0941ba0,
        "meta": {},
        "name": "helping-center"
    },
    {
        "path": "/",
        "component": _15560793345783427e5efc90da1c015efd99bd7554e93,
        "meta": {},
        "name": "index"
    },
    {
        "path": "/login",
        "component": _15560793345788f9fe6e42ccba998fd734f1d63055852,
        "meta": {},
        "name": "login"
    },
    {
        "path": "/map",
        "component": _15560793345785bfee1c1d41d366a1f6e2f89de758aab,
        "meta": {},
        "name": "map"
    },
    {
        "path": "/map/map",
        "component": _155607933457855820f374abc4d0eb1f10ec9742299ce,
        "meta": {},
        "name": "mapMap"
    },
    {
        "path": "/my-subscrib",
        "component": _15560793345781747b91a5f50e86fc78fccc53b07e380,
        "meta": {},
        "name": "my-subscrib"
    },
    {
        "path": "/report-detail",
        "component": _15560793345786981b381182736f7bdef55f3cd178c61,
        "meta": {},
        "name": "report-detail"
    },
    {
        "path": "/season-data",
        "component": _1556079334578a8c88e4ebda62ba3d578157fd93abf03,
        "meta": {},
        "name": "season-data"
    },
    {
        "path": "/year-data",
        "component": _155607933457831ac34fed923a5a9be2058ba7c2195cd,
        "meta": {},
        "name": "year-data"
    },
    {
        "path": "/error",
        "component": _1556079334578d2462dcf0c7beccd286c658e08187914,
        "meta": {},
        "name": "error",
        "alias": "*"
    }
];

Vue.use(Router);




const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};



export const keepAlivePages = routes.filter(route => route.keepAlive || route.meta.keepAlive)
                            .map(route => route.name);

export function createRouter() {
    let router = new Router({
        mode: 'hash',
        base: '/',
        scrollBehavior,
        routes
    });



    

    router.beforeEach((to, from, next) => {
        if (router.app.$store) {
            if (router.app.$store.state.pageTransition.enable) {
                
                let effect = 'fade';
                
                router.app.$store.commit('pageTransition/setType', 'fade');
                router.app.$store.commit('pageTransition/setEffect', effect);
            }
        }
        next();
    });


    return router;
}
