<template>
 <div class="flex jc" style="margin-top:20px">
     <div class="hotelBox">
         <a-breadcrumb>
            <a-breadcrumb-item>
              <span class="first fw6">酒店</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <span>成都市酒店预订</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div class="flex">
              <a-input v-model:value="value" placeholder="Basic usage" style="width:20%"/>
              <a-range-picker v-model:value="value3" @change="onChange" />
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
.hotelBox{
    width: 1000px;
    height: 1000px;
    background: yellowgreen;
}
</style>