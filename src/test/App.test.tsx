import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders home page with Flight Status Board title", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByRole("heading", { name: /flight status board/i });
  expect(heading).toBeInTheDocument();
});
