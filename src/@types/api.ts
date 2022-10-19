export interface ApiError {
	code: string;
	description: string;
}

export interface ApiResponse<T> {
	hasErrors: boolean;
	errors: ApiError[];
	payload: T;
}