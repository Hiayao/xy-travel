<template>
  <div>
    <a-form ref="ruleForm" :model="form" :rules="rules" :wrapper-col="wrapperCol">
      <a-form-item ref="username" name="username">
        <a-input v-model:value="form.username" placeholder="昵称" />
      </a-form-item>

      <a-form-item required has-feedback ref="password" name="password">
        <a-input v-model:value="form.password" placeholder="密码" type="password" autocomplete="off" />
      </a-form-item>
    </a-form>
    <a-button type="primary" class="signBtn">注册</a-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import { Rules} from "@/types"
interface Data {
     form: {
    tel: string;
    captchas: string;
    username: string;
    password: string;
    checkPass: string;
  };
  rules: Rules;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
         form: {
        tel: "",
        captchas: "",
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        tel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: "手机号格式不对",
            trigger: ["blur", "change"],
          },
        ],
        captchas: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>