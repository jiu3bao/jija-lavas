import Vue from 'vue';
import Router from 'vue-router';

    
import _841ca4d5197275510616ab370a047fce from '@/pages/analysis-report/index.vue';
    

    
import _9d49a922ebc8a6d77ca82c0a74289b98 from '@/pages/Appshell.vue';
    

    
import _d2462dcf0c7beccd286c658e08187914 from '@/pages/Error.vue';
    

    
import _9428264c4e380ae489c6229abcdafd92 from '@/pages/help-detail/index.vue';
    

    
import _88c46714bf6edbbc977da060a0941ba0 from '@/pages/helping-center/index.vue';
    

    
import _69af8b261b3c2871c7c89a4b4cd3726f from '@/pages/index/Index.vue';
    

    
import _72c9190fa43844fe244c3847bc8f99c1 from '@/pages/index/map.vue';
    

    
import _8f9fe6e42ccba998fd734f1d63055852 from '@/pages/login/index.vue';
    

    
import _ab416792cdaddee0a421d3d437c5ac73 from '@/pages/month-data/index.vue';
    

    
import _1747b91a5f50e86fc78fccc53b07e380 from '@/pages/my-subscrib/index.vue';
    

    
import _6981b381182736f7bdef55f3cd178c61 from '@/pages/report-detail/index.vue';
    

    
import _a8c88e4ebda62ba3d578157fd93abf03 from '@/pages/season-data/index.vue';
    

    
import _31ac34fed923a5a9be2058ba7c2195cd from '@/pages/year-data/index.vue';
    


let routes = [
    {
        "path": "/analysis-report",
        "component": _841ca4d5197275510616ab370a047fce,
        "meta": {},
        "name": "analysis-report"
    },
    {
        "path": "/appshell",
        "component": _9d49a922ebc8a6d77ca82c0a74289b98,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/help-detail",
        "component": _9428264c4e380ae489c6229abcdafd92,
        "meta": {},
        "name": "help-detail"
    },
    {
        "path": "/helping-center",
        "component": _88c46714bf6edbbc977da060a0941ba0,
        "meta": {},
        "name": "helping-center"
    },
    {
        "path": "/",
        "component": _69af8b261b3c2871c7c89a4b4cd3726f,
        "meta": {},
        "name": "index"
    },
    {
        "path": "/index/map",
        "component": _72c9190fa43844fe244c3847bc8f99c1,
        "meta": {},
        "name": "indexMap"
    },
    {
        "path": "/login",
        "component": _8f9fe6e42ccba998fd734f1d63055852,
        "meta": {},
        "name": "login"
    },
    {
        "path": "/month-data",
        "component": _ab416792cdaddee0a421d3d437c5ac73,
        "meta": {},
        "name": "month-data"
    },
    {
        "path": "/my-subscrib",
        "component": _1747b91a5f50e86fc78fccc53b07e380,
        "meta": {},
        "name": "my-subscrib"
    },
    {
        "path": "/report-detail",
        "component": _6981b381182736f7bdef55f3cd178c61,
        "meta": {},
        "name": "report-detail"
    },
    {
        "path": "/season-data",
        "component": _a8c88e4ebda62ba3d578157fd93abf03,
        "meta": {},
        "name": "season-data"
    },
    {
        "path": "/year-data",
        "component": _31ac34fed923a5a9be2058ba7c2195cd,
        "meta": {},
        "name": "year-data"
    },
    {
        "path": "/error",
        "component": _d2462dcf0c7beccd286c658e08187914,
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
        base: './',
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
