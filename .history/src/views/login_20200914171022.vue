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
        <a-form ref="ruleForm" :model="form" :rules="rules" :wrapper-col="wrapperCol">
          
          <a-form-item ref="tel" name="tel">
            <a-input v-model:value="form.tel" placeholder="用户手机号" />
          </a-form-item>
          
          <a-form-item ref="captchas" name="captchas">
            <a-input-search v-model:value="form.captchas" placeholder="验证码">
              <template v-slot:enterButton>
                <a-button style="background:#F5F7FA">发送验证码</a-button>
              </template>
            </a-input-search>
          </a-form-item>

          <a-form-item ref="username" name="username">
            <a-input v-model:value="form.username" placeholder="昵称" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import {Rules} from '@/types/index'

interface Data {
  tabList: object[];
  key: number;
  form: {
    tel: string;
    captchas: string;
    username: string;
  };
  rules: Rules;
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
        tel: "",
        captchas: "",
        username: "",
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