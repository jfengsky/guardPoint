export default {
    todoTags: [{
        label: 'CR',
        value: 1,
        color: '#87d068'
    },
    {
        label: '事件',
        value: 2,
        color: '#108ee9'
    },
    {
        label: '紧急',
        value: 3,
        color: '#f50'
    },
    {
        label: '项目',
        value: 4,
        color: '#87d068'
    },
    {
        label: 'bug',
        value: 5,
        color: 'red'
    }],
    apiList: [],
    todoFilter: 'active',
    todoList: [],
    route: [{
        path: '/',
        component: 'Home',
        name: '待办',
        icon: 'appstore',
        show: true
    }, {
        path: '/calendarTask',
        component: 'CalendarTask',
        name: '日历',
        icon: 'calendar',
        show: true
    }, {
        path: '/page',
        component: 'Page',
        name: '页面',
        show: true,
        icon: 'chrome'
    }, {
        path: '/time',
        component: 'Time',
        name: '计时',
        icon: 'clock-circle',
        show: false
    }, {
        path: '/api',
        component: 'Api',
        name: '接口',
        icon: 'api',
        show: true,
        route: [{
            path: '/api/apilist',
            component: 'ApiList',
            name: '代理接口列表',
            show: true,
            icon: 'bars'
        },{
            path: '/api/createApi',
            component: 'CreateApi',
            name: '创建代理接口',
            show: true,
            icon: 'exception'
        },{
            path: '/api/moidfyapi',
            component: 'ModifyApi',
            name: '修改代理接口',
            show: true,
            icon: 'file-text'
        },{
            path: '/api/createApiinfo',
            component: 'CreateApiInfo',
            name: '创建接口字段',
            show: true,
            icon: 'file-add'
        }, {
            path: '/api/editApi',
            component: 'EditApi',
            name: '修改接口字段',
            show: true,
            icon: 'file-excel'
        }]
    }, {
        path: '/modify',
        component: 'Modify',
        name: '编辑',
        icon: 'setting',
        show: true,
        route: [{
            path: '/modify/todo',
            component: 'ModifyTodo',
            name: '任务编辑',
            show: true,
            icon: 'clock-circle-o'
        }, {
            path: '/modify/page',
            component: 'ModifyPage',
            name: '页面编辑',
            show: true,
            icon: 'edit'
        }, {
            path: '/modify/api',
            component: 'ModifyApi',
            name: '接口编辑',
            show: true,
            icon: 'file-unknown'
        }]
    }, {
        path: '/chart',
        component: 'Chart',
        name: '统计',
        icon: 'area-chart',
        show: true
    }]
}