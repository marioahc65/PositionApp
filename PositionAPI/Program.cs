using Infrastructure.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.DTOs;
using Application.Validators;
using MediatR;
using Infrastructure.Middleware;
using System.Reflection;
using Application.Queries;
using Application.Commands;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("PositionsDb"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Position API", Version = "v1" });

    c.AddSecurityDefinition("ApiKey", new()
    {
        Description = "API Key debe ir en el header X-API-KEY",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Name = "X-API-KEY",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "ApiKeyScheme"
    });

    c.AddSecurityRequirement(new()
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "ApiKey" }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddValidatorsFromAssemblyContaining<PositionValidator>();
builder.Services.AddAuthorization(); 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");
app.UseMiddleware<ApiKeyMiddleware>();
app.UseAuthorization();

app.MapGet("/api/positions", async (IMediator mediator) =>
{
    var result = await mediator.Send(new GetAllPositionsQuery());
    return Results.Ok(result);
});

app.MapGet("/api/positions/{id}", async (Guid id, IMediator mediator) =>
{
    var result = await mediator.Send(new GetPositionByIdQuery(id));
    return result is null ? Results.NotFound() : Results.Ok(result);
});

app.MapPost("/api/positions", async (
    PositionDto dto,
    IValidator<PositionDto> validator,
    IMediator mediator) =>
{
    var validation = await validator.ValidateAsync(dto);
    if (!validation.IsValid)
        return Results.BadRequest(validation.Errors);

    var result = await mediator.Send(new CreatePositionCommand(dto));
    return Results.Created($"/api/positions/{result.Id}", result);
});

app.MapPut("/api/positions/{id}", async (
    Guid id,
    PositionDto dto,
    IValidator<PositionDto> validator,
    IMediator mediator) =>
{
    var validation = await validator.ValidateAsync(dto);
    if (!validation.IsValid)
        return Results.BadRequest(validation.Errors);

    var result = await mediator.Send(new UpdatePositionCommand(id, dto));
    return result is null ? Results.NotFound() : Results.Ok(result);
});

app.MapDelete("/api/positions/{id}", async (Guid id, IMediator mediator) =>
{
    var result = await mediator.Send(new DeletePositionCommand(id));
    return result ? Results.NoContent() : Results.NotFound();
});
app.Run();

public partial class Program { }
