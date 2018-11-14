import {
    isArray
} from 'lodash-es'
const isArrayFn = (args) => {
    console.log(isArray(args))
}
const async = {
    init() {
        console.log('this is async module')
        fetch('/api/test')
            .then(response => response.json())
            .then(data => {
                console.log('fetchaa结果：' + data.message)
            })
            .catch(err => {
                console.log('吃个🍎稍作休息~' + err)
            })
    }
}

export default {
    async,
    isArrayFn
}