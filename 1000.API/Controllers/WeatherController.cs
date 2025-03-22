using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Logging;

namespace _1000.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<WeatherController> _logger;
        private const string API_KEY = "2ddb59c004b03237cdd655b5b17faa4b"; // OpenWeather API Key
        private const string BASE_URL = "http://api.openweathermap.org/data/2.5";

        private readonly List<string> popularCities = new()
        {
            "Dubai,AE", "Bangkok,TH", "Delhi,IN", "Kuwait,KW", "Baghdad,IQ", // Sıcak şehirler
            "Yakutsk,RU", "Norilsk,RU", "Yellowknife,CA", "Murmansk,RU", "Nuuk,GL" // Soğuk şehirler
        };

        public WeatherController(IHttpClientFactory httpClientFactory, ILogger<WeatherController> logger)
        {
            _httpClient = httpClientFactory.CreateClient();
            _logger = logger;
        }

        [HttpGet("city/{cityName}")]
        public async Task<IActionResult> GetWeatherByCity(string cityName)
        {
            try
            {
                _logger.LogInformation($"Fetching weather for city: {cityName}");
                var response = await _httpClient.GetStringAsync(
                    $"{BASE_URL}/weather?q={cityName}&appid={API_KEY}&units=metric");
                
                var data = JObject.Parse(response);
                
                var result = new
                {
                    cityName = data["name"]?.ToString(),
                    country = data["sys"]?["country"]?.ToString(),
                    temperature = data["main"]?["temp"]?.Value<double>(),
                    feelsLike = data["main"]?["feels_like"]?.Value<double>(),
                    humidity = data["main"]?["humidity"]?.Value<int>(),
                    windSpeed = data["wind"]?["speed"]?.Value<double>(),
                    description = data["weather"]?[0]?["description"]?.ToString()
                };

                _logger.LogInformation($"Successfully fetched weather for {cityName}");
                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching weather for city: {cityName}");
                return NotFound($"City '{cityName}' not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Unexpected error fetching weather for city: {cityName}");
                return StatusCode(500, "An unexpected error occurred");
            }
        }

        [HttpGet("hottest")]
        public async Task<IActionResult> GetHottestCities()
        {
            try
            {
                _logger.LogInformation("Fetching hottest cities");
                var tasks = popularCities.Select(city => 
                    _httpClient.GetStringAsync($"{BASE_URL}/weather?q={city}&appid={API_KEY}&units=metric"));
                
                var responses = await Task.WhenAll(tasks);
                
                var cities = responses
                    .Select(response => JObject.Parse(response))
                    .Select(data => new
                    {
                        cityName = data["name"]?.ToString(),
                        country = data["sys"]?["country"]?.ToString(),
                        temperature = data["main"]?["temp"]?.Value<double>(),
                        feelsLike = data["main"]?["feels_like"]?.Value<double>(),
                        humidity = data["main"]?["humidity"]?.Value<int>(),
                        windSpeed = data["wind"]?["speed"]?.Value<double>(),
                        description = data["weather"]?[0]?["description"]?.ToString()
                    })
                    .OrderByDescending(c => c.temperature)
                    .Take(5)
                    .ToList();

                _logger.LogInformation("Successfully fetched hottest cities");
                return Ok(cities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching hottest cities");
                return StatusCode(500, "Failed to fetch hottest cities");
            }
        }

        [HttpGet("coldest")]
        public async Task<IActionResult> GetColdestCities()
        {
            try
            {
                _logger.LogInformation("Fetching coldest cities");
                var tasks = popularCities.Select(city => 
                    _httpClient.GetStringAsync($"{BASE_URL}/weather?q={city}&appid={API_KEY}&units=metric"));
                
                var responses = await Task.WhenAll(tasks);
                
                var cities = responses
                    .Select(response => JObject.Parse(response))
                    .Select(data => new
                    {
                        cityName = data["name"]?.ToString(),
                        country = data["sys"]?["country"]?.ToString(),
                        temperature = data["main"]?["temp"]?.Value<double>(),
                        feelsLike = data["main"]?["feels_like"]?.Value<double>(),
                        humidity = data["main"]?["humidity"]?.Value<int>(),
                        windSpeed = data["wind"]?["speed"]?.Value<double>(),
                        description = data["weather"]?[0]?["description"]?.ToString()
                    })
                    .OrderBy(c => c.temperature)
                    .Take(5)
                    .ToList();

                _logger.LogInformation("Successfully fetched coldest cities");
                return Ok(cities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching coldest cities");
                return StatusCode(500, "Failed to fetch coldest cities");
            }
        }
    }
} 