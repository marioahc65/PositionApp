import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import  CreatePositionForm  from "../pages/CreatePositionForm";
import { PositionsProvider } from "../context/PositionsContext";

const mockCreatePosition = vi.fn();

vi.mock("../api/positions", () => ({
  createPosition: (...args) => mockCreatePosition(...args),
}));

describe("CreatePositionForm", () => {
  beforeEach(() => {
    mockCreatePosition.mockReset();
  });

  it("envía el formulario con campos válidos", async () => {
    render(
      <PositionsProvider>
        <CreatePositionForm />
      </PositionsProvider>
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Nueva posición" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Descripción de prueba" },
    });

    fireEvent.change(screen.getByLabelText("Ubicación"), {
      target: { value: "Heredia" },
    });

    fireEvent.change(screen.getByLabelText("Recruiter ID"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByLabelText("Department ID"), {
      target: { value: "456" },
    });

    fireEvent.change(screen.getByLabelText("Presupuesto"), {
      target: { value: "5000" },
    });

    fireEvent.change(screen.getByLabelText("Fecha de cierre"), {
      target: { value: "2025-12-31" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(mockCreatePosition).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Nueva posición",
          location: "Heredia",
        })
      );
    });

    expect(screen.getByText("¡Posición creada!")).toBeInTheDocument();
  });

  it("muestra error si el backend falla", async () => {
    mockCreatePosition.mockRejectedValueOnce(new Error("fail"));

    render(
      <PositionsProvider>
        <CreatePositionForm />
      </PositionsProvider>
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Fallida" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Descripción fallida" },
    });

    fireEvent.change(screen.getByLabelText("Ubicación"), {
      target: { value: "San José" },
    });

    fireEvent.change(screen.getByLabelText("Recruiter ID"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByLabelText("Department ID"), {
      target: { value: "456" },
    });

    fireEvent.change(screen.getByLabelText("Presupuesto"), {
      target: { value: "1000" },
    });

    fireEvent.change(screen.getByLabelText("Fecha de cierre"), {
      target: { value: "2025-12-31" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al crear/i)).toBeInTheDocument();
    });
  });
  

});
