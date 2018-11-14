import banner from './components/banner'
import item from './components/banner/banner.css'
import( /* webpackChunkName: "async-module" */ './components/async').then(_ => {
    _.default.async.init()
})
setTimeout(() => {
    document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello webpack~!</h1>`
}, 1000)
banner();