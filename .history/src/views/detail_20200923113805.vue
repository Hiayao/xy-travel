<template>
  <div class="flex jc mt1">
    <div class="detailBox flex jsb">
      <div class="leftBox">
        <div class="breadcrumb flex ac">
          <a-breadcrumb>
            <a-breadcrumb-item>
              <span class="first fw6" @click="goPost">旅游攻略</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <span>攻略详情</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div v-for="(item,index) in detailList" :key="index">
          <h1 class="listtitle fw6">{{item.title}}</h1>
          <div class="watchAll flex jfe">
            <div>攻略：{{item.updatedAt}}</div>
            <div class="watch">阅读：{{item.watch}}</div>
          </div>
          <div v-html="item.content"></div>
          <div class="detailIco flex jc">
            <div class="iconOne flex column ac">
              <FormOutlined class="icon" />
              <div>评论({{item.comments.length}})</div>
            </div>
            <div class="flex column ac">
              <ShareAltOutlined class="icon" />
              <div>分享</div>
            </div>
          </div>
        </div>
        <!-- 添加评论 -->
        <div>
          <div class="commentsTitle">评论</div>
          <a-textarea v-model:value="value" placeholder="你想对人家说点什么吗……" :rows="3" class="textarea" />
          <div class="flex jsb">
            <a-upload
              v-model:fileList="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <!-- todo -->
                <loading-outlined v-if="loading" />
                <plus-outlined v-else />
                <!-- <div class="ant-upload-text">Upload</div> -->
              </div>
            </a-upload>
            <a-button type="primary" size="small">提交</a-button>
          </div>
        </div>

        <!-- 已有评论 -->
        <div class="discuss">
          <div v-for="(item,index) in discuss" :key="index" class="discussOne">
            <!-- <div class="flex jsb">
              <div class="flex">
                <a-avatar :src="'http://157.122.54.189:9095' + item.account.defaultAvatar" alt />
                <div>{{item.account.nickname}}</div>
                <div>{{item.updatedAt}}</div>
              </div>
              <div>{{item.level}}</div>
            </div> -->
          
            <treelist :tree="item"></treelist>
          </div>
        </div>
      </div>
      <div class="rigthBox">
        <div class="relevanName">相关攻略</div>
        <div v-for="(item,index) in relevantList" :key="index" class="relevanList flex">
          <img :src="item.images[0]" alt class="img" />
          <div class="titleAll flex column jsb">
            <div class="relevanTitle">{{item.title}}</div>
            <div class="flex">
              <div class="time">{{item.updatedAt}}</div>
              <div>阅读 {{item.watch}}</div>
            </div>
          </div>
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
  ref,Ref
} from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/http/api";
import { PostRes, PostItem, DiscussRes, DiscussItem } from "@/types";
import dayjs from "dayjs";
import Treelist from '@/components/Treelist.vue'
interface Data {
  id: number;
  detailList: PostItem[]; 
  value: string;
  discuss: DiscussItem[];
  relevantList: object[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {Treelist},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      id: 0,
      detailList: [
        {
          title: "",
          summary: "",
          images: [],
          city: { name: "" },
          account: { nickname: "", defaultAvatar: "" },
          watch: 0,
          content: "",
          updatedAt: "",
          comments: [],
        },
      ],
      value: "",
      discuss: [],
      relevantList: [],
    });
    const details = (): void => {
      api
        .PostDetail(data.id)
        .then((res: PostRes) => {
          console.log(res);
          data.detailList = res.data;
          data.detailList.map((item: any) => {
            item.updatedAt = dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm");
            item.content = item.content.replace(
              /<img/g,
              "<img style='max-width:100%;height:auto;'"
            );
          });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };

    //获取文章评论
    const getComments = (): void => {
      api
        .comments({ post: data.id, _limit: 10, _start: 0 })
        .then((res: DiscussRes) => {
          console.log(res);
          data.discuss = res.data;

          // data.discuss.map((item) => {
          //   item.updatedAt = dayjs(item.updatedAt).format("YYYY.MM.DD HH:mm");
          //   if(item.parent){
          //     item.parent.updatedAt = dayjs(item.parent.updatedAt).format("YYYY-MM-DD HH:mm");
          //     if(item.parent.parent){
          //       item.parent.parent.updatedAt = dayjs(item.parent.parent.updatedAt).format("YYYY-MM-DD HH:mm");
          //     }
          //   }
          // });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const num: Ref<number> = ref<number>(1);

    const relevant = (): void => {
      api
        .relevantPost(data.id)
        .then((res) => {
          console.log(res);
          data.relevantList = res.data;
          data.relevantList.map((item: any) => {
            item.images = [
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3331153567,892519749&fm=15&gp=0.jpg",
            ];
            item.updatedAt = dayjs(item.updatedAt).format("YYYY.MM.DD HH:mm");
            if (item.watch === null) {
              item.watch = 0;
            }
          });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const goPost = (): void => {
      router.push("/post");
    };
    onMounted(() => {
      console.log(route.query);
      if (route.query.id) {
        data.id = Number(route.query.id as string);
        details();
        getComments();
        relevant();
      }
    });
    return {
      ...toRefs(data),
      details,
      goPost,
      getComments,
      relevant,
      num
    };
  },
});
</script>

<style scoped lang='scss'>
.detailBox {
  width: 1000px;
}
.leftBox {
  width: 690px;
}
.rigthBox {
  width: 290px;
}
.breadcrumb {
  height: 40px;
}
.first {
  color: #000;
  &:hover {
    cursor: pointer;
  }
}
.icon {
  color: peru;
}
.iconOne {
  margin-right: 20px;
}
.detailIco {
  margin: 20px 0;
}
.commentsTitle {
  font-size: 18px;
  color: #000;
}
.listtitle {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
.watchAll {
  font-size: 16px;
  color: #999;
}
.watch {
  margin: 0 10px 30px 10px;
}
.textarea {
  resize: none;
  margin: 20px 0;
}
.discuss {
  border: 1px solid #ddd;
}
.img {
  width: 100px;
  height: 100px;
}
.relevanName {
  font-size: 18px;
  color: #000;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.relevanList {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.titleAll {
  height: 100px;
  width: 180px;
  margin-left: 10px;
}
.relevanTitle {
  font-size: 20px;
  color: #000;
}
.time {
  margin-right: 10px;
}
.discussOne {
  padding: 20px;
  border-bottom: 1px dashed #ddd;
}
</style>