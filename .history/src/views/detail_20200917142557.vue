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
          <div>{{item.title}}</div>
          <div class="flex">
            <div>攻略：{{item.updatedAt}}</div>
            <div>阅读：{{item.watch}}</div>
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
        <!-- 评论 -->
        <div>
					<div class="commentsTitle">评论</div>
				</div>
      </div>
      <div class="rigthBox"></div>
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
import api from "@/http/api";
import { PostRes, PostItem } from "@/types";
import dayjs from "dayjs";
interface Data {
  id: number;
  detailList: PostItem[];
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
    const goPost = (): void => {
      router.push("/post");
    };
    onMounted(() => {
      console.log(route.query);
      if (route.query.id) {
        data.id = Number(route.query.id as string);
        details();
      }
    });
    return {
      ...toRefs(data),
      details,
      goPost,
    };
  },
});
</script>

<style scoped lang='scss'>
.detailBox {
  width: 1000px;
  background: orchid;
}
.leftBox {
  width: 690px;
  background: palegreen;
}
.rigthBox {
  width: 290px;
  background: paleturquoise;
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
.detailIco{
	margin: 20px 0;
}
.commentsTitle{
	font-size: 18px;
	color: #000;
}
</style>