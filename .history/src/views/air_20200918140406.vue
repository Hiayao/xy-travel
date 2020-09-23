<template>
  <a-locale-provider :locale="zh_CN">
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
              <div class="modeTwo flex ac jc" @click="showModal">
                <div class="iconBox bdrr50 flex jc ac">
                  <SwapOutlined class="icon" />
                </div>
                <div>往返</div>
              </div>
              <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </a-modal>
            </div>

            <div class="gobackAll flex">
              <div class="goback">
                <div class="goOne flex ac">
                  <div class="go">出发城市</div>
                  <a-input v-model:value="value" placeholder="请输入出发城市" allow-clear />
                </div>
                <div class="goOne flex ac">
                  <div class="go">到达城市</div>
                  <a-input v-model:value="value2" placeholder="请输入到达城市" allow-clear />
                </div>
                <div class="goOne flex ac">
                  <div class="go">出发时间</div>
                  <a-date-picker v-model:value="value3" @change="onChange" placeholder="请选择日期" />
                </div>
                <a-button type="primary" class="searchBtn" size="large">
                  <template v-slot:icon>
                    <SearchOutlined />
                  </template>搜索
                </a-button>
              </div>
              <div style="padding:20px 0">
                <div class="zeOne"></div>
                <div class="change flex jc ac" @click="change">换</div>
                <div class="zeTwo"></div>
              </div>
            </div>
          </div>
          <img src="../assets/pic_sale.jpg" alt class="img" />
        </div>
      </div>
    </div>
  </a-locale-provider>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
interface Data {
  value: string;
  value2: string;
  value3: string;
	// disabledDate: string;
	visible: boolean;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      value: "",
      value2: "",
      value3: "",
			// disabledDate: '',
			visible: false,
    });
    const onChange = (date: any, dateString: any): void => {
      console.log(date, dateString);
    };
    const change = (): void => {
      const one = data.value;
      const two = data.value2;
      data.value = two;
      data.value2 = one;
		};
		const showModal = (): void => {
			data.visible = true
		}
		const handleOk = (): void => {
			data.visible = false
		}
    return {
      ...toRefs(data),
      onChange,
			change,
			showModal,
			handleOk
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
.searchBtn {
  margin-left: 63px;
  width: 237px;
}
.zeOne {
  width: 25px;
  height: 16px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.change {
  width: 30px;
  height: 30px;
  background: #ddd;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
}
.zeTwo {
  width: 25px;
  height: 16px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
</style>