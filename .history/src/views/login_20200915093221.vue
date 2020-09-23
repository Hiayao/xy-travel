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
      <!-- 登录 -->
      <div v-if="key===0" class="login">
        <loginIn></loginIn>
      </div>
      <!-- 注册 -->
      <div v-if="key===1" class="login">
        <a-form ref="ruleForm" :model="form" :rules="rules">
          <a-form-item ref="tel" name="tel">
            <a-input v-model:value="form.tel" placeholder="用户手机号" />
          </a-form-item>

          <a-form-item ref="captchas" name="captchas">
            <a-input v-model:value="form.captchas" placeholder="验证码" class="inputOne" />
            <a-button
              style="background:#F5F7FA"
              @click="handleClick"
              v-show="Verification"
              class="fasong"
            >发送验证码</a-button>
            <a-button style="background:#F5F7FA" v-show="!Verification">
              <span>{{timer}}</span>秒后重新获取
            </a-button>
          </a-form-item>

          <a-form-item ref="username" name="username">
            <a-input v-model:value="form.username" placeholder="昵称" />
          </a-form-item>

          <a-form-item required has-feedback ref="password" name="password">
            <a-input
              v-model:value="form.password"
              placeholder="密码"
              type="password"
              autocomplete="off"
            />
          </a-form-item>

          <a-form-item has-feedback ref="checkPass" name="checkPass">
            <a-input
              v-model:value="form.checkPass"
              placeholder="再次输入密码"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
        </a-form>
        <a-button type="primary" class="signBtn" @click="onSubmit">注册</a-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, ref } from "vue";
import { Rules } from "@/types/index";
import { Form, message } from "ant-design-vue";
import loginIn from "@/components/loginIn.vue";
import api from "@/http/api";
interface Data {
  tabList: object[];
  key: number;
  Verification: boolean;
  timer: number;
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
  components: {
    loginIn,
  },
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
      Verification: true,
      timer: 60, //定义初始时间为60s
      key: 0,
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
        ],
      },
    });
    const choiceOne = (index: number): void => {
      data.key = index;
    };
    const handleClick = (): void => {
      if (data.form.tel !== "") {
        data.Verification = false; //点击button改变v-show的状态
        const authTimer = setInterval(() => {
          //定时器设置每秒递减
          data.timer--; //递减时间
          if (data.timer <= 0) {
            data.Verification = true; //60s时间结束还原v-show状态并清除定时器
            data.timer = 60;
            clearInterval(authTimer);
          }
        }, 1000);
        api
          .getCaptchas(Number(data.form.tel))
          .then((res: any) => {
            console.log(res);
            message.success("模拟手机验证码" + res.code);
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }
      if (data.form.tel === "") {
        message.warning("请输入手机号");
      }
    };
    const ruleForm = ref();
    const onSubmit = (): void => {
      console.log(ruleForm.value);
      ruleForm.value
        .validate()
        .then(() => {
          console.log("values", data.form);
        })
        .catch((error: Error) => {
          console.log("error", error);
        });
    };

    return {
      ...toRefs(data),
      choiceOne,
      onSubmit,
      handleClick,
      ruleForm
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
  //   height: 200px;
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
.signBtn {
  width: 100%;
}
.inputOne {
  width: 207px !important;
}
.fasong {
  width: 131px;
}
</style>