<template>
  <div class="login_All flex jc ac">
    <div class="card">
      <div class="cardTop flex">
        <div
          v-for="(item,index) in tabList"
          :key="index"
          class="tabOne flex jc ac"
          @click="choiceOne(index)"
          :class="{'bgd':key === index}"
        >{{item.tab}}</div>
      </div>
      <div v-if="key===0" class="login">111</div>
      <div v-if="key===1" class="login">
        <a-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item ref="username" name="username">
            <a-input v-model:value="form.username" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  tabList: object[];
  key: number;
  form: object;
  rules: object;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      tabList: [
        {
          tab: "登录",
        },
        {
          tab: "注册",
        },
      ],
      key: 0,
      form: {
        username: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      },
    });
    const choiceOne = (index: number): void => {
      data.key = index;
    };
    return {
      ...toRefs(data),
      choiceOne,
    };
  },
});
</script>

<style scoped lang='scss'>
.login_All {
  background-image: url("../assets/th03.jpg");
  background-size: 300;
  height: 750px;
}
.card {
  width: 30%;
  height: 200px;
  background: #fff;
}
.cardTop {
  height: 50px;
  background: rgb(238, 238, 238);
}
.tabOne {
  width: 50%;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
}
.bgd {
  background: #fff;
  color: rgb(255, 165, 0);
  font-weight: 600;
  border-top: 2px solid rgb(255, 165, 0);
}
.login {
  padding: 20px;
}
</style>