<template>
 <div class="flex jc" style="margin-top:20px">
    <div class="payBox"></div>
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext,onMounted} from 'vue'
import { useRouter,useRoute } from 'vue-router'
interface Data {
    path: string;
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){
    const route = useRoute()
    const router = useRouter()

const data: Data = reactive<Data>({
    path: '/air'
})
onMounted(() => {
    console.log(route.query);
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>
.payBox{
    width: 1000px;
    height: 600px;
    background: olivedrab;
}

</style>