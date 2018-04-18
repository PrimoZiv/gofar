## Koa 学习笔记

#### Koa的启动非常简单，仅需要3行代码

```javascript
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
```

#### Koa提供了一个Context对象，表示一次对话的上下文（request response）

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.response.body = 'Hello World.';
});
app.listen(3000);
```

`ctx.response`代表HTTP的响应，`ctx.request`代表请求

#### 响应类型

通过`ctx.request.accepts()`接口可以判断客户端接收的请求类型,通过`ctx.response.type`指定返回的类型

```javascript
app.use(ctx => {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
});
```

#### 使用模板

使用定义好的模板或者返回其他文件可以直接使用node的接口，如下：

```javascript
const fs = require('fs');

app.use(ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
});
```

#### 异步中间件

如果处理过程中有使用到异步的操作，中间件使用async函数的方式实现。

```javascript
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

app.use(main);
app.listen(3000);
```

---

Koa 提供了一个类似于插件的功能，所有对请求的处理都可以使用同步或异步的方式插入到处理过程中。

多个中间件形成栈结构，使用先进后出的方式执行。

在Koa中同样可以使用已有的封装插件，如`koa-route`, `koa-static`等。
