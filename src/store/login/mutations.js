const mutations = {
	setuid(state, todo) {
		state.uid = todo;
	},
	settoken(state, todo) {
		state.token = todo;
	},
	setuserinfo(state, todo) {
		state.userinfo = todo;
	}
};

export default mutations