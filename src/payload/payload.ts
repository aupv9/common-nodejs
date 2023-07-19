


interface AbsResponse<T> {
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
