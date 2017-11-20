export default {
    route: [{
        path: '/',
        component: 'Home',
        name: '待办',
        icon: 'appstore'
    },{
        path: '/page',
        component: 'Page',
        name: '页面',
        icon: 'chrome'
    }, {
        path: '/api',
        component: 'Api',
        name: '接口字段',
        icon: 'api',
        route:[{
            path: '/api/createApi',
            component: 'CreateApi',
            name: '创建接口字段',
            icon: 'file-add'
        },{
            path: '/api/editApi',
            component: 'EditApi',
            name: '修改接口字段',
            icon: 'file-text'
        }]
    }, {
        path: '/modify',
        component: 'Modify',
        name: '编辑',
        icon: 'setting',
        route:[{
            path: '/modify/todo',
            component: 'ModifyTodo',
            name: '任务编辑',
            icon: 'clock-circle-o'
        },{
            path: '/modify/page',
            component: 'ModifyPage',
            name: '页面编辑',
            icon: 'edit'
        },{
            path: '/modify/api',
            component: 'ModifyApi',
            name: '接口编辑',
            icon: 'file-unknown'
        }]
    }]
}