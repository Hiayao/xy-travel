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
export interface Parent {
    id: number;
    username: string;
    nickname: string;
    defaultAvatar: string;
    updatedAt: string;
    parent?: Parent;
}
export interface DiscussItem {
    id: number;
    account: Accounts;
    content: string;
    follow: Follow;
    level: number;
    updatedAt: string;
    // pics: []
    parent?: Parent;

}
export interface DiscussRes {
    data: DiscussItem[];
    total: number;
}
//机票列表
export interface AirOptions {
    airport: string[];
    flightTimes: object[];
    company: string[];
}
// export interface Airorders {
//     data: DiscussItem[];
//     total: number;
// }
export interface PolicyInfo {
    id: string;
    type: string;
    seat_type: number;
    invoice_type: number;
}
export interface ProvisionInfo {
    refund_text: string;
    rebook_text: string;
    endorse_text: string;
    luggage_text: string;
}
export interface SeatInfos {
    ota_id: number;
    flight_no: string;
    code: string;
    nums: string;
    fareitem_id: string;
    supplierName: string;
    supplierIATANumber: string;
    class: string;
    name: string;
    group_name: string;
    package_name: string;
    par_price: number;
    type: number;
    settle_price: number;
    org_settle_price: number;
    settle_price_coupon: number;
    org_settle_price_coupon: number;
    settle_price_child: number;
    org_settle_price_child: number;
    code_child: string;
    provision_info: ProvisionInfo;
    policy_info: PolicyInfo;
    tag_name: number;
    discount: number;
    index: number;
    seat_xid: string;
}
export interface AirFlights {
    id: number;
    org_city_name: string;
    dst_city_name: string;
    airline_name: string;
    airport_tax_audlet: number;
    airport_tax_child: number;
    base_price: number;
    dst_airport: string;
    dst_airport_name: string;
    dst_airport_quay: string;
    flight_no: string;
    org_airport: string;
    org_airport_name: string;
    org_airport_quay: string;
    plane_name: string;
    plane_size: string;
    seat_infos: SeatInfos[];
    // airorders: Airorders;
    flights: null;
    arr_date: string;
    dep_date: string;
    arr_datetime: string;
    arr_time: string;
    dep_datetime: string;
    dep_time: string;
    createdAt: number;
    updatedAt: number;
}
export interface AirInfos {
    departCity: string;
    destCity: string;
    departDate: string;
}
export interface AirsRes {
    info: AirInfos;
    flights: AirFlights[];
    total: number;
    options: AirOptions;
}
