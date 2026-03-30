import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "./auth-store";

describe("auth-store", () => {
  beforeEach(() => {
    // Reset store state between tests
    useAuthStore.setState({
      initialized: false,
      userId: null,
      profile: null,
      isDemo: false,
    });
  });

  it("starts uninitialized with no user", () => {
    const state = useAuthStore.getState();
    expect(state.initialized).toBe(false);
    expect(state.userId).toBeNull();
    expect(state.profile).toBeNull();
  });

  it("setInitialized marks as initialized", () => {
    useAuthStore.getState().setInitialized();
    expect(useAuthStore.getState().initialized).toBe(true);
  });

  it("setDemo sets demo user and profile", () => {
    const demoProfile = {
      id: "demo-user",
      nickname: "TestFan",
      email: null,
      team_id: "poland",
      team_name: "Poland",
      team_color: "#DC143C",
      avatar_url: null,
    };

    useAuthStore.getState().setDemo(demoProfile);

    const state = useAuthStore.getState();
    expect(state.userId).toBe("demo-user");
    expect(state.isDemo).toBe(true);
    expect(state.initialized).toBe(true);
    expect(state.profile?.nickname).toBe("TestFan");
    expect(state.profile?.team_id).toBe("poland");
  });

  it("setUser sets authenticated user", () => {
    const profile = {
      id: "real-user-123",
      nickname: "Antoni",
      email: "test@example.com",
      phone: null,
      team_id: "argentina",
      team_name: "Argentina",
      team_color: "#74ACDF",
      avatar_url: null,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };

    useAuthStore.getState().setUser("real-user-123", profile);

    const state = useAuthStore.getState();
    expect(state.userId).toBe("real-user-123");
    expect(state.profile?.nickname).toBe("Antoni");
    expect(state.initialized).toBe(true);
    expect(state.isDemo).toBe(false);
  });

  it("logout clears user state", () => {
    useAuthStore.getState().setDemo({
      id: "demo-user",
      nickname: "TestFan",
      email: null,
      team_id: "poland",
      team_name: "Poland",
      team_color: "#DC143C",
      avatar_url: null,
    });

    expect(useAuthStore.getState().userId).toBe("demo-user");

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.userId).toBeNull();
    expect(state.profile).toBeNull();
    expect(state.isDemo).toBe(false);
  });

  it("setProfile updates profile without affecting other state", () => {
    useAuthStore.getState().setDemo({
      id: "demo-user",
      nickname: "OldName",
      email: null,
      team_id: "poland",
      team_name: "Poland",
      team_color: "#DC143C",
      avatar_url: null,
    });

    useAuthStore.getState().setProfile({
      id: "demo-user",
      nickname: "NewName",
      email: null,
      team_id: "brazil",
      team_name: "Brazil",
      team_color: "#009739",
      avatar_url: null,
    });

    const state = useAuthStore.getState();
    expect(state.profile?.nickname).toBe("NewName");
    expect(state.profile?.team_id).toBe("brazil");
    expect(state.userId).toBe("demo-user");
    expect(state.isDemo).toBe(true);
  });
});
