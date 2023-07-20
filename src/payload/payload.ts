


class AbsResponse<T> {
    constructor(data: T, message: string, code: number, success: boolean, timestamp: number) {
        this.data = data;
        this.message = message;
        this.code = code;
        this.success = success;
        this.timestamp = timestamp;
    }
    data: T;
    message: string;
    code: number;
    success: boolean;
    timestamp: number;
    public static of(data: any, message: string = "Success", code: number, success: boolean, timestamp: number = Date.now()) {
        return new AbsResponse(data, message, code, success, timestamp);
    }
}

interface SignUpPayload{
    name: string;
    email: string;
    password: string;
}

export {
    AbsResponse, SignUpPayload
}
