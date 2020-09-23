export interface Rules {
    tel?: RuleItem[];
    captchas?: RuleItem[];
    username: RuleItem[];
    password?: RuleItem[];
}
export interface RuleItem {
    required?: boolean;
    message: string;
    trigger: string | string[];
    pattern?: any;
    validator?: any;
}
/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword(value: any) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
    return !reg.test(value) ? true : false;
}
/* 特殊字符过滤 */
export function strpscript(str: any) {
    var patter = new RegExp(
        "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
    );
    var rs = "";
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.sub(i, 1).replace(patter, "");
    }
    return rs;
}