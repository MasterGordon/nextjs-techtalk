import { describe, it, expect } from "vitest";
import { em } from "./em";

describe("EM", () => {
  it("should return current group", async () => {
    const group = await em.getCurrentGroup();
    expect(group).toBeDefined();
  });

  it("should return available groups", async () => {
    const groups = await em.getAvailableGroups();
    expect(groups).toBeDefined();
  });

  it("should return available teams", async () => {
    const teams = await em.getAvailableTeams();
    expect(teams).toBeDefined();
  });

  it("should return match data", async () => {
    const matches = await em.getMatchData();
    expect(matches).toBeDefined();
  });

  it("should return match data by group", async () => {
    const matches = await em.getMatchData(3);
    expect(matches).toBeDefined();
  });

  it("should return match data by id", async () => {
    const match = await em.getMatchDataById(1000);
    expect(match).toBeDefined();
  });
});
