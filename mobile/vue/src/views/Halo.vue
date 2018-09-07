<template>
	<div class="page page-halo">
		<app-header />
		<div class="content">
			Halo
		</div>
	</div>

</template>

<script>
import AppHeader from '../components/AppHeader.vue'

export default {

  data () {
    return {}
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {
		AppHeader
	}
}
</script>

<style lang="scss">
.page-halo {
	background: red;
}
</style>
