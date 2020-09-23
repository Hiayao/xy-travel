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
}
/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword (value: any) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
    return !reg.test(value) ? true : false;
  }