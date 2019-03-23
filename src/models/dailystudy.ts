import {StudyModel} from "@/models/Study";

export class DailyStudyModel {

    id: number;
    studies: StudyModel[];
    createdDay: string;
    timeStamp: string;
    updated: string;
    isValidated: boolean;
    validateTime : string;
    userId: number;
    validatorUserId: number;

    constructor (dailyStudyResponse: any) {
        this.id = dailyStudyResponse.id;
        this.studies = dailyStudyResponse.studies;
        this.createdDay = dailyStudyResponse.created_day;
        this.timeStamp = dailyStudyResponse.timestamp;
        this.updated = dailyStudyResponse.updated;
        this.isValidated = dailyStudyResponse.is_validated;
        this.validateTime = dailyStudyResponse.validate_time;
        this.userId = dailyStudyResponse.user;
        this.validatorUserId = dailyStudyResponse.validator_user;
    }

}