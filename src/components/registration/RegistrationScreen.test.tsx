import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RegistrationScreen } from "./RegistrationScreen";
import { useAuthStore } from "../../stores/auth-store";

// Mock supabase to avoid real connections
vi.mock("../../lib/supabase", () => ({
  supabase: {},
  isSupabaseConfigured: () => false,
}));

vi.mock("../../lib/auth", () => ({
  signUp: vi.fn(),
  signIn: vi.fn(),
  isNicknameAvailable: vi.fn().mockResolvedValue(true),
}));

function renderRegistration() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <RegistrationScreen />
    </MemoryRouter>,
  );
}

describe("RegistrationScreen", () => {
  beforeEach(() => {
    useAuthStore.setState({
      initialized: false,
      userId: null,
      profile: null,
      isDemo: false,
    });
  });

  it("renders the registration form", () => {
    renderRegistration();
    expect(screen.getByText("FIFA WORLD CUP 2026")).toBeInTheDocument();
    expect(screen.getByText("Pick Your Experience")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your nickname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email@example.com")).toBeInTheDocument();
    expect(screen.getByText("Your Team")).toBeInTheDocument();
  });

  it("shows LET'S GO button disabled initially", () => {
    renderRegistration();
    const btn = screen.getByRole("button", { name: /let's go/i });
    expect(btn).toBeDisabled();
  });

  it("enables submit when nickname + team are selected", async () => {
    const user = userEvent.setup();
    renderRegistration();

    const nicknameInput = screen.getByPlaceholderText("Enter your nickname");
    await user.type(nicknameInput, "Antoni");

    // Select a team (Argentina)
    const argButton = screen.getByRole("radio", { name: "Argentina" });
    await user.click(argButton);

    expect(screen.getByText("Argentina selected")).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /let's go/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it("shows validation error for short nickname", async () => {
    const user = userEvent.setup();
    renderRegistration();

    const nicknameInput = screen.getByPlaceholderText("Enter your nickname");
    await user.type(nicknameInput, "A");

    expect(screen.getByText("At least 2 characters")).toBeInTheDocument();
  });

  it("shows validation error for invalid nickname characters", async () => {
    const user = userEvent.setup();
    renderRegistration();

    const nicknameInput = screen.getByPlaceholderText("Enter your nickname");
    await user.type(nicknameInput, "test user!");

    expect(screen.getByText("Letters, numbers, - and _ only")).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderRegistration();

    const emailInput = screen.getByPlaceholderText("email@example.com");
    await user.type(emailInput, "notanemail");

    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("creates demo session on submit in offline mode", async () => {
    const user = userEvent.setup();
    renderRegistration();

    await user.type(screen.getByPlaceholderText("Enter your nickname"), "TestFan");
    await user.click(screen.getByRole("radio", { name: "Poland" }));

    const submitBtn = screen.getByRole("button", { name: /let's go/i });
    await user.click(submitBtn);

    // Check store was updated
    const state = useAuthStore.getState();
    expect(state.userId).toBe("demo-user");
    expect(state.isDemo).toBe(true);
    expect(state.profile?.nickname).toBe("TestFan");
    expect(state.profile?.team_id).toBe("poland");
  });
});
