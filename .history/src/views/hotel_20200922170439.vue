<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="hotelBox">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <span class="first fw6">酒店</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>成都市酒店预订</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex" style="margin:20px 0">
        <a-input v-model:value="city" placeholder="切换城市" style="width:20%;height: 42px;" />
        <a-range-picker v-model:value="time" @change="onChange" style="width:30%;margin:0 10px;" />
        <div style="width:20%;margin-right:10px">
          <a-input placeholder="人数未定" v-model:value="userName" ref="userNameInput">
            <template v-slot:suffix>
              <a-tooltip title="Extra information">
                <user-outlined type="user" />
              </a-tooltip>
            </template>
          </a-input>
        </div>
        <a-button type="primary" style="height: 42px;">查看价格</a-button>
      </div>

			<div></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext,onMounted } from "vue";
import api from '@/http/api'
import {useRoute,useRouter} from 'vue-router'
interface Data {
	city: string;
	value: string;
	id: number;
	time: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
		const route = useRoute()
		const router = useRouter()
		const data: Data = reactive<Data>({
			city: '',
			value: '',
			id: 0,
			time: '',
		});
		const getCity = (): void => {
			api.getCities(data.value).then((res) => {
				console.log(res);
			}).catch((err: Error) => {
				console.log(err);
			})
		}
		const onChange = (): void => {

		}
		onMounted(() => {
			console.log(route.query);
			if(route.query.keyword){
				data.value = route.query.keyword as string
				getCity()
			}
			api.searchCity(239).then((res) => {
				console.log(res);
			}).catch((err: Error) => {
				console.log(err);
			})
		})
    return {
			...toRefs(data),
			getCity,
			onChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.hotelBox {
  width: 1000px;
  height: 1000px;
  background: yellowgreen;
}
</style>