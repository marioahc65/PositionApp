namespace Domain.Entities;

public class Position
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Location { get; set; } = default!;
    public string Status { get; set; } = "draft";
    public Guid RecruiterId { get; set; }
    public Guid DepartmentId { get; set; }
    public decimal Budget { get; set; }
    public DateTime? ClosingDate { get; set; }
}