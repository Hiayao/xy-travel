<template>
 <div >

 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
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

const data: Data = reactive<Data>({
  path: '/post'
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>

</style>