import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import index from '@/components/index'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
    	path:"/",
    	name: 'home',
    	component: home
    },{
			path: '/',
			name: 'search',
			component: search
		}
  ]
})
