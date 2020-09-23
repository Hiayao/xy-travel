<template>
  <div>
    <a-form ref="ruleForm" :model="form" :rules="rules" >
      <a-form-item ref="username" name="username">
        <a-input v-model:value="form.username" placeholder="昵称" />
      </a-form-item>

      <a-form-item required has-feedback ref="password" name="password">
        <a-input v-model:value="form.password" placeholder="密码" type="password" autocomplete="off" />
      </a-form-item>
    </a-form>
    <a-button type="primary" class="signBtn" @click="login">登录</a-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import { Rules} from "@/types"
import api from '@/http/api.ts'
interface Data {
     form: {
    username: string;
    password: string;
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
        username: "",
        password: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
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
    const login = (): void => {
      api.login({username: data.form.username, password: data.form.password }).then((res: any) => {
        console.log(res);
      }).catch((err: Error) =>{
        console.log(err);
      })
    }
    return {
      ...toRefs(data),
      login
    };
  },
});
</script>

<style scoped lang='scss'>
.signBtn {
  width: 100%;
}
</style>