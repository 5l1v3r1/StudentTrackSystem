export interface CourseGroup {
    readonly id: number;
    name: string;
    description?: string;
    courses: Array<number>;
}
