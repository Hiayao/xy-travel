<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="createBox flex jsb">
      <div class="createOne">
        <div style="font-size:24px;color:#000">发表新攻略</div>
        <div style="font-size:13px;color:#777;margin:10px 0">分享你的个人游记，让更多人看到哦！</div>
        <a-input v-model:value="title" placeholder="请输入标题" />
        <div class="xieBox">
          <div class="format">
            <div class="flex jsb" style="width:300px">
            <BoldOutlined />
            <ItalicOutlined />
            <UnderlineOutlined />
            <StrikethroughOutlined />
            <SortAscendingOutlined />
            <SortDescendingOutlined />
            <AreaChartOutlined />
            </div>
          </div>
          <div contenteditable="true" class="write"></div>
        </div>
      </div>
      <div class="createTwo">
        <div>草稿箱</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  path: string;
  title: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      path: "/post",
      title: "",
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.createBox {
  width: 1000px;
}
.createOne {
  width: 740px;
}
.createTwo {
  width: 240px;
}
.xieBox{
  width: 100%;
  height: 400px;
  border: 1px solid #999;
  margin: 20px 0;
}
.format{
  padding: 20px 10px;
  border-bottom: 1px solid #999;
}
.write{
  width: 100%;
  height: 344px;
  &:focus{
    border: none;
  }
}
</style>