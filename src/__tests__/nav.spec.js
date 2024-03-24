import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { routes } from "../constants/routes";

describe("Nav component", () => {
  test("displays all expected links", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toHaveAttribute("href", routes.home);
    expect(screen.getByText("LeaderBoard")).toHaveAttribute(
      "href",
      routes.leaderboard
    );
    expect(screen.getByText("New Poll")).toHaveAttribute(
      "href",
      routes.newPoll
    );
  });
});
