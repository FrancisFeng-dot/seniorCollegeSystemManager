import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const moduleLogin = {
	namespaced: true,
	state: {
		uid: null,
		token: '',
		userinfo: {}
	},
	getters: getters,
	mutations: mutations,
	actions: actions
};

export default moduleLogin