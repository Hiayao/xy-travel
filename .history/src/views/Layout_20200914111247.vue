<template>
 <div class="box flex jc">
     <div class="top">
         <div><img src="../assets/logo.jpg" alt="" class="logo"></div>
     </div>
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
// interface Data {
// }
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){

// const data: Data = reactive<Data>({
// })
return {
// ...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>
.top{
    width: 1280px;
    height: 60px;
    background: violet;
}
// .box{
//     width: 100%;
// }
.logo{
    height: 50px;
}
</style>