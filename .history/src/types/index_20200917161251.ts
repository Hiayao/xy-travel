export interface Rules {
    tel?: RuleItem[];
    captchas?: RuleItem[];
    username: RuleItem[];
    password?: RuleItem[];
    checkPass?: RuleItem[];
}
export interface RuleItem {
    required?: boolean;
    message?: string;
    trigger: string | string[];
    pattern?: any;
    validator?: any;
}
export interface UserItem {
    id: number;
    username: string;
    email: any;
    role: number;
    nickname: string;
    starPosts: any;
    defaultAvatar: string;
    createdAt: number;
    updatedAt: number;
}
export interface Res {
    token: string;
    user: UserItem;
}
// 城市菜单列表
export interface childrenItem {
    city: string;
    desc: string;
}
export interface RescityItem {
    type: string;
    children: childrenItem[];
}
export interface Rescity {
    data: RescityItem[];
}
//文章攻略
export interface Account {
    nickname: string;
    defaultAvatar: string;
}
export interface Citys {
    name: string;
}
// export interface CommentsItem {
//     id: number;
//     content: string;
//     level: number;
//     post: 4
//     type: 2
//     created_at: 1558500951618
//     updated_at: 1558500951645
// }
export interface PostItem {
    title: string;
    summary: string;
    images: string[];
    city: Citys;
    account: Account;
    watch: number;
    content?: string;
    updatedAt?: string;
    comments?: object[];
}
export interface PostRes {
    data: PostItem[];
    total: number;
}

//文章评论
export interface Follow {
    id: number;
}
export interface Accounts {
    id: number;
    username: string;
    nickname: string;
    defaultAvatar: string;
    updatedAt: string;
}
export interface DiscussItem {
    id: number;
    account: Accounts;
    content: string;
    follow: Follow;
    level: number;
    updatedAt: number;
    // pics: []
    // parent: 

}
export interface DiscussRes {
    data: DiscussItem[];
    total: number;
}
