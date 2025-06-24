using MediatR;
using Domain.Entities;

namespace Application.Queries;

public record GetAllPositionsQuery() : IRequest<List<Position>>;
