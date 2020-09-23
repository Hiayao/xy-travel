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
      <div class="flex" style="margin-top:20px">
        <a-input v-model:value="value" placeholder="切换城市" style="width:20%;height: 42px;" />
        <a-range-picker v-model:value="value3" @change="onChange" style="width:30%;margin:0 10px;" />
        <div style="width:20%;margin-right:10px">
        <a-input placeholder="人数未定" v-model:value="userName" ref="userNameInput">
          <template v-slot:suffix>
            <a-tooltip title="Extra information">
              <user-outlined type="user" />
            </a-tooltip>
          </template>
        </a-input></div>
        <a-button type="primary" style="height: 42px;">查看价格</a-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.hotelBox {
  width: 1000px;
  height: 1000px;
  background: yellowgreen;
}
</style>