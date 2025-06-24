using MediatR;
using Domain.Entities;
using Infrastructure.Data;
using Application.Queries;
using Microsoft.EntityFrameworkCore;

public class GetAllPositionsHandler : IRequestHandler<GetAllPositionsQuery, List<Position>>
{
    private readonly AppDbContext _db;

    public GetAllPositionsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Position>> Handle(GetAllPositionsQuery request, CancellationToken cancellationToken)
    {
        return await _db.Positions.ToListAsync(cancellationToken);
    }
}
