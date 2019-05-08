export interface Content {
    readonly id: number;
    name: string;
    description?: string;
    week: number;
    syllabus: number;


    isValidated?: boolean;
    isChecked?: boolean;
    waitForValidate?: boolean;
    syllabusId?: number;
}
