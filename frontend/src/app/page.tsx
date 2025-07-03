"use client";

import { useEffect, useState } from "react";

interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export default function Home() {
    const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5014/WeatherForecast"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: WeatherForecast[] = await response.json();
                setForecasts(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Error: {error}</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-8">
                Weather Forecasts
            </h1>
            {forecasts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forecasts.map((forecast, index) => (
                        <div key={index} className=" p-6 rounded-lg shadow-md">
                            <p className="text-lg font-semibold mb-2">
                                Date:{" "}
                                {new Date(forecast.date).toLocaleDateString()}
                            </p>
                            <p>Temperature (C): {forecast.temperatureC}°C</p>
                            <p>Temperature (F): {forecast.temperatureF}°F</p>
                            <p>Summary: {forecast.summary}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    No weather data available.
                </p>
            )}
        </div>
    );
}
