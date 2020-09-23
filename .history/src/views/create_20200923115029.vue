<template>
 <div class="flex jc" style="margin-top:20px">
   <div class="createBox">
     <div style="font-size:24px;color:#000">发表新攻略</div>
     <div style="font-size:12px;color:#777">分享你的个人游记，让更多人看到哦！</div>
     <a-input v-model:value="title" placeholder="请输入标题" />
   </div>
 </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, SetupContext} from 'vue'
interface Data {
  path: string;
  title: string;
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
setup(props, ctx: SetupContext){

const data: Data = reactive<Data>({
  path: '/post',
  title: '',
})
return {
...toRefs(data),
}
},
 })
</script>

<style scoped lang='scss'>
.createBox{
  width: 1000px;

}
</style>