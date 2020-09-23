<template>
  <div class="flex jc" style="margin-top:5px;background:rgb(245,245,245);">
    <div class="payBox">
      <div class="flex ac jfe">
        <div>支付总金额</div>
        <div class="total">￥ {{total}}</div>
      </div>
      <div class="pay_box">
        <div class="weixin">微信支付</div>
        <div class="flex jsa ac">
          <div class="pay flex column ac">
            <img src="../assets/pay.png" alt class="png"/>
            <div>请使用微信扫一扫</div>
            <div>扫描二维码支付</div>
          </div>
          <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="" class="img">
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
import { useRouter, useRoute } from "vue-router";
interface Data {
  path: string;
  total: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const data: Data = reactive<Data>({
      path: "/air",
      total: "",
    });
    onMounted(() => {
      console.log(route.query);
      data.total = route.query.total as string;
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.payBox {
  width: 1000px;
  font-size: 16px;
  padding: 20px 0;
}
.total {
  font-size: 28px;
  color: red;
}
.pay_box {
  width: 100%;
  background: #fff;
  border-top: 3px solid orange;
  padding: 30px;
}
.weixin {
  font-size: 28px;
  color: #000;
  margin-bottom: 20px;
}
.pay{
    padding: 20px;
    border: 1px solid #ddd;
    height: 360px;
}
.png{
    width: 250px;
    height: 250px;
}
</style>