import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import { PositionsProvider } from "../context/PositionsContext";

vi.mock("../api/positions", () => ({
  getPositions: () =>
    Promise.resolve([
      {
        id: "1",
        title: "Developer",
        location: "San José",
        status: "open",
      },
    ]),
  getPositionById: (id) =>
    Promise.resolve({
      id,
      title: "Developer",
      location: "San José",
      description: "Build web apps",
      status: "open",
      recruiterId: "abc",
      departmentId: "xyz",
      budget: 1000,
      closingDate: "2025-07-01T00:00:00Z",
    }),
  updatePosition: () => Promise.resolve(),
  deletePosition: () => Promise.resolve(),
}));

describe("App Integration: PositionsPage ↔ PositionDetails", () => {
  it("navega a PositionDetails al hacer clic en una posición", async () => {
    render(
      <PositionsProvider>
        <App />
      </PositionsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Developer"));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Editar Posición/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    expect(screen.getByDisplayValue("San José")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Build web apps")).toBeInTheDocument();
  });

  it("permite volver a la lista desde PositionDetails", async () => {
    render(
      <PositionsProvider>
        <App />
      </PositionsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Developer"));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Editar Posición/i })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("← Volver"));

    await waitFor(() => {
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });
  });
});
