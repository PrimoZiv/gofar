## CommonsChunkPlugin配置简介

最近读了一下webpack的文档，读到CommonsChunkPlugin这个插件，深深折服于webpack的强大，同时也产生了一些自己的疑问。

首先，CommonsChunkPlugin这个插件是用来提取公共代码的，通过将公共模块提取出来，只在页面加载的时候引入一次，提升应用的加载效率。

顺便提一下，chunk其实就是代码块的意思，可能是一个或多个模块，一般提取后就是一个js文件。

CommonsChunkPlugin有中文翻译的文档，但是感觉并不是很通顺，英文文档看完也有一些疑惑，比如minChunks到底是做什么用的，怎么用？chunks是什么？

### 配置项

首先贴一下文档。

```json
{
  name: "string",
  names: "string[]",
  filename: "string",
  minChunks: "number|Infinity|function(module, count) -> boolean",
  chunks: "string[]",
  children: "boolean",
  async: "boolean|string",
  minSize: "number"
}
```
- name和names：chunk的名称，如果这个chunk已经在`entry`中定义，该chunk会被直接提取；如果没有定义，则生成一个空的chunk来提取其他所有chunk的公共代码。
- filename：可以指定提取出的公共代码的文件名称，可以使用`output`配置项中文件名的占位符。未定义时使用`name`作为文件名。
- chunks：可以指定要提取公共模块的源chunks，指定的chunk必须是公共chunk的子模块，如果没有指定则使用所有`entry`中定义的入口chunk。
- minChunks：在一个模块被提取到公共chunk之前，它必须被最少`minChunks`个chunk所包含（通俗的说就是一个模块至少要被`minChunks`个模块所引用，才能被提取到公共模块。）。minChunks参数有三点需要说明：
    1. 该数字必须不小于2或者不大于chunks的个数。默认值等于chunks的个数。
    2. 如果指定了`Infinity`，则创建一个公共chunk，但是不包含任何模块，内部是一些webpack生成的runtime代码和chunk自身包含的模块（如果chunk存在的话）。
    3. 用户也可以定制自己的逻辑去生成代码。
- minSize：表示公共chunk创建所需要的所有模块的最小体积。
- async：如果设置为true，一个异步的公共chunk将会作为`options.name`的子块和`options.chunks`的兄弟块被创建。该chunk会与`options.chunks`并行加载。你也可以使用该参数指定输出的文件名。
- children：如果设置为true，公共chunk的所有子模块将会被选中。

### 例子

我们看一个简单的例子。

```javascript
module.exports = {
    entry: {
        app: './src/index.js',
        vender: [
            'lodash',
            'otherlib'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender'
        })
    ],
    output: {
        // 使用Hash来命名文件，实现文件缓存的功能。当文件内容发生变化，文件名会随之改变。
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
上面的代码中定义了两个入口，app和vender（公共库），plugins中使用CommonsChunkPlugin提取vender。

vender是我们提取出来的公共chunk，通常不会被修改，所以理应在每次编译后文件名保持一致。然而，我们尝试修改入口文件index.js会发现，vender的文件名会发生变化。

原因呢上面提到过，由于每次编译会导致vender的module.id发生变化，内部的runtime代码随之发生改变。

解决方案有以下几种：

1. 使用NamedModulesPlugin插件，用文件路径而非默认的数字ID来作为模块标识。
2. 使用HashedModuleIdsPlugin插件，用相对路径的Hash值来作为模块标识。推荐在生产环境中使用。
3. 将runtime部分的代码提取到一个单独的文件中，代码如下。

```javascript
module.exports = {
    entry: {
        app: './src/index.js',
        vender: [
            'lodash'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vender']
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

代码中再次使用了CommonsChunkPlugin，从vender中提取出了名为manifest的运行时代码。


## 分析Vue的使用方式
Vue在production模式中使用如下配置

```javascript
// split vendor js into its own file
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module, count) {
    // any required modules inside node_modules are extracted to vendor
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    )
  }
}),
// extract webpack runtime and module manifest to its own file in order to
// prevent vendor hash from being updated whenever app bundle is updated
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  chunks: ['vendor']
})
```
#### 自定义minChunks
minChunks配置项有两个参数，module为当前要提取的源chunk中所包含的模块，count表示模块的个数。
自定义函数会被循环调用，直到遍历完所有模块。

module.resource为模块的绝对路径，所以这段代码判断了模块是否在node_modules下，是的话则打包到vender中。

后面一个CommonsChunkPlugin从vender中提取了运行时代码，避免每次打包vender的Hash值都发生变化导致缓存无效。


如有问题，欢迎指正。

