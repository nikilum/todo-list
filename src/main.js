import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$modal = function (modalId, eventType) {

    let modal = window.nModals[modalId]

    if(!modal) {
        throw new Error(`Modal with this id (${modalId}) not found`)
    }

    if (eventType === 'show') {
        modal.opened = true
        document.querySelector('body').style.overflow = 'hidden'
    }

    if (eventType === 'hide') {
        modal.opened = false
        document.querySelector('body').style.overflow = 'auto'
    }

}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
