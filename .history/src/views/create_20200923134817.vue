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
          <div contenteditable="true" class="write" ref="write"></div>
        </div>
        <div class="flex ac">
          <div style="font-size:18px;margin-right:20px">选择城市</div>
          <a-auto-complete
            v-model:value="value"
            :data-source="dataSource"
            style="width: 200px"
            placeholder="搜索游玩城市"
            @select="onSelect"
            @change="onChange"
          />
        </div>
        <div class="flex ac" style="margin:20px 0">
          <a-button type="primary" @click="release">发布</a-button>
          <div style="margin:0 10px">或者</div>
          <div style="color:orange">保存到草稿箱</div>
        </div>
      </div>
      <div class="createTwo">
        <div>草稿箱</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, ref } from "vue";
interface Data {
  path: string;
  title: string;
  value: string;
  dataSource: string[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      path: "/post",
      title: "",
      value: "",
      dataSource: [],
    });
    const writeRef = ref<HTMLDivElement | null>(null);
    const onChange = (): void => {};
    const onSelect = (): void => {};
    const release =(): void => {
      console.log(writeRef);
    }
    return {
      ...toRefs(data),
      writeRef,
      onChange,
      onSelect,
      release
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
.xieBox {
  width: 100%;
  height: 400px;
  border: 1px solid #999;
  margin: 20px 0;
}
.format {
  padding: 20px 10px;
  border-bottom: 1px solid #999;
}
.write {
  width: 100%;
  height: 344px;
  padding: 20px;
  &:focus {
    outline: none;
  }
}
</style>