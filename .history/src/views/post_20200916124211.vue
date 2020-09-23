<template>
  <div class="post_All flex jc">
    <div class="postBox flex jsb">
        <div class="postLeft">
            <div class="cityList"></div>
            <div class="recommend"></div>
        </div>
        <div class="postRight"></div>
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
import api from "@/http/api";
import { Rescity,RescityItem } from "@/types";
interface Data {
  cityList: RescityItem[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      cityList: [],
    });

    onMounted(() => {
      api
        .getCityList()
        .then((res: Rescity) => {
          console.log(res);
          data.cityList = res.data
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.post_All {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
.postBox {
  width: 1000px;
  height: 100%;
 
}
.postLeft{
    width: 280px;
    height: 100%;
     background: violet;
}
.postRight{
    width: 680px;
    height: 100%;
    background: yellowgreen;
}
.cityList{
    width: 100%;
    height: 200px;
    background: yellowgreen;
}
.recommend{
width: 100%;
    height: 100px;
    background: rebeccapurple;
}
</style>