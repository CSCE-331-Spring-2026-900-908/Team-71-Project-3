// This work is dedicated to the Holy Family. Jesus, I trust in You

// Almost all work copied form the set up guide on open meteo weather website

import { fetchWeatherApi } from "openmeteo";


export async function GET(request: Request) {
  try {

    const params = {
      latitude: 30.628,
      longitude: -96.3344,
      daily: ["temperature_2m_max", "temperature_2m_min"],
      current: ["temperature_2m", "apparent_temperature", "is_day", "cloud_cover"],
      timezone: "America/Chicago",
      wind_speed_unit: "mph",
      temperature_unit: "fahrenheit",
      precipitation_unit: "inch",
    };
    const url = "https://my-server.tld/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
      `\nCoordinates: ${latitude}°N ${longitude}°E`,
      `\nElevation: ${elevation}m asl`,
      `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
      `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const current = response.current()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature_2m: current.variables(0)!.value(),
        apparent_temperature: current.variables(1)!.value(),
        is_day: current.variables(2)!.value(),
        cloud_cover: current.variables(3)!.value(),
      },
      daily: {
        time: Array.from(
          { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
          (_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m_max: daily.variables(0)!.valuesArray(),
        temperature_2m_min: daily.variables(1)!.valuesArray(),
      },
    };

    // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
    console.log(
      `\nCurrent time: ${weatherData.current.time}\n`,
      `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
      `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
      `\nCurrent is_day: ${weatherData.current.is_day}`,
      `\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
    );
    console.log("\nDaily data:\n", weatherData.daily)


    return Response.json(
      { message: "GET success", data: weatherData },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ error: "GET failed" }, { status: 500 });
  }
}