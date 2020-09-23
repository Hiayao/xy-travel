<template>
 <div>

 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import api from '@/http/api'
interface Data {
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){
const route = useRoute()
const data: Data = reactive<Data>({
})
// const getAirList = (): void => {
//     api.airList().then((res) => {
//         console.log(res);
//     }).catch((err: Error) => {
//         console.log(err);
//     })
// }
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

</style>