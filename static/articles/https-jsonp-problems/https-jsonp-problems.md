## HTTPS对jsonp解决跨域问题的影响

一般来说，在使用CORS和Websocket不方便的情况下，jsonp是解决跨域问题最好也是最简单的方式。
然而在最近在使用的过程中发现一些问题，问题主要出在不受信任的HTTPS。

应用场景大致如下：

![拓扑](/static/articles/https-jsonp-problems/jsonp.png)

- 由于本地软件内部的服务器只能对HTTPS进行自签名，导致浏览器不信任该HTTPS
- 打开云端页面后，页面首先通过jsonp跨域请求判断服务器是否可以通过本地访问，如果可以则跳转到本地IP

1. 在本地测试的时候，云端页面使用http来模拟：
  - http  ->->jsonp(**https接口**)->->  不信任的https
    - *浏览器拦截，原因：访问目标为不受信任的https*
  - http  ->->jsonp(**http接口**)->->  不信任的https
    - *可以正常请求，同为http协议*
2. 上线后，云端为认证的https协议：
  - https  ->->jsonp(**https接口**)->->  不信任的https
    - *浏览器拦截，原因：访问目标为不受信任的https*
  - https  ->->jsonp(**http接口**)->->  不信任的https
    - *浏览器拦截，原因：This request has been blocked; the content must be served over HTTPS.*

PS: 在上面的测试中，chrome并不总是会拦截所有不安全的请求，偶尔有的请求可以通过，不知是不是浏览器版本导致的。

---

所以总结上面测试的结果，就是http可以访问http和信任的https，https只可以访问信任的https。

要解决这个问题也很容易，有两种方案：
1. 证书全部使用认证过的证书，可以被浏览器信任
2. 尝试使用其他跨域方案解决
