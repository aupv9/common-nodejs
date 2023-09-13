


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
    public static of<T>(data: T, message: string = "Success", code: number, success: boolean, timestamp: number = Date.now()): AbsResponse<T> {
        return new AbsResponse<T>(data, message, code, success, timestamp);
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
