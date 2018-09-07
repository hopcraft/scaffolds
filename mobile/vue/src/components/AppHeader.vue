<template>
	<div class="app-header">
		<div class="inner">
			<router-link to="/" exact>
				<img class="logo" alt="logo">
			</router-link>
			<router-link to="/halo">Halo</router-link>
			<router-link to="/wolf">Wolf</router-link>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
	mounted() {
	},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
@import '../styles/variables';
@import '../styles/functions';

.app-header {
	background-color: $energized;
}
</style>
