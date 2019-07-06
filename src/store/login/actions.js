const actions = {
	isetuid({
		commit
	}, todo) {
		commit('setuid', todo)
	},
	isettoken({
		commit
	}, todo) {
		commit('settoken', todo)
	},
	isetuserinfo({
		commit
	}, todo) {
		commit('setuserinfo', todo)
	}
};

export default actions