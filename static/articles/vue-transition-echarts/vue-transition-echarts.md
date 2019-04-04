## Vue transition过度动画对页面Map功能的影响

今天准备给页面不同菜单的切换加一个过渡动画，代码如下：
```javascript
<div class="content" v-loading="isLoading">
    <transition name="router">
        <router-view/>
    </transition>
</div>
```
```css
.router-enter {
    opacity: 0;
    transform: translateX(100px);
}
.router-leave {
    opacity: 0;
    transform: translateX(-100px);
}
.router-enter-active, .router-leave-active {
    transition: all ease .7s;
}
```
完成后首先发现页面中要切换的两个元素会在动画过程中堆叠起来

![元素堆叠](static/articles/vue-transition-echarts/addon.png)

尝试通过去掉移除动画，保留进入动画的方式解决。

```javascript
<div class="content" v-loading="isLoading">
    <transition name="router">
        <router-view/>
    </transition>
</div>
```
```css
.router-enter {
    opacity: 0;
    transform: translateX(100px);
}
.router-enter-active {
    transition: all ease .7s;
}
```

初步测试正常，已经没有堆叠的问题了。

在测试页面的过程中发现两个Map页功能出现了问题，刷新后第一次进入的那个Map可以正常展示，另一个页面无法显示。
查看控制台，有如下警告信息：

![echarts警告](static/articles/vue-transition-echarts/echarts-error.png)

大意应该是页面中已经有一个echarts实例了，所以不能再次初始化。

导致这个问题的原因应该是添加了页面过渡动画后，会有一瞬间两个组件的Dom同时存在，导致echarts初始化了两次。

找到问题后，查阅了vue的文档，看到有一个配置项：

> 同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式
> in-out：新元素先进行过渡，完成之后当前元素过渡离开。
> out-in：当前元素先进行过渡，完成之后新元素过渡进入。

修改之后的代码：

```javascript
<div class="content" v-loading="isLoading">
    <transition name="router" mode="out-in">
        <router-view/>
    </transition>
</div>
```
```css
.router-enter {
    opacity: 0;
    transform: translateX(100px);
}
.router-leave {
    opacity: 0;
    transform: translateX(-100px);
}
.router-enter-active, .router-leave-active {
    transition: all ease .7s;
}
```

过渡模式为动画提供了处理的先后顺序，完美的解决了之前的问题，同时离开动画也可以增加。
