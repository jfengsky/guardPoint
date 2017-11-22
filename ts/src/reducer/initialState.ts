export default {
    todoFilter: 'active',
    todoList: [],
    route: [{
        path: '/',
        component: 'Home',
        name: '待办',
        icon: 'appstore',
        show: true
    },{
        path: '/page',
        component: 'Page',
        name: '页面',
        show: true,
        icon: 'chrome'
    },{
        path: '/time',
        component: 'Time',
        name: '计时',
        icon: 'clock-circle',
        show: false
    }, {
        path: '/api',
        component: 'Api',
        name: '接口字段',
        icon: 'api',
        show: true,
        route:[{
            path: '/api/createApi',
            component: 'CreateApi',
            name: '创建接口字段',
            show: true,
            icon: 'file-add'
        },{
            path: '/api/editApi',
            component: 'EditApi',
            name: '修改接口字段',
            show: true,
            icon: 'file-text'
        }]
    }, {
        path: '/modify',
        component: 'Modify',
        name: '编辑',
        icon: 'setting',
        show: true,
        route:[{
            path: '/modify/todo',
            component: 'ModifyTodo',
            name: '任务编辑',
            show: true,
            icon: 'clock-circle-o'
        },{
            path: '/modify/page',
            component: 'ModifyPage',
            name: '页面编辑',
            show: true,
            icon: 'edit'
        },{
            path: '/modify/api',
            component: 'ModifyApi',
            name: '接口编辑',
            show: true,
            icon: 'file-unknown'
        }]
    }]
}