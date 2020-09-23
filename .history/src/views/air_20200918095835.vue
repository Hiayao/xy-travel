<template>
  <div class="flex jc">
    <div class="airBox">
      <div class="flex ac">
        <img src="../assets/airIcon.png" alt class="airIcon" />
        <div class="china">国内机票</div>
      </div>

			<div class="flex jsb">
				<div class="query">
					<div class="mode flex">
						<div class="modeOne flex ac jc">
							<div class="iconBox bdrr50 flex jc ac "><SwapRightOutlined class="icon"/></div>
							<div>单程</div>
						</div>
						<div class="modeOne flex ac jc">
							<div class="iconBox bdrr50 flex jc ac "><SwapOutlined class="icon"/></div>
							<div>往返</div>
						</div>
					</div>
				</div>
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
	height: 350px;
	background: yellowgreen;
}
.img{
	width: 590px;
	height: 350px;
	background: yellow;
}
.mode{
	width: 100%;
	height: 50px;
	background: violet;
	font-size: 16px;
}
.iconBox{
	width: 20px;
	height: 20px;
	border: 1px solid #000;
}
.icon{
	color: #000;
	margin-right: 10px;
}
.modeOne{
	width: 50%;
}
</style>