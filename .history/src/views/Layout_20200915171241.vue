<template>
  <div class="layout pore">
    <div class="Top_box flex jc">
      <!-- 头部导航 -->
      <div class="top flex jsb ac">
        <div class="flex ac">
          <img src="../assets/logo.jpg" alt class="logo" @click="goHome" />
          <div
            v-for="(item,index) in topNav"
            :key="index"
            class="navOne flex ac column pore"
            :class="{'colour':fleg===index,'bgd':flag ===index}"
            @mouseenter="finger(index)"
            @mouseleave="fingerOut"
            @click="choiceOne(item,index)"
          >
            <div class="ItemName flex ac">{{item.name}}</div>
            <div class="border poab" v-if="fleg === index"></div>
          </div>
        </div>
        <div class="login" @click="goLogin" v-if="user.nikename === ''">登录 / 注册</div>
        <a-popover>
          <template v-slot:content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <div class="user flex ac" @click="user" v-if="user.nikename !== ''">
            <img
              :src="'http://157.122.54.189:9095' +user.defaultAvatar"
              alt
              class="defaultAvatar bdrr50"
            />
            <div class="nickname flex ac">{{user.nickname}}</div>
            <div class="jian flex ac">
              <CaretDownOutlined />
            </div>
          </div>
        </a-popover>
      </div>
    </div>

    <router-view></router-view>

    <!-- 底部公共 -->
    <div class="bottom_box poab flex jc">
      <div class="bottom">
        <div class="btOne flex">
          <div class="oneLeft flex jsb">
            <div v-for="(item,index) in linkList" :key="index" class="Listone">
              <div class="title">{{item.title}}</div>
              <div>
                <div v-for="(item1,index1) in item.itemOne" :key="index1" class="itemOne">{{item1}}</div>
              </div>
            </div>
          </div>
          <div class="oneRight flex jc ac column">
            <img src="../assets/1556522965.png" alt class="img" />
            <div>关注我们</div>
          </div>
        </div>
        <div
          class="btTwo flex jc ac"
        >京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</div>
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
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserItem } from "@/types";
interface Data {
  topNav: object[];
  fleg: number;
  flag: number;
  linkList: object[];
  user: UserItem;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      topNav: [
        { name: "首页", path: "/" },
        { name: "旅游攻略", path: "/post" },
        { name: "酒店", path: "/hotel" },
        { name: "国内机票", path: "/air" },
      ],
      fleg: -1,
      flag: -1,
      user: {
        id: 0,
        username: "",
        email: null,
        role: 0,
        nickname: "",
        starPosts: null,
        defaultAvatar: "",
        createdAt: 0,
        updatedAt: 0,
      },
      linkList: [
        {
          title: "闲云旅游旅游网",
          itemOne: [
            "上亿旅行者共同打造的旅行神器",
            "60,000 多个全球旅游目的地",
            "600,000 个细分目的地新玩法",
            "760,000,000 次攻略下载",
            "38,000 家旅游产品供应商",
          ],
        },
        {
          title: "关于我们",
          itemOne: [
            "隐私政策 商标声明",
            "服务协议 游记协议",
            "商城平台服务协议",
            "网络信息侵权通知指引",
            "闲云旅游旅游网服务监督员",
            "网站地图加入闲云旅游",
          ],
        },
        {
          title: "旅行服务",
          itemOne: [
            "旅游攻略 酒店预订",
            "旅游特价 国际租车",
            "旅游问答 旅游保险",
            "旅游指南 订火车票",
            "旅游资讯 APP下载",
          ],
        },
      ],
    });

    const finger = (index: number): void => {
      data.fleg = index;
    };
    const fingerOut = (): void => {
      data.fleg = -1;
    };
    const choiceOne = (item: any, index: number): void => {
      data.flag = index;
      router.push(item.path);
    };
    const goLogin = (): void => {
      router.push("/login");
    };
    const goHome = (): void => {
      router.push("/");
    };
    onMounted(() => {
      if (localStorage.getItem("user")) {
        data.user = JSON.parse(localStorage.getItem("user")!);
      }
    });
    return {
      ...toRefs(data),
      finger,
      fingerOut,
      choiceOne,
      goLogin,
      goHome,
    };
  },
});
</script>

<style scoped lang='scss'>
.Top_box {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
}
.top {
  width: 1000px;
  height: 60px;
}
.logo {
  height: 50px;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
  }
}
.navOne {
  padding: 0 20px;
  font-size: 16px;
  color: #000;
  height: 60px;
  &:hover {
    cursor: pointer;
  }
}
.colour {
  color: rgb(64, 158, 255);
}
.border {
  width: 100%;
  height: 6px;
  background: rgb(64, 158, 255);
  bottom: 0;
}
.ItemName {
  height: 100%;
}
.bottom_box {
  width: 100%;
  height: 340px;
  background: rgb(51, 51, 51);
}
.bgd {
  background: rgb(64, 158, 255);
  color: #fff;
}
.bottom {
  width: 1100px;
  height: 340px;
}
.btOne {
  height: 240px;
  padding: 0 50px;
}
.btTwo {
  height: 100px;
  color: #ccc;
  border-top: 1px solid #ccc;
}
.oneLeft {
  width: 700px;
  height: 100%;
  font-size: 12px;
  color: #ccc;
}
.img {
  width: 160px;
  height: 160px;
  margin-bottom: 5px;
}
.oneRight {
  width: 300px;
  height: 100%;
  color: #ccc;
  font-size: 12px;
}
.title {
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.Listone {
  width: 200px;
}
.itemOne {
  margin-bottom: 6px;
}
.yellow {
  color: yellowgreen;
}
.login:hover {
  cursor: pointer;
  color: rgb(64, 158, 255);
  text-decoration: underline;
}
.defaultAvatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.user {
  font-size: 16px;
  &:hover {
    cursor: pointer;
    .defaultAvatar {
      border: 2px solid skyblue;
    }
  }
}
.nickname {
  height: 40px;
  margin-right: 4px;
}
.jian {
  height: 40px;
}
</style>