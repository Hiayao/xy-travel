<template>
 <div>
 <!-- 使用 -->
   <hotel-all></hotel-all>
 </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
import HotelAll from '@/components/hotelAll/HotelAll.vue'
interface Data {
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {
       HotelAll,//注册

   },
setup(props, ctx: SetupContext){

let data: Data = reactive<Data>({
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang="scss">

</style>