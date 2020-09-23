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
      </div>
      <div class="BoxTwo">
				<div class="flex jsb" style="font-size:16px; color:#000">
					<div>{{list.dep_date}}</div>
					<div>{{list.org_city_name}} - {{list.dst_city_name}}</div>
				</div>
				<div>
					<div>
						<div>{{list.dep_time}}</div>
						<div>{{list.org_airport_name}}</div>
					</div>
					<div>
						<div>--- {{duration[0]}}时{{duration[1]}}分 ---</div>
						<div>{{list.airline_name}} {{list.flight_no}}</div>
					</div>
					<div>
						<div>{{list.arr_time}}</div>
						<div>{{list.dst_city_name}}</div>
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
import { useRoute, useRouter } from "vue-router";
import api from "@/http/api";
import {AirFlights} from '@/types'
interface Data {
  id: number;
  value: string;
  value2: string;
	value3: string;
	list: object;
	duration: string[];
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
    });
    const getAir = (): void => {
      api
        .getAirs(data.id)
        .then((res: any) => {
					console.log(res);
					data.list = res
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
			data.id = Number(route.query.id as string);
			data.duration = JSON.parse(route.query.duration as string)
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
  background: orchid;
}
.BoxOne {
  width: 560px;
  height: 100%;
  background: palegoldenrod;
}
.BoxTwo {
  width: 400px;
  height: 350px;
	background: paleturquoise;
	padding: 20px;
}
.title1 {
  font-size: 22px;
  color: #000;
  margin-bottom: 20px;
}
.onefoone{
	padding: 20px 0;
	border-bottom: 1px dashed #ddd;
}
</style>