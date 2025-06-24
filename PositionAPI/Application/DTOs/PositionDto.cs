using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class PositionDto
{
    [Required(ErrorMessage = "El título es obligatorio")]
    [MaxLength(100, ErrorMessage = "El título no puede tener más de 100 caracteres")]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descripción es obligatoria")]
    [MaxLength(1000, ErrorMessage = "La descripción no puede tener más de 1000 caracteres")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "La ubicación es obligatoria")]
    public string Location { get; set; } = string.Empty;

    [Required(ErrorMessage = "El estado es obligatorio")]
    [RegularExpression("draft|open|closed|archived", ErrorMessage = "Estado inválido")]
    public string Status { get; set; } = "draft";

    [Required(ErrorMessage = "RecruiterId es obligatorio")]
    public Guid RecruiterId { get; set; }

    [Required(ErrorMessage = "DepartmentId es obligatorio")]
    public Guid DepartmentId { get; set; }

    [Required(ErrorMessage = "El presupuesto es obligatorio")]
    [Range(0.01, double.MaxValue, ErrorMessage = "El presupuesto debe ser mayor a 0")]
    public decimal Budget { get; set; }

    public DateTime? ClosingDate { get; set; }
}
