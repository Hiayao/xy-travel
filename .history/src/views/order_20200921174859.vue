<template>
  <div class="flex jc" style="margin-top:5px">
    <div class="orderBox flex jsb">
      <div class="BoxOne">
        <div class="onefoone">
          <div class="title1">乘机人</div>
          <div style="margin-bottom:12px">乘机人</div>
          <a-input v-model:value="value" placeholder="请输入乘机人姓名" />
          <div style="margin:12px 0 12px 0">证件类型</div>
          <a-input-group compact>
            <a-select v-model:value="value2" style="width: 20%">
              <a-select-option value="Option1">身份证</a-select-option>
              <a-select-option value="Option2">护照</a-select-option>
            </a-select>
            <a-input style="width: 80%" v-model:value="value3" placeholder="证件号码" />
          </a-input-group>
        </div>
        <div class="btn">
          <a-button type="primary">添加乘客</a-button>
        </div>
        <div class="Insurance">
          <div class="title1">保险</div>
          <div v-for="(item,index) in insurances" :key="index" class="insurances">
            <a-checkbox
              v-model:checked="item.checked"
              @change="onChange(item)"
            >{{item.type}}: ￥{{item.price}}/份x1 最高赔付{{item.compensation}}</a-checkbox>
          </div>
        </div>

        <div class="contacts">
          <div class="title1">联系人</div>
          <a-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
          >
            <a-form-item ref="username" label="姓名" name="username">
              <a-input v-model:value="form.username" />
            </a-form-item>

            <a-form-item ref="tel"  label="手机" name="tel">
              <a-input v-model:value="form.tel" placeholder="请输入手机" class="inputOne" />
              <a-button
                style="background:#F5F7FA"
                @click="handleClick"
                v-show="Verification"
                class="fasong"
              >发送验证码</a-button>
              <a-button style="background:#F5F7FA" v-show="!Verification" disabled>
                <span>{{timer}}</span>秒后重新获取
              </a-button>
            </a-form-item>

            <a-form-item ref="captchas" label="验证码" name="captchas">
              <a-input v-model:value="form.captchas" />
            </a-form-item>
          </a-form>
          <a-button type="primary" class="signBtn" @click="onSubmit">提交订单</a-button>
        </div>
      </div>

      <div class="BoxTwo">
        <div class="Two1">
          <div class="flex jsb" style="font-size:16px; color:#000;margin-bottom:5px">
            <div>{{list.dep_date}}</div>
            <div>{{list.org_city_name}} - {{list.dst_city_name}}</div>
          </div>
          <div class="flex ac jsb">
            <div class="flex column ac">
              <div style="color:#000;font-size:22px">{{list.dep_time}}</div>
              <div>{{list.org_airport_name}}</div>
            </div>
            <div class="flex column ac">
              <div>--- {{duration[0]}}时{{duration[1]}}分 ---</div>
              <div>{{list.airline_name}} {{list.flight_no}}</div>
            </div>
            <div class="flex column ac">
              <div style="color:#000;font-size:22px">{{list.arr_time}}</div>
              <div>{{list.dst_city_name}}</div>
            </div>
          </div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>订单总价</div>
          <div>金额</div>
          <div>数量</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>成人机票</div>
          <div>￥{{price}}</div>
          <div>X 1</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div>机建+燃油</div>
          <div>￥{{list.airport_tax_audlet}}/人/单程</div>
          <div>X 1</div>
        </div>
        <div class="Two2 flex jsb ac">
          <div style="font-size:14px">应付总额</div>
          <div style="font-size:28px;color:orange">￥{{price*1+list.airport_tax_audlet*1+30*num}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/http/api";
import { AirFlights } from "@/types";
import { Form, message } from "ant-design-vue";
import { Rules } from "@/types/index";
interface Data {
  id: number;
  value: string;
  value2: string;
  value3: string;
  list: object;
  duration: string[];
  price: number;
  insurances: object[];
  num: number; //保险数量
  numlist: string[];
  form: {
    username: string;
    captchas: string;
    tel: string;
  };
  Verification: boolean;
  tel: string;
  timer: number;
  code: string;
  rules: Rules;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      id: 0,
      value: "",
      value2: "Option1",
      value3: "",
      list: {},
      duration: [],
      price: 0,
      insurances: [],
      num: 0,
      numlist: [],
      form: {
        username: "",
        captchas: "",
        tel: "",
      },
      Verification: true,
      timer: 30,
      tel: "",
      code: "",
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
    const getAir = (): void => {
      api
        .getAirs(data.id)
        .then((res: any) => {
          console.log(res);
          data.list = res;
          data.insurances = res.insurances;
          data.insurances.map((item: any, index: number) => {
            item.checked = false;
            if (index === 1) {
              item.compensation = item.compensation + "元";
            }
          });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const onChange = (item: any): void => {
      // console.log(`checked = ${e.target.checked}`);
      data.numlist = [];
      console.log(item);
      console.log(data.insurances);
      data.insurances.map((item1: any) => {
        if (item1.checked === true) {
          data.numlist.push(item1.checked);
        }
      });
      data.num = data.numlist.length;
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
          .getCaptchas(data.form.tel)
          .then((res: any) => {
            console.log(res);
            message.success("模拟手机验证码" + res.code);
            data.code = res.code;
            data.tel = res.tel;
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
      // console.log(ruleForm.value);
      ruleForm.value
        .validate()
        .then(() => {
          console.log("values", data.form);
          if (data.form.captchas !== data.code) {
            message.error("验证码输入不正确");
          } 
        })
        .catch((error: Error) => {
          console.log("error", error);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.id = Number(route.query.id as string);
      data.duration = JSON.parse(route.query.duration as string);
      data.price = Number(route.query.price as string);
      getAir();
    });
    return {
      ...toRefs(data),
      getAir,
      onChange,
      handleClick,
			onSubmit,
			ruleForm
    };
  },
});
</script>

<style scoped lang='scss'>
.orderBox {
  width: 1000px;
  height: 1000px;
}
.BoxOne {
  width: 560px;
  height: 100%;
  background: palegoldenrod;
}
.BoxTwo {
  width: 400px;
  height: 278px;
  border: 1px solid #ddd;
}
.title1 {
  font-size: 22px;
  color: #000;
  margin-bottom: 20px;
}
.onefoone {
  padding: 20px 0;
  border-bottom: 1px dashed #ddd;
}
.Two1 {
  padding: 20px;
  border-bottom: 1px dashed #ddd;
  font-size: 12px;
  color: #999;
}
.Two2 {
  font-size: 14px;
  color: #666;
  padding: 5px 20px;
  border-bottom: 1px dashed #ddd;
}
.btn {
  padding: 40px 0 20px 0;
  border-bottom: 1px dashed #ddd;
}
.Insurance {
  padding: 10px 0 0 0;
  border-bottom: 1px dashed #ddd;
}
.insurances {
  padding: 8px;
  width: 310px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  border-radius: 5px;
  color: #000;
}
.contacts {
  padding: 20px;
}
.signBtn{
	width: 50%;
	height: 42px;
	margin-left: 25%;
	background: orange;
	margin-top: 20px;
	border: none;
}
</style>