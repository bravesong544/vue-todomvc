let filter = {
	all(list) {
		return list;
	},
	active(list){
		return list.filter(function (item) {
			return !item.completed;
		});
	},
	completed(list) {
		return list.filter(function (item) {
			return item.completed;
		});
	}
}

const app = new Vue({
	el: "#app",
	data: {
		newVal: "",
		todoList: [],
		editing: -1,
		nowActive: "all",
		selectAll: false
	},
	watch: {
		todoList: {
			deep: true,
			handler() {
				window.localStorage.setItem("todoList", JSON.stringify(this.todoList))
			}
		}
	},
	mounted() {
		this.todoList = JSON.parse(window.localStorage.getItem("todoList") || '[]');
	},
	computed: {
		filterList() {
			return filter[this.nowActive](this.todoList);
		},
		activeLength() {
			return this.todoList.filter(function (item) {
				return !item.completed;
			}).length;
		}
	},
	methods: {
		addTodo(){
			if (this.newVal) {
				this.todoList.push(
					{
						info: this.newVal,
						completed: false
					}
				)
			}
			this.newVal = '';
		},
		edit(index) {
			this.editing = index;
		},
		changeActive(newActive) {
			this.nowActive = newActive;
		},
		delItem(index) {
			this.todoList.splice(index, 1);
		},
		isSelectAll() {
			this.selectAll = true;
			this.todoList.forEach((item) => {
				if (item.completed == false) {
					this.selectAll = false;
				}
			});
		},
		allCompleted() {
			this.todoList.forEach((item) => {
				item.completed = this.selectAll;
			});
		},
		clearCompleted() {
			/*this.todoList.forEach((item, index) => {
				if (item.completed == true) {
					this.todoList.splice(index, 1);
				}
			});*/
			for(let i = this.todoList.length - 1; i > 0; i--){
				if (this.todoList[i].completed == true) {
					this.todoList.splice(i, 1);
				}
			}
		}
	}
});


