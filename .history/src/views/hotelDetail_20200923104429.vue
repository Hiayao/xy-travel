<template>
 <div>

 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext,onMounted} from 'vue'
import {useRoute} from 'vue-router'
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
onMounted(() =>{
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