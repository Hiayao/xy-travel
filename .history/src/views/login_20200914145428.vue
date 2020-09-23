<template>
 <div class="login_All">
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

// let data: Data = reactive<Data>({
// })
return {
// ...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>
.login_All{
    background-image: url('../assets/th03.jpg');
    background-size: 500;
    height: 300px;
}
</style>