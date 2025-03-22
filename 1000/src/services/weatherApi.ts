const API_URL = 'http://localhost:5165/api';

export interface WeatherData {
    cityName: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
    try {
        console.log(`Fetching weather data for ${city}...`);
        const response = await fetch(`${API_URL}/Weather/city/${city}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City '${city}' not found`);
            }
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Successfully fetched weather data for ${city}:`, data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export async function getHottestCities(): Promise<WeatherData[]> {
    try {
        console.log('Fetching hottest cities...');
        const response = await fetch(`${API_URL}/Weather/hottest`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch hottest cities: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched hottest cities:', data);
        return data;
    } catch (error) {
        console.error('Error fetching hottest cities:', error);
        throw error;
    }
}

export async function getColdestCities(): Promise<WeatherData[]> {
    try {
        console.log('Fetching coldest cities...');
        const response = await fetch(`${API_URL}/Weather/coldest`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch coldest cities: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched coldest cities:', data);
        return data;
    } catch (error) {
        console.error('Error fetching coldest cities:', error);
        throw error;
    }
} 