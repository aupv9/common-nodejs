


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
}

interface SignUpPayload{
    name: string;
    email: string;
    password: string;
}

export {
    AbsResponse, SignUpPayload
}
