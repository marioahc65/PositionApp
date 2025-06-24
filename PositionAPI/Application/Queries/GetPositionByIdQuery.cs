using MediatR;
using Domain.Entities;

namespace Application.Queries;

public record GetPositionByIdQuery(Guid Id) : IRequest<Position?>;