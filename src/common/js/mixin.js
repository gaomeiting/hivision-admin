import {
	getData
} from 'api/api';
export const getCommon = {
	data() {
		return {
			currentPage: 1,
			list: [],
			size: 5,
			total: 0

		}
	},
	created() {
		/*this._getSingers({
				page: 0,
				size: this.currentSize
			});*/
	},
	methods: {
		queryChange(arg, i) {
			console.log(i)
			let val = arg[0];
			if (i === 1) {
				this.form.realName = val;
			} else if (i === 2) {
				this.form.mobile = val;
			} else if (i === 3) {
				this.form.email = val;
			}
			console.log(this.form)
		},
		handleSizeChange(pa) {
			let page = page - 1;
			this.search(page)
		},
		handleCurrentChange(pa) {
			let page = pa - 1;
			this.search(page)
		},
		search(page = 0) {
			console.log(page)
			let {
				email,
				mobile,
				realName,
				status
			} = this.form;
			let size = this.size
			getData('/api/contestant', {
				email,
				mobile,
				realName,
				status,
				page,
				size
			}).then(res => {
				this.list = res.data;
				this.total = res.total;
			}).catch(err => {
				if (err && err.data) {
					console.log(err && err.data)
					this.error = err.data.toString()
				} else {
					this.error = "接口调试报错"
				}
			})
		}

	},
};

export const changeStatus = {
	methods: {
		toggleStatus(index) {
			switch (index) {
				case '1':
					return '已报名未提交音频'
				case '2':
					return '音频待审核'
				case '3':
					return '音频审核不通过'
				case '4':
					return '海选通过'
				case '5':
					return '晋级八强'
				case '6':
					return '晋级四强'
			}
		}
	}
}