<template>
 <div class="flex jc" style="margin-top:20px">
    <div class="payBox">
        <div class="flex ac">
            <div>支付总金额</div>
            <div class="total">￥ {{total}}</div>
        </div>
    </div>
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext,onMounted} from 'vue'
import { useRouter,useRoute } from 'vue-router'
interface Data {
    path: string;
    total: string;
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
    path: '/air',
    total: '',
})
onMounted(() => {
    console.log(route.query);
    data.total = route.query.total as string
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
    font-size: 16px;
}
.total{
    font-size: 28px;
    color: red;
}
</style>