export interface User {
    readonly id: number;
    username: string;
    password?: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    readonly user_type: number;
    readonly classroom?: number;
    readonly course_group: number;
    readonly joined_date?: string;
}
