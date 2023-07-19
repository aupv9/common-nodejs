


interface AbsResponse<T> {
    data: T;
    message: string;
    code: number;
    success: boolean;
    timestamp: number;
}



export {
    AbsResponse
}
