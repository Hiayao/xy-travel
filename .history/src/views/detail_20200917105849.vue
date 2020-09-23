<template>
  <div></div>
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
interface Data {
    id: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();

    const data: Data = reactive<Data>({
        id: 0,
    });
    const details = (): void => {
        api.PostDetail(data.id).then((res) => {
            console.log(res);
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
</style>