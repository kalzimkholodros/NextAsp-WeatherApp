const API_URL = 'http://localhost:5286/api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface ApiResponse {
    message: string;
}

export interface ApiError {
    message: string;
}

export const login = async (data: LoginRequest): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
};

export const register = async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || 'Registration failed');
    }

    return response.json();
}; 