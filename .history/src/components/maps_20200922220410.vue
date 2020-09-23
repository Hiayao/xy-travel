<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var map = new AMap.Map("container");
    var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D", //使用3D视图
    });
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
#container {
  width: 300px;
  height: 180px;
}
</style>