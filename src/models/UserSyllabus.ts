
export interface UserSyllabus {
    readonly id: number;
    content: number;
    readonly is_validated?: boolean;
    readonly validate_time?: Date;
    validator_user?: number;
}
