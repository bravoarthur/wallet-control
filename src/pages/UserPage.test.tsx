import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserPage from "./UserPage";
import userEvent from "@testing-library/user-event";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate
}));

describe("Set an user", () => {
    it("set a new User Wallet", () => {
        render(<UserPage />);

        const input: HTMLInputElement = screen.getByRole("combobox");

        userEvent.type(input, "user{enter}");
        fireEvent.change(input, { target: { value: "user" } });

        expect(input).toHaveValue("user");
    });

    it("Go to Next page", () => {
        render(<UserPage />);

        const button = screen.getByText("Enter");

        const functionToNextPage = jest.fn();

        button.onclick = functionToNextPage;

        fireEvent.click(button);

        expect(functionToNextPage).toHaveBeenCalled();
    });
});
