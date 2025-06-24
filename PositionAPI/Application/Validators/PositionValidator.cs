using FluentValidation;
using Application.DTOs;

namespace Application.Validators;

public class PositionValidator : AbstractValidator<PositionDto>
{
    public PositionValidator()
    {
        RuleFor(p => p.Title)
            .NotEmpty().WithMessage("El título es obligatorio.")
            .MaximumLength(100).WithMessage("El título no puede tener más de 100 caracteres.");

        RuleFor(p => p.Description)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MaximumLength(1000).WithMessage("La descripción no puede tener más de 1000 caracteres.");

        RuleFor(p => p.Location)
            .NotEmpty().WithMessage("La ubicación es obligatoria.");

        RuleFor(p => p.Status)
            .Must(s => new[] { "draft", "open", "closed", "archived" }.Contains(s))
            .WithMessage("El estado debe ser: draft, open, closed o archived.");

        RuleFor(p => p.RecruiterId)
            .NotEmpty().WithMessage("El recruiterId es obligatorio.");

        RuleFor(p => p.DepartmentId)
            .NotEmpty().WithMessage("El departmentId es obligatorio.");

        RuleFor(p => p.Budget)
            .GreaterThan(0).WithMessage("El presupuesto debe ser mayor a 0.");
    }
}
