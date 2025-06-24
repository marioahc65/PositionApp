using MediatR;
using Domain.Entities;
using Infrastructure.Data;
using Application.Queries;

public class GetPositionByIdHandler : IRequestHandler<GetPositionByIdQuery, Position?>
{
    private readonly AppDbContext _db;

    public GetPositionByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Position?> Handle(GetPositionByIdQuery request, CancellationToken cancellationToken)
    {
        return await _db.Positions.FindAsync([request.Id], cancellationToken);
    }
}
