var http = require('http')
var app = require('koa')()
var router = require('koa-router')()
var cors = require('koa-cors')

// 端口定义
var port = 5151

// 路由注册
router.get('/', function *(next) {
	this.body = 'HMS'
})

router.get('/api/list', function *(next) {
	this.body = [
		{
			id: 1,
			name: '灰太狼'
		},
		{
			id: 2,
			name: '喜羊羊'
		},
	]
})

// 中间件注册
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

// 开启服务器
app.listen(port)

// 控制台提示
console.log('数据模拟服务器已开启，端口: ' + port)
