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
          <input  v-model="value" placeholder="输入想去的地方,比如成都" class="input"/>
          <SearchOutlined class="SearchOutlined poab"/>
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
import { Rescity, RescityItem } from "@/types";
interface Data {
  cityList: RescityItem[];
	fleg: number;
	value: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      cityList: [],
			fleg: -1,
			value:'',
    });
    const fingerIn = (index: number): void => {
      data.fleg = index;
    };
    const fingerOut = (): void => {
      data.fleg = -1;
    };
    onMounted(() => {
      api
        .getCityList()
        .then((res: Rescity) => {
          console.log(res);
          data.cityList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      fingerIn,
      fingerOut,
    };
  },
});
</script>

<style scoped lang='scss'>
.post_All {
  width: 100%;
  height: 500px;
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
  border: 2px solid orange;
  height: 40px;
  width: 100%;
  padding: 20px;
  &:focus {
    outline: none;
  }
}
.SearchOutlined{
  right:20px;
  bottom: 14px;
  &:hover{
    cursor: pointer;
    color: #000;
  }
}
</style>