<template>
  <div class="flex jc">
      <div class="detailBox"></div>
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
import { useRoute } from "vue-router";
import api from '@/http/api'
import { PostRes,PostItem } from "@/types";
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
        api.PostDetail(data.id).then((res: PostRes) => {
            console.log(res);
            data.detailList = res.data
        }).catch((err: Error) => {
            console.log(err);
        })
    }
    onMounted(() => {
      console.log(route.query);
      if(route.query.id){
          data.id = Number(route.query.id as string)
          details()
      }
    });
    return {
      ...toRefs(data),
      details,
    };
  },
});
</script>

<style scoped lang='scss'>
.detailBox{
    width: 1000px;
    height: 1000px;
    background: orchid;
}
</style>