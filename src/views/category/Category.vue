<template>
	<div class="wrapper" ref="aaaa">
    <div>
      <!--1.无论是否设置click:false, button都可以点击-->
      <button @click="btnClick">按钮</button>

      <!--2.必须设置click:true, 那么div才能监听点击-->
      <div @click="divClick">呵呵呵呵</div>

      <ul class="content">
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表6</li>
        <li>分类列表7</li>
        <li>分类列表8</li>
        <li>分类列表9</li>
      </ul>
    </div>
	</div>
</template>

<script>

	export default {
		name: 'Category',
		// props: [''],
		data () {
			return {

			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {},
		watch: {}
	}

</script>
<style lang='' scoped>

</style>