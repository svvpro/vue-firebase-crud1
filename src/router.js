import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/Home";
import Ads from "./components/Ads";
import Ad from "./components/Ad";
import AdNew from "./components/AdNew";
import AdEdit from "./components/AdEdit";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', component: Home, name: 'home'},
    {path: '/ads', component: Ads, name: 'ads'},
    {path: '/ads/new', component: AdNew, name: 'new'},
    {path: '/ads/:id/edit', component: AdEdit, name: 'edit', props: true},
    {path: '/ads/:id', component: Ad, name: 'ad', props: true},
  ]
})
