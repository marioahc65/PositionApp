using MediatR;
using Infrastructure.Data;
using Application.Commands;

public class DeletePositionHandler : IRequestHandler<DeletePositionCommand, bool>
{
    private readonly AppDbContext _db;

    public DeletePositionHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<bool> Handle(DeletePositionCommand request, CancellationToken cancellationToken)
    {
        var position = await _db.Positions.FindAsync([request.Id], cancellationToken);
        if (position is null) return false;

        _db.Positions.Remove(position);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }
}
