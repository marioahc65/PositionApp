using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using PositionAPI;

namespace Tests;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
        protected override void ConfigureClient(HttpClient client)
    {
        var apiKey = "estoesunaclave123@1234567890";
        client.DefaultRequestHeaders.Add("X-API-KEY", apiKey);
    }
}