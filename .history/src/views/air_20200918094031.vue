<template>
 <div class="flex jc">
    <div class="airBox">
        <div class="flex">
            <img src="../assets/airIcon.png" alt="" class="airIcon">
            <div>国内机票</div>
        </div>
    </div>
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
.airBox{
    width: 1000px;
}
.airIcon{
    width: 20px;
    height: 20px;
}
</style>