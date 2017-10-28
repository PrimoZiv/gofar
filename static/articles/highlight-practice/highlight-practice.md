## highlight.js实践

最近自己做了一个markdown语法解析功能，考虑到给代码进行美化，使用了很热门的highlight.js库来做语法高亮。
以下为本次使用该库遇到的一些问题。

### 注释识别有误？

我在配置好代码后，运行应用发现代码中只要出现了单行注释`//`之后，其他行全部被识别成了注释，如下图：
![Pic 1](/static/articles/highlight-practice/article1.png)

查看DOM，缺失都被加上了`hljs-comment`类
![Pic 2](/static/articles/highlight-practice/article2.png)

之后去查阅了官方文档，发现并没有相关的配置表示使用什么作为行分隔符。然后意识到如果没有说明的话应该是默认的换行符。
而我之前在解析`md`文件后，在每一行末尾插入了一个`&lt;br&gt;`，而没有使用换行符。

随后修改了解析方法，使用`\r\n`作为换行符，代码高亮恢复正常。

### 语言包太大，如何处理？

highlight.js对语言的支持非常全面，总共有180种左右，如果默认引入的话，体积有300KB之大，而其中大多数语言基本不会用到。

首先，我去看了`node_modules`中的源码，发现默认文件index.js是这样引入语言文件的

```javascript
var hljs = require('./highlight');

hljs.registerLanguage('1c', require('./languages/1c'));
hljs.registerLanguage('abnf', require('./languages/abnf'));
hljs.registerLanguage('accesslog', require('./languages/accesslog'));
hljs.registerLanguage('actionscript', require('./languages/actionscript'));
...(other language)

module.exports = hljs;
```
看到这个第一反应就是在这里把其他语言都删掉，这样就不会打包到文件中了。随后立即否定了自己。。。直接修改库是太愚蠢的做法，而且不能解决问题。

然后我注意到，源码中主体文件和语言是分开的，那就意味着我可以单独引入主体文件，再根据需要去注册语言。于是就有了如下代码：

```javascript
import hl from 'highlight.js/lib/highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// import part of languages
hl.registerLanguage('json', require('highlight.js/lib/languages/json'))
hl.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hl.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hl.registerLanguage('css', require('highlight.js/lib/languages/css'))
hl.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hl.registerLanguage('php', require('highlight.js/lib/languages/php'))
hl.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))

```
这样就解决了打包文件体积太大的问题。

