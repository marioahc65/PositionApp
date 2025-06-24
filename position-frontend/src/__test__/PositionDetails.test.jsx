import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PositionDetails } from "../pages/PositionDetails";
import { PositionsProvider } from "../context/PositionsContext";

const mockUpdatePosition = vi.fn();
const mockOnBack = vi.fn();

vi.mock("../api/positions", () => ({
  getPositionById: () =>
    Promise.resolve({
      id: "1",
      title: "Developer",
      location: "San José",
      description: "Build apps",
      status: "open",
      recruiterId: "abc",
      departmentId: "xyz",
      budget: 1000,
      closingDate: "2025-07-01T00:00:00Z",
    }),
  updatePosition: (...args) => mockUpdatePosition(...args),
}));

describe("PositionDetails Validations", () => {
  it("no envía el formulario si faltan campos requeridos", async () => {
    render(
      <PositionsProvider>
        <PositionDetails id="1" onBack={mockOnBack} />
      </PositionsProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(mockUpdatePosition).not.toHaveBeenCalled();
    });
  });

  it("muestra error si el backend falla al actualizar", async () => {
    mockUpdatePosition.mockRejectedValueOnce(new Error("fail"));

    render(
      <PositionsProvider>
        <PositionDetails id="1" onBack={mockOnBack} />
      </PositionsProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Dev Updated" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(screen.getByText("Error al actualizar")).toBeInTheDocument();
    });

    expect(mockUpdatePosition).toHaveBeenCalled();
  });
});
