import {Study} from "@/models/Study";

export interface DailyStudy {
    readonly id: number;
    studies: Array<Study>;
    readonly created_day?: string;
    readonly timestamp?: Date;
    readonly updated?: Date;
    readonly is_validated?: boolean;
    readonly validate_time?: Date;
    readonly user?: number;
    readonly validator_user?: number;
}