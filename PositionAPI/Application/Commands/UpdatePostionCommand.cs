using MediatR;
using Application.DTOs;
using Domain.Entities;

namespace Application.Commands;

public record UpdatePositionCommand(Guid Id, PositionDto Dto) : IRequest<Position?>;
