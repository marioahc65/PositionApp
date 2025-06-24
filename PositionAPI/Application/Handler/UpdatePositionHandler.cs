using MediatR;
using Infrastructure.Data;
using Application.Commands;
using Domain.Entities;

public class UpdatePositionHandler : IRequestHandler<UpdatePositionCommand, Position?>
{
    private readonly AppDbContext _db;

    public UpdatePositionHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Position?> Handle(UpdatePositionCommand request, CancellationToken cancellationToken)
    {
        var position = await _db.Positions.FindAsync([request.Id], cancellationToken);
        if (position is null) return null;

        var dto = request.Dto;

        position.Title = dto.Title;
        position.Description = dto.Description;
        position.Location = dto.Location;
        position.Status = dto.Status;
        position.RecruiterId = dto.RecruiterId;
        position.DepartmentId = dto.DepartmentId;
        position.Budget = dto.Budget;
        position.ClosingDate = dto.ClosingDate;

        await _db.SaveChangesAsync(cancellationToken);
        return position;
    }
}
