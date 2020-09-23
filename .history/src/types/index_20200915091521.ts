export interface Rules {
    tel?: RuleItem[];
    captchas?: RuleItem[];
    username: RuleItem[];
    password?: RuleItem[];
}
export interface RuleItem {
    required?: boolean;
    message?: string;
    trigger: string | string[]; 
    pattern?: any;
    validator?: any;
}
