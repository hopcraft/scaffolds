
var data = {
  name: '赵云',
  age: 89
}
console.log('打印 1', data.name, data.age)

observe(data)

function observe(obj) {
  // 判断是否是合法对象
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return
  }
  for (var key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

function defineReactive(obj, key, val) {
  observe(val)
  for (var key in obj) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactivGetter() {
        console.log('get value')
        return val
      },
      set: function reactivSetter(newVal) {
        console.log('set value')
        val = newVal
      }
    })
  }
}

data.name = '黄晓明'
console.log('打印 2', data.name, data.age)

data.age = 77777
console.log('打印 3', data.name, data.age)
