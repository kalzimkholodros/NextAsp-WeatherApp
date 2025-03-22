# Weather Application

A modern, full-stack weather application that provides real-time weather data for cities worldwide, featuring a beautiful UI and comprehensive weather information.


![Ekran görüntüsü 2025-03-22 035705](https://github.com/user-attachments/assets/6e852f67-e759-4fd1-b378-d3645bf88f85)


## Architecture Overview

```mermaid
graph TB
    subgraph Frontend[Next.js Frontend]
        UI[User Interface]
        State[React State Management]
        API[API Service Layer]
    end

    subgraph Backend[ASP.NET Core Backend]
        Auth[Authentication API]
        Weather[Weather API]
    end

    subgraph External[External Services]
        OWM[OpenWeatherMap API]
    end

    UI --> State
    State --> API
    API --> Auth
    API --> Weather
    Auth --> OWM
    Weather --> OWM
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthAPI
    participant WeatherAPI
    participant OpenWeatherMap

    User->>Frontend: Access Application
    Frontend->>AuthAPI: Request Authentication
    AuthAPI-->>Frontend: Authentication Response

    User->>Frontend: Search City
    Frontend->>WeatherAPI: Request Weather Data
    WeatherAPI->>OpenWeatherMap: Fetch Weather Data
    OpenWeatherMap-->>WeatherAPI: Weather Response
    WeatherAPI-->>Frontend: Processed Weather Data
    Frontend-->>User: Display Weather Information

    Note over Frontend,WeatherAPI: Background Tasks
    Frontend->>WeatherAPI: Fetch Hottest Cities
    WeatherAPI->>OpenWeatherMap: Request Multiple Cities
    OpenWeatherMap-->>WeatherAPI: Cities Data
    WeatherAPI-->>Frontend: Processed Cities Data

    Frontend->>WeatherAPI: Fetch Coldest Cities
    WeatherAPI->>OpenWeatherMap: Request Multiple Cities
    OpenWeatherMap-->>WeatherAPI: Cities Data
    WeatherAPI-->>Frontend: Processed Cities Data
```

## API Structure

```mermaid
graph LR
    subgraph Frontend[Frontend API Layer]
        Auth[Auth API]
        Weather[Weather API]
    end

    subgraph Backend[Backend Controllers]
        AuthController[Auth Controller]
        WeatherController[Weather Controller]
    end

    Auth --> AuthController
    Weather --> WeatherController

    AuthController --> |Port 5286| AuthService[Auth Service]
    WeatherController --> |Port 5165| WeatherService[Weather Service]
```

## Features

- Real-time weather data for any city worldwide
- Display of hottest and coldest cities
- Detailed weather information including:
  - Temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Weather description
- Responsive design with Material-UI
- Client-side state management
- Error handling and loading states

## Technical Stack

### Frontend
- Next.js
- React
- Material-UI
- TypeScript
- React Hooks

### Backend
- ASP.NET Core Web API
- C#
- OpenWeatherMap API Integration
- CORS Support

### Development Tools
- TypeScript
- ESLint
- Prettier
- Git

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd 1000
   npm install

   # Backend
   cd 1000.API
   dotnet restore
   ```

3. Set up environment variables:
   - Create `.env.local` in the frontend directory
   - Add OpenWeatherMap API key to backend configuration

4. Run the application:
   ```bash
   # Frontend
   npm run dev

   # Backend
   dotnet run
   ```

## API Endpoints

### Authentication API (Port 5286)
- POST `/api/auth/login`
- POST `/api/auth/register`

### Weather API (Port 5165)
- GET `/api/Weather/city/{cityName}`
- GET `/api/Weather/hottest`
- GET `/api/Weather/coldest`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
