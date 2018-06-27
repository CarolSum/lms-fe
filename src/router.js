const routers = [
    {
        path: '/sales',
        meta: {
            title: '销售'
        },
        component: (resolve) => require(['./views/Sales.vue'], resolve)
    },
    {
        path: '/purchase',
        meta: {
            title: '进货'
        },
        component: (resolve) => require(['./views/Purchase.vue'], resolve)
    },
    {
        path: '/statistic',
        meta: {
            title: '统计'
        },
        component: (resolve) => require(['./views/Statistics.vue'], resolve)
    },
    {
        path: '/returns',
        meta: {
            title: '退货'
        },
        component: (resolve) => require(['./views/Returns.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/sales'
    }
];
export default routers;