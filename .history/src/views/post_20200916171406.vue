<template>
  <div class="post_All flex jc">
    <div class="postBox flex jsb">
      <div class="postLeft">
        <div class="cityList pore">
          <div
            v-for="(item,index) in cityList"
            :key="index"
            class="listItem flex jsb ac"
            :class="{'borderTop':index ===3}"
            @mouseenter="fingerIn(index)"
            @mouseleave="fingerOut"
          >
            <div>{{item.type}}</div>
            <div>
              <RightOutlined class="RightOutlined" />
            </div>
            <div class="tiao poab" v-if="fleg === index"></div>
            <div class="hot poab" v-if="fleg === index">
              <div
                v-for="(item1,index1) in item.children"
                :key="index1"
                class="childrenItem flex ac"
              >
                <div class="index">{{index1 + 1}}</div>
                <div class="cityName">{{item1.city}}</div>
                <div class="cityDesc">{{item1.desc}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="recommendCity flex ac">推荐城市</div>
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt class="recommendImg" />
        </div>
      </div>
      <div class="postRight">
        <div class="pore">
          <input v-model="value" placeholder="输入想去的地方，比如：‘成都’" class="input" />
          <SearchOutlined class="SearchOutlined poab" />
        </div>
        <div class="proposal flex ac">
          <div>推荐：</div>
          <div v-for="(item,index) in proposal" :key="index" class="proposalItem">{{item}}</div>
        </div>
        <div class="news flex jsb">
          <div class="StrategyTitle">推荐攻略</div>
          <div>
            <a-button type="primary" size="large">
              <template v-slot:icon>
                <EditOutlined />
              </template>写游记
            </a-button>
          </div>
        </div>

        <div v-for="(item,index) in postsList.slice(0,4)" :key="index" class="postsList">
          <div v-if="index%2===0">
            <div class="title">{{item.title}}</div>
            <div class="summary">{{item.summary}}</div>
            <div class="flex jsb">
              <div v-for="(item1,index1) in item.images.slice(0,3)" :key="index1" class="imgAll">
                <img :src="item1" alt class="images" />
              </div>
            </div>
            <div class="nameAll flex ac jsb">
              <EnvironmentOutlined />
              <div>{{item.city.name}}</div>
              <div>by</div>
              <img
                :src="'http://157.122.54.189:9095'+item.account.defaultAvatar"
                alt
                class="defaultAvatar bdrr50"
              />
              <div class="nickname">{{item.account.nickname}}</div>
              <EyeOutlined />
              <div>{{item.watch}}</div>
            </div>
          </div>

          <div v-if="index%2===1" class="flex">
            <img :src="item.images[0]" alt class="imagesTwo" />
            <div class="newsAll">
              <div class="title thidden-one">{{item.title}}</div>
              <div class="summary">{{item.summary}}</div>
              <div class="nameAll flex ac jsb">
                <EnvironmentOutlined />
                <div>{{item.city.name}}</div>
                <div>by</div>
                <img
                  :src="'http://157.122.54.189:9095'+item.account.defaultAvatar"
                  alt
                  class="defaultAvatar bdrr50"
                />
                <div>{{item.account.nickname}}</div>
                <EyeOutlined />
                <div>{{item.watch}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页器 -->
        <div>
          <a-pagination
            :total="total"
            :show-total="total => `共 ${total} 条`"
            :page-size="20"
            v-model:current="current"
            show-size-changer
            @showSizeChange="onShowSizeChange"
          >
            <!-- <template v-slot:buildOptionText="props">
              <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
              <span v-else>全部</span>
            </template> -->
          </a-pagination>
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
} from "vue";
import api from "@/http/api";
import { Rescity, RescityItem, PostRes, PostItem } from "@/types";
interface Data {
  cityList: RescityItem[];
  fleg: number;
  value: string;
  proposal: string[];
  city: number | string;
  postsList: PostItem[];
  total: number;
  current: number;
  pageSize: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      cityList: [],
      fleg: -1,
      value: "",
      proposal: ["北京", "上海", "成都"],
      city: "北京",
      postsList: [
        {
          title: "",
          summary: "",
          images: [],
          city: { name: "" },
          account: { nickname: "", defaultAvatar: "" },
          watch: 0,
        },
      ],
      total: 0,
      current: 1,
      pageSize: 3,
    });
    const fingerIn = (index: number): void => {
      data.fleg = index;
    };
    const fingerOut = (): void => {
      data.fleg = -1;
    };
    const getPost = (): void => {
      api
        .getPosts(data.city)
        .then((res: PostRes) => {
          console.log(res);
          // data.postsList = res.data;
          // data.total = res.total;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const onShowSizeChange = (current: number, pageSize: number): void => {
      console.log(current, pageSize);
    };
    onMounted(() => {
      // 城市菜单列表
      api
        .getCityList()
        .then((res: Rescity) => {
          console.log(res);
          data.cityList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
      //文章列表
      // getPost();
      api.getPostAll().then((res: PostRes) => {
        console.log(res);
        data.postsList = res.data;
        data.total = res.total;
      });
    });
    return {
      ...toRefs(data),
      fingerIn,
      fingerOut,
      getPost,
      onShowSizeChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.post_All {
  width: 100%;
  // height: 500px;
  margin-top: 20px;
}
.postBox {
  width: 1000px;
  height: 100%;
}
.postLeft {
  width: 280px;
  height: 100%;
}
.postRight {
  width: 680px;
  height: 100%;
  background: yellowgreen;
}
.cityList {
  width: 100%;
  color: #000;
}
.recommend {
  width: 100%;
  color: #000;
}
.listItem {
  width: 100%;
  height: 50px;
  border: 1px solid #c9c9c9;
  background: #fff;
  padding: 0 20px;
  border-bottom: none;
  &:hover {
    color: rgb(255, 165, 0);
    border-right: 1px solid #fff;
    .RightOutlined {
      color: rgb(255, 165, 0);
    }
  }
}
.RightOutlined {
  color: #999;
}
.recommendCity {
  height: 50px;
  border-bottom: 1px solid #c9c9c9;
  font-size: 16px;
  margin-bottom: 10px;
}
.recommendImg {
  width: 100%;
  height: 180px;
}
.borderTop {
  border-bottom: 1px solid #c9c9c9;
}
.hot {
  width: 330px;
  height: 250px;
  background: #fff;
  left: 279px;
  top: 0;
  border: 1px solid #c9c9c9;
  z-index: 1;
}
.childrenItem {
  width: 100%;
  height: 50px;
  padding: 20px;
}
.index {
  font-size: 24px;
  font-style: italic;
}
.cityName {
  margin: 0 10px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.cityDesc {
  color: rgb(83, 83, 83);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.tiao {
  width: 1px;
  height: 50px;
  background: #fff;
  right: 0px;
  z-index: 2;
}
.input {
  border: 5px solid orange;
  height: 40px;
  width: 100%;
  padding: 20px;
  &:focus {
    outline: none;
  }
}
.SearchOutlined {
  right: 20px;
  bottom: 14px;
  &:hover {
    cursor: pointer;
    color: #000;
  }
}
.proposal {
  font-size: 12px;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
}
.proposalItem {
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    color: orange;
    text-decoration: underline;
  }
}
.StrategyTitle {
  height: 40px;
  border-bottom: 1px solid orange;
  font-size: 18px;
}
.news {
  border-bottom: 1px solid #c9c9c9;
}
.imgAll {
  width: 31%;
  height: 150px;
  margin-bottom: 10px;
}
.images {
  width: 100%;
  height: 150px;
  &:hover {
    cursor: pointer;
  }
}
.summary {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
}
.defaultAvatar {
  width: 20px;
  height: 20px;
}
.nameAll {
  width: 250px;
}
.postsList {
  padding: 20px 0;
  border-bottom: 1px solid #c9c9c9;
}
.title {
  font-size: 18px;
  color: #000;
  &:hover {
    cursor: pointer;
    color: orange;
  }
}
.imagesTwo {
  width: 211px;
  height: 150px;
}
.newsAll {
  padding: 0 10px;
}
.nickname {
  color: orange;
}
</style>