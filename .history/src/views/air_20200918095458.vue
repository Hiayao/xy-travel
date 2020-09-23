<template>
  <div class="flex jc">
    <div class="airBox">
      <div class="flex ac">
        <img src="../assets/airIcon.png" alt class="airIcon" />
        <div class="china">国内机票</div>
      </div>

			<div class="flex jsb">
				<div class="query">
					<div class="mode">
						<div>
							<div class="iconBox bdrr50 flex jc ac "><SwapRightOutlined /></div>
						</div>
						<div></div>
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
}
.iconBox{
	width: 20px;
	height: 20px;
	border: 1px solid #000;
}
</style>