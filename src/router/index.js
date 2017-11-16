import Music from '@/components/Music'
import SocialBlade from '@/components/SocialBlade'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'SocialBlade',
			component: SocialBlade
		},
		{
			path: '/music',
			name: 'Music',
			component: Music
		},
		{
			path: '/support',
			name: 'Support',
			component: SocialBlade
		},
	]
})
