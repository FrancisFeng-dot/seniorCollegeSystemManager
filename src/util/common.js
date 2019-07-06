export default {
	install: function(Vue, opt) {
		Vue.mixin({
			methods: {
				timecountdown: function(event, obj) {
					var count = 60;
					event.target.disabled = true;
					var countdown = setInterval(function() {
						if (count === 0) {
							obj.btntip = '重新获取';
							event.target.disabled = false;
							clearInterval(countdown);
						} else {
							count--;
							obj.btntip = count + 's';
						}
					}, 1000);
				},

				filttime(number) {
					if (!number) return '';
					let date = new Date(number);
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
					let time = Y + M + D;
					return time;
				}
			}
		})
	}
}