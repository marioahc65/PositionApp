using MediatR;
using Application.DTOs;
using Domain.Entities;

namespace Application.Commands;

public record CreatePositionCommand(PositionDto PositionDto) : IRequest<Position>;