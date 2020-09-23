<template>
  <div class="flex jc">
    <div class="airBox">
      <div class="flex ac">
        <img src="../assets/airIcon.png" alt class="airIcon" />
        <div class="china">国内机票</div>
      </div>

			<div class="flex jsb">
				<div class="query"></div>
				<img src="../assets/pic_sale.jpg" alt="" class="img">
			</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.airBox {
  width: 1000px;
}
.airIcon {
  width: 25px;
  height: 25px;
  margin-right: 3px;
}
.china {
  font-size: 20px;
  color: #ffa500;
}
.query{
	width: 390px;
	height: 500px;
	background: yellowgreen;
}
.img{
	width: 590px;
	height: 500px;
	background: yellow;
}
</style>