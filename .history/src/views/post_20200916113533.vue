<template>
 <div class="post_All jc">
     <div class="postBox"></div>
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
interface Data {
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

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

<style scoped lang='scss'>
.post_All{
    width: 100%;
    height: 500px;
}
.postBox{
    width: 1000px;
    height: 100%;
}
</style>