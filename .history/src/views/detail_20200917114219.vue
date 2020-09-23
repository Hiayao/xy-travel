<template>
  <div class="flex jc m1">
    <div class="detailBox flex jsb">
      <div class="leftBox">
        <div class="breadcrumb flex ac">
          <a-breadcrumb>
            <a-breadcrumb-item>
              <span class="first fw6" @click="goPost">旅游攻略</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <span>攻略详情</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </div>
      <div class="rigthBox"></div>
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
import { useRoute,useRouter } from "vue-router";
import api from "@/http/api";
import { PostRes, PostItem } from "@/types";
interface Data {
  id: number;
  detailList: PostItem[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
		const router = useRouter()
    const data: Data = reactive<Data>({
      id: 0,
      detailList: [
        {
          title: "",
          summary: "",
          images: [],
          city: { name: "" },
          account: { nickname: "", defaultAvatar: "" },
          watch: 0,
        },
      ],
    });
    const details = (): void => {
      api
        .PostDetail(data.id)
        .then((res: PostRes) => {
          console.log(res);
          data.detailList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
		};
		const goPost = (): void => {
			router.push('/post')
		}
    onMounted(() => {
      console.log(route.query);
      if (route.query.id) {
        data.id = Number(route.query.id as string);
        details();
      }
    });
    return {
      ...toRefs(data),
			details,
			goPost,
    };
  },
});
</script>

<style scoped lang='scss'>
.detailBox {
  width: 1000px;
  height: 1000px;
  background: orchid;
}
.leftBox {
  width: 690px;
  height: 100%;
  background: palegreen;
}
.rigthBox {
  width: 290px;
  height: 100%;
  background: paleturquoise;
}
.breadcrumb{
	height: 40px;
}
.first{
	color: #000;
	&:hover{
		cursor: pointer;
	}
}
</style>