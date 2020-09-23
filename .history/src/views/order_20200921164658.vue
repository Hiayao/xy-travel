<template>
  <div class="flex jc" style="margin-top:5px">
    <div class="orderBox flex jsb">
      <div class="BoxOne">
        <div class="onefoone">
          <div class="title1">乘机人</div>
          <div style="margin-bottom:12px">乘机人</div>
          <a-input v-model:value="value" placeholder="请输入乘机人姓名" />
          <div style="margin:12px 0 12px 0">证件类型</div>
          <a-input-group compact>
            <a-select v-model:value="value2" style="width: 20%">
              <a-select-option value="Option1">身份证</a-select-option>
              <a-select-option value="Option2">护照</a-select-option>
            </a-select>
            <a-input style="width: 80%" v-model:value="value3" placeholder="证件号码" />
          </a-input-group>
        </div>
        <div class="btn">
          <a-button type="primary">添加乘客</a-button>
        </div>
        <div class="Insurance">
          <div class="title1">保险</div>
           <div>
            <a-checkbox
              v-model:checked="checked"
              @change="onChange"
            >{{insurances[0].type}}: ￥{{insurances[0].price}}/份x1 最高赔付{{insurances[0].compensation}}</a-checkbox>
          </div> 
          <div>
            <a-checkbox
              v-model:checked="checked"
              @change="onChange"
            >{{insurances[1].type}}: ￥{{insurances[1].price}}/份x1 最高赔付{{insurances[1].compensation}}元</a-checkbox>
          </div> 
        </div>
      </div>

      <div class="BoxTwo">
        <div class="Two1">
          <div class="flex jsb" style="font-size:16px; color:#000;margin-bottom:5px">
            <div>{{list.dep_date}}</div>
            <div>{{list.org_city_name}} - {{list.dst_city_name}}</div>
          </div>
          <div class="flex ac jsb">
            <div class="flex column ac">
              <div style="color:#000;font-size:22px">{{list.dep_time}}</div>
              <div>{{list.org_airport_name}}</div>
            </div>
            <div class="flex column ac">
              <div>--- {{duration[0]}}时{{duration[1]}}分 ---</div>
              <div>{{list.airline_name}} {{list.flight_no}}</div>
            </div>
            <div class="flex column ac">
              <div style="color:#000;font-size:22px">{{list.arr_time}}</div>
              <div>{{list.dst_city_name}}</div>
            </div>
          </div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>订单总价</div>
          <div>金额</div>
          <div>数量</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>成人机票</div>
          <div>￥{{price}}</div>
          <div>X 1</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>机建+燃油</div>
          <div>￥{{list.airport_tax_audlet}}/人/单程</div>
          <div>X 1</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div style="font-size:14px">应付总额</div>
          <div style="font-size:28px;color:orange">￥{{price*1+list.airport_tax_audlet*1}}</div>
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
import { useRoute, useRouter } from "vue-router";
import api from "@/http/api";
import { AirFlights } from "@/types";
interface Data {
  id: number;
  value: string;
  value2: string;
  value3: string;
  list: object;
  duration: string[];
	price: number;
	insurances: object[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      id: 0,
      value: "",
      value2: "Option1",
      value3: "",
      list: {},
      duration: [],
			price: 0,
			insurances: [],
    });
    const getAir = (): void => {
      api
        .getAirs(data.id)
        .then((res: any) => {
					if(res.insurances){
						  console.log(res);
					data.list = res;
					data.insurances = res.insurances
					}
        
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.id = Number(route.query.id as string);
      data.duration = JSON.parse(route.query.duration as string);
      data.price = Number(route.query.price as string);
      getAir();
    });
    return {
      ...toRefs(data),
      getAir,
    };
  },
});
</script>

<style scoped lang='scss'>
.orderBox {
  width: 1000px;
  height: 1000px;
}
.BoxOne {
  width: 560px;
  height: 100%;
  background: palegoldenrod;
}
.BoxTwo {
  width: 400px;
  height: 278px;
  border: 1px solid #ddd;
}
.title1 {
  font-size: 22px;
  color: #000;
  margin-bottom: 20px;
}
.onefoone {
  padding: 20px 0;
  border-bottom: 1px dashed #ddd;
}
.Two1 {
  padding: 20px;
  border-bottom: 1px dashed #ddd;
  font-size: 12px;
  color: #999;
}
.Two2 {
  font-size: 14px;
  color: #666;
  padding: 5px 20px;
  border-bottom: 1px dashed #ddd;
}
.btn {
  padding: 40px 0 20px 0;
  border-bottom: 1px dashed #ddd;
}
.Insurance {
  padding: 10px 0 30px 0;
  border-bottom: 1px dashed #ddd;
}
</style>