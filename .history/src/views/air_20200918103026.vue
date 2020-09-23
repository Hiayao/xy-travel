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
              <div class="iconBox bdrr50 flex jc ac">
                <SwapRightOutlined class="icon" />
              </div>
              <div>单程</div>
            </div>
            <div class="modeTwo flex ac jc">
              <div class="iconBox bdrr50 flex jc ac">
                <SwapOutlined class="icon" />
              </div>
              <div>往返</div>
            </div>
          </div>

          <div class="gobackAll">
            <div class="goback">
              <div class="goOne flex ac">
                <div class="go">出发城市</div>
                <a-input v-model:value="value1" placeholder="请输入出发城市" allow-clear />
              </div>
              <div class="goOne flex ac">
                <div class="go">到达城市</div>
                <a-input v-model:value="value1" placeholder="请输入到达城市" allow-clear />
              </div>
              <div class="goOne flex ac">
                <div class="go">出发时间</div>
                <a-input v-model:value="value1" placeholder="input with clear icon" allow-clear />
              </div>
              <a-button type="primary">
                <template v-slot:icon>
                  <SearchOutlined />
                </template>搜索
              </a-button>
            </div>
          </div>
        </div>
        <img src="../assets/pic_sale.jpg" alt class="img" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    // const data: Data = reactive<Data>({});
    return {
      // ...toRefs(data),
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
.query {
  width: 390px;
  height: 350px;
  border: 1px solid #ddd;
}
.img {
  width: 590px;
  height: 350px;
  background: yellow;
}
.mode {
  width: 100%;
  height: 50px;
  font-size: 16px;
}
.iconBox {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  margin-right: 10px;
}
.icon {
  color: #000;
}
.modeOne {
  width: 50%;
  border-top: 2px solid orange;
}
.modeTwo {
  width: 50%;
  background: rgb(238, 238, 238);
}
.go {
  width: 80px;
}
.gobackAll {
  padding: 20px;
}
.goback {
  width: 300px;
}
.goOne {
  margin-bottom: 20px;
}
</style>