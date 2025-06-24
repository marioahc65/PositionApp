using MediatR;

namespace Application.Commands;

public record DeletePositionCommand(Guid Id) : IRequest<bool>;
