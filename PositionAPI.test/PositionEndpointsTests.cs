using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Domain.Entities;
using Tests;
using Xunit;
using FluentAssertions;

namespace PositionAPI.Tests;

public class PositionEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public PositionEndpointsTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    public record TestPositionDto(
        string Title,
        string Description,
        string Location,
        string Status,
        Guid RecruiterId,
        Guid DepartmentId,
        decimal Budget,
        DateTime? ClosingDate
    );

    [Fact]
    public async Task GetAllPositions_ReturnsSuccess()
    {
        var response = await _client.GetAsync("/api/positions");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetPositionById_ReturnsPosition_WhenExists()
    {
        var newPos = new TestPositionDto(
            "Tester", "Detalles", "CR", "open",
            Guid.NewGuid(), Guid.NewGuid(), 123000, null
        );
        var postResp = await _client.PostAsJsonAsync("/api/positions", newPos);
        var created = await postResp.Content.ReadFromJsonAsync<Position>();

        var getResp = await _client.GetAsync($"/api/positions/{created!.Id}");
        getResp.StatusCode.Should().Be(HttpStatusCode.OK);

        var fetched = await getResp.Content.ReadFromJsonAsync<Position>();
        fetched!.Title.Should().Be("Tester");
    }

    [Fact]
    public async Task UpdatePosition_ReturnsUpdated_WhenSuccessful()
    {
        var newPos = new TestPositionDto(
            "Old Title", "Desc", "CR", "draft",
            Guid.NewGuid(), Guid.NewGuid(), 200000, null
        );
        var postResp = await _client.PostAsJsonAsync("/api/positions", newPos);
        var created = await postResp.Content.ReadFromJsonAsync<Position>();

        var updated = new TestPositionDto(
            "Updated Title", "Updated", "CR", "open",
            created!.RecruiterId, created.DepartmentId, 999999, DateTime.UtcNow
        );

        var putResp = await _client.PutAsJsonAsync($"/api/positions/{created.Id}", updated);
        putResp.StatusCode.Should().Be(HttpStatusCode.OK);

        var updatedResult = await putResp.Content.ReadFromJsonAsync<Position>();
        updatedResult!.Title.Should().Be("Updated Title");
    }

    [Fact]
    public async Task DeletePosition_ReturnsNoContent_WhenSuccessful()
    {
        var dto = new TestPositionDto(
            "ToDelete", "Desc", "CR", "open",
            Guid.NewGuid(), Guid.NewGuid(), 150000, null
        );
        var create = await _client.PostAsJsonAsync("/api/positions", dto);
        var created = await create.Content.ReadFromJsonAsync<Position>();

        var delete = await _client.DeleteAsync($"/api/positions/{created!.Id}");
        delete.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var check = await _client.GetAsync($"/api/positions/{created.Id}");
        check.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task CreatePosition_ReturnsBadRequest_WhenInvalid()
    {
        var invalid = new TestPositionDto(
            "", "", "", "invalid-status",
            Guid.Empty, Guid.Empty, 0, null
        );

        var response = await _client.PostAsJsonAsync("/api/positions", invalid);
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task GetAllPositions_Returns401_WhenApiKeyMissing()
    {
        var clientWithoutKey = new CustomWebApplicationFactory().CreateClient();
        clientWithoutKey.DefaultRequestHeaders.Remove("X-API-KEY");

        var response = await clientWithoutKey.GetAsync("/api/positions");
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task GetAllPositions_Returns403_WhenApiKeyInvalid()
    {
        var client = new CustomWebApplicationFactory().CreateClient();
        client.DefaultRequestHeaders.Remove("X-API-KEY");
        client.DefaultRequestHeaders.Add("X-API-KEY", "clave-falsa");

        var response = await client.GetAsync("/api/positions");
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

}
