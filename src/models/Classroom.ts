export interface Classroom {
    readonly id: number;
    readonly created?: Date;
    readonly modified?: Date;
    name: string;
    description?: string;
    area?: number;
    readonly teachers?: Array<number>;
}