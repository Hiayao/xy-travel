export interface Rules {
    tel: RuleItem[];
    captchas: RuleItem[];
}
export interface RuleItem {
    required?: boolean;
    message: string;
    trigger: string | string[];
    pattern?: any;
}