import {isArray} from 'lodash'
export default {
    install: function(Vue, options) {
        Vue.prototype.$getData = function(url, filter) {
            let self = this
            filter = filter || {}
            return new Promise((resolve, reject) => {
                self.$http.get(url).then((res) => {
                    let data
                    if (filter.key !== undefined) {
                        let tempData = []
                        for (let i of res.body.data) {
                            if (i.key === filter.key || (isArray(filter.key) && filter.key.includes(i.key))) {
                                tempData.push(i)
                            }
                        }
                        data = isArray(filter.key) ? tempData : tempData[0]
                    } else if (filter.index !== undefined) {
                        if (isArray(filter.index)) {
                            data = data.res.body.data.slice(filter.index[0], filter.index[1])
                        } else {
                            data = res.body.data[filter.index]
                        }
                    } else {
                        data = res.body.data
                    }
                    resolve(data)
                })
            })
        }
    }
}
