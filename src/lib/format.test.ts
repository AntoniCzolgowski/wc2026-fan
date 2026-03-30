import { describe, it, expect } from "vitest";
import {
  formatNumber,
  formatMs,
  daysUntil,
  pluralize,
} from "./format";

describe("format utilities", () => {
  describe("formatNumber", () => {
    it("formats thousands with commas", () => {
      expect(formatNumber(1250)).toBe("1,250");
      expect(formatNumber(1000000)).toBe("1,000,000");
    });

    it("handles small numbers", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(42)).toBe("42");
    });
  });

  describe("formatMs", () => {
    it("converts milliseconds to seconds string", () => {
      expect(formatMs(28400)).toBe("28.4s");
      expect(formatMs(12100)).toBe("12.1s");
      expect(formatMs(1000)).toBe("1.0s");
    });
  });

  describe("daysUntil", () => {
    it("returns 0 for past dates", () => {
      const past = new Date("2020-01-01");
      expect(daysUntil(past)).toBe(0);
    });

    it("returns positive for future dates", () => {
      const future = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
      const days = daysUntil(future);
      expect(days).toBeGreaterThanOrEqual(9);
      expect(days).toBeLessThanOrEqual(11);
    });
  });

  describe("pluralize", () => {
    it("handles singular", () => {
      expect(pluralize(1, "day")).toBe("1 day");
    });

    it("handles plural", () => {
      expect(pluralize(5, "day")).toBe("5 days");
    });

    it("supports custom plural", () => {
      expect(pluralize(0, "match", "matches")).toBe("0 matches");
    });
  });
});
