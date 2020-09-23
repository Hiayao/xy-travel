<template>
  <div class="air_All flex jc">
    <div class="airBox">
      <div class="flex ac" style="margin-bottom:10px">
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
            <a-modal v-model:visible="visible" title="提示" @ok="handleOk">
              <p>目前暂不支持往返，请使用单程选票！</p>
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

      <div class="icoAll flex ac">
        <div class="icoOne flex ac jc">
          <img src="../assets/hui.png" alt class="icont" />
          <div>100%航协认证</div>
        </div>
        <div class="icoTwo flex ac jc">
          <img src="../assets/dun.png" alt class="icont" />
          <div>出行保证</div>
        </div>
        <div class="icoOne flex ac jc">
          <img src="../assets/dianhua.png" alt class="icont" />
          <div>7x24小时服务</div>
        </div>
      </div>

      <div>
        <div class="cardAll flex">
          <img src="../assets/jipiao.png" alt class="icons" />
          <div>特价机票</div>
        </div>
        <div class="proposal flex ac jsa">
          <div v-for="(item,index) in proposalList" :key="index" class="proposalItem flex ac pore">
            <img :src="proposalList[0].cover" alt class="cover" />
            <div class="nameAll flex poab jsb">
              <div>{{item.departCity}} - {{item.destCity}}</div>
              <div>￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import api from "@/http/api";
interface Data {
  value: string;
  value2: string;
  value3: string;
  // disabledDate: string;
  visible: boolean;
  proposalList: object[];
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
      proposalList: [],
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
      data.visible = true;
    };
    const handleOk = (): void => {
      data.visible = false;
    };
    const proposalAirs = (): void => {
      api
        .proposalAir()
        .then((res: any) => {
          console.log(res);
          data.proposalList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      proposalAirs();
    });
    return {
      ...toRefs(data),
      onChange,
      change,
      showModal,
      handleOk,
    };
  },
});
</script>

<style scoped lang='scss'>
.air_All {
  margin-top: 20px;
}
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
.icoOne {
  width: 33%;
}
.icoTwo {
  width: 33%;
  height: 40px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.icoAll {
  width: 100%;
  background: rgb(245, 245, 245);
  height: 60px;
  border: 1px solid #ddd;
  margin-top: 20px;
  font-size: 16px;
  color: #000;
}
.icont {
  width: 30px;
  height: 32px;
}
.icons {
  width: 30px;
  height: 32px;
  margin-right: 3px;
}
.cardAll {
  color: #409eff;
  font-size: 20px;
  margin-top: 20px;
}
.proposal {
  border: 1px solid #ddd;
  width: 100%;
}
.cover {
  width: 100%;
  height: 150px;
}
.proposalItem {
  width: 23%;
  height: 180px;
}
.nameAll{
	width: 100%;
	bottom: 20px;
	padding: 0 20px;
}
</style>