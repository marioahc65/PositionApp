using MediatR;
using Domain.Entities;
using Application.Commands;
using Infrastructure.Data;

namespace Application.Handlers;

public class CreatePositionHandler : IRequestHandler<CreatePositionCommand, Position>
{
    private readonly AppDbContext _db;

    public CreatePositionHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Position> Handle(CreatePositionCommand request, CancellationToken cancellationToken)
    {
        var dto = request.PositionDto;

        var position = new Position
        {
            Title = dto.Title,
            Description = dto.Description,
            Location = dto.Location,
            Status = dto.Status,
            RecruiterId = dto.RecruiterId,
            DepartmentId = dto.DepartmentId,
            Budget = dto.Budget,
            ClosingDate = dto.ClosingDate
        };

        _db.Positions.Add(position);
        await _db.SaveChangesAsync(cancellationToken);
        return position;
    }
}
