import { describe, it, expect } from "vitest";
import {
  TEAMS,
  GROUPS,
  HOST_CITIES,
  MATCHES,
  getTeam,
  getCity,
  getTeamsByGroup,
  WORLD_CUP_START,
} from "./constants";

describe("constants", () => {
  describe("TEAMS", () => {
    it("has exactly 48 teams for the 2026 World Cup", () => {
      expect(TEAMS).toHaveLength(48);
    });

    it("every team has required fields", () => {
      for (const team of TEAMS) {
        expect(team.id).toBeTruthy();
        expect(team.name).toBeTruthy();
        expect(team.code).toBeTruthy();
        expect(team.color).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(team.group).toMatch(/^[A-L]$/);
        expect(team.confederation).toBeTruthy();
      }
    });

    it("has no duplicate team IDs", () => {
      const ids = TEAMS.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("GROUPS", () => {
    it("has exactly 12 groups (A-L)", () => {
      expect(GROUPS).toHaveLength(12);
      const letters = GROUPS.map((g) => g.letter);
      expect(letters).toEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]);
    });

    it("each group has exactly 4 teams", () => {
      for (const group of GROUPS) {
        expect(group.teams).toHaveLength(4);
      }
    });

    it("all group team IDs reference existing teams", () => {
      for (const group of GROUPS) {
        for (const teamId of group.teams) {
          expect(getTeam(teamId)).toBeDefined();
        }
      }
    });
  });

  describe("HOST_CITIES", () => {
    it("has 16 host cities", () => {
      expect(HOST_CITIES).toHaveLength(16);
    });

    it("includes cities from all 3 host countries", () => {
      const countries = new Set(HOST_CITIES.map((c) => c.country));
      expect(countries).toContain("USA");
      expect(countries).toContain("Mexico");
      expect(countries).toContain("Canada");
    });

    it("all cities have valid coordinates", () => {
      for (const city of HOST_CITIES) {
        expect(city.lat).toBeGreaterThan(0);
        expect(city.lng).toBeLessThan(0); // All in Western Hemisphere
        expect(city.capacity).toBeGreaterThan(0);
      }
    });
  });

  describe("MATCHES", () => {
    it("all matches reference valid teams and cities", () => {
      for (const match of MATCHES) {
        if (match.homeTeamId) expect(getTeam(match.homeTeamId)).toBeDefined();
        if (match.awayTeamId) expect(getTeam(match.awayTeamId)).toBeDefined();
        expect(getCity(match.cityId)).toBeDefined();
      }
    });
  });

  describe("getTeam", () => {
    it("returns the team for a valid ID", () => {
      const team = getTeam("argentina");
      expect(team).toBeDefined();
      expect(team?.name).toBe("Argentina");
      expect(team?.code).toBe("ar");
    });

    it("returns undefined for invalid ID", () => {
      expect(getTeam("nonexistent")).toBeUndefined();
    });
  });

  describe("getTeamsByGroup", () => {
    it("returns 4 teams for group A", () => {
      const teams = getTeamsByGroup("A");
      expect(teams).toHaveLength(4);
      expect(teams.map((t) => t.id)).toContain("argentina");
    });

    it("returns empty for invalid group", () => {
      expect(getTeamsByGroup("Z")).toHaveLength(0);
    });
  });

  describe("WORLD_CUP_START", () => {
    it("is June 11, 2026", () => {
      expect(WORLD_CUP_START.getFullYear()).toBe(2026);
      expect(WORLD_CUP_START.getMonth()).toBe(5); // 0-indexed
      expect(WORLD_CUP_START.getDate()).toBe(11);
    });
  });
});
