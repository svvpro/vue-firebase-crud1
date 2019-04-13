import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fbs from 'firebase'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        fbs.initializeApp({
            apiKey: "AIzaSyAj-HG6ujLkpQYb-e7_BNZ1wUWBw_1OEOE",
            authDomain: "vue-test-a85de.firebaseapp.com",
            databaseURL: "https://vue-test-a85de.firebaseio.com",
            projectId: "vue-test-a85de",
            storageBucket: "vue-test-a85de.appspot.com",
            messagingSenderId: "590695805930"
        });

        this.$store.dispatch('getAllAds')
    }
}).$mount('#app')
