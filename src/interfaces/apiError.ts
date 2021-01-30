export type ApiErrorType = "BadRequest";

export class ApiError extends Error {
        constructor(message: string, public data: any, public type: ApiErrorType) {
                super(message);
        }
}
