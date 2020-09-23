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
export interface PostItem {
    title: string;
    content: string;
}
export interface PostRes {
    data: PostItem[];
    total: number;
}