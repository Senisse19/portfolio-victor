import { describe, expect, it } from "vitest";
import { ecosystemCatalog, ecosystemItemCount } from "./ecosystem";
import { featuredProjects, projects, siteConfig } from "./portfolio";

describe("portfolio content", () => {
  it("keeps featured cases unique and complete in both languages", () => {
    expect(featuredProjects).toHaveLength(4);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    for (const project of featuredProjects) {
      expect(project.problem.pt && project.problem.en).toBeTruthy();
      expect(project.solution.pt && project.solution.en).toBeTruthy();
      expect(project.impact.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.role?.pt && project.role?.en).toBeTruthy();
      expect(project.highlight?.pt && project.highlight?.en).toBeTruthy();
    }
  });

  it("preserves the complete Grupo Studio catalog", () => {
    const items = ecosystemCatalog.flatMap((group) => group.items);
    expect(ecosystemCatalog).toHaveLength(7);
    expect(ecosystemItemCount).toBe(56);
    expect(new Set(items.map((project) => project.id)).size).toBe(items.length);
    expect(items.some((project) => project.name === "Portal do Cliente")).toBe(true);
    expect(items.some((project) => project.name === "New Tax CRM")).toBe(true);
    expect(items.some((project) => project.name.includes("PER/DCOMP"))).toBe(true);
  });

  it("uses the Grupo Studio Vimeo presentation", () => {
    expect(siteConfig.videoUrl).toContain("vimeo.com/1230247856");
  });
});
