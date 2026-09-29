import { expect, test } from "@playwright/test";

test("presents the homepage and keeps PT/EN preference", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Transformo processos manuais");
  await expect(page.getByRole("heading", { name: "Sistemas que tiram o trabalho manual do caminho." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AutomaTax" })).toBeVisible();
  await expect(page.getByText("Autoria própria")).toHaveCount(0);
  await expect(page.locator("#case-automatax").getByText("Meu papel:")).toBeVisible();
  if (await page.getByRole("button", { name: "Menu" }).isVisible()) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("button", { name: "English" }).click();
  } else {
    await page.getByRole("button", { name: "Mudar para inglês" }).click();
  }
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I turn manual processes");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I turn manual processes");
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("expands cases in place and preserves old links", async ({ page }) => {
  await page.goto("/");
  const automatax = page.locator("#case-automatax");
  await automatax.getByRole("button", { name: "Ver case" }).click();
  await expect(automatax.getByRole("button", { name: "Fechar case" })).toHaveAttribute("aria-expanded", "true");
  await expect(automatax.getByText("115 migrations versionadas")).toBeVisible();
  await automatax.getByRole("button", { name: "Fechar case" }).click();
  await expect(automatax.locator(".case-row__details")).toBeHidden();
  await automatax.getByRole("link", { name: "Ver resultados no vídeo" }).click();
  await expect(page).toHaveURL(/#resultados$/);
  await expect(page.locator("#resultados")).toBeInViewport();
  await page.goto("/projetos/taxswap");
  await expect(page).toHaveURL(/\/#case-taxswap$/);
  await expect(page.locator("#case-taxswap .case-row__details")).toBeVisible();
});

test("reveals the complete catalog and lazy-loads the Grupo Studio video", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#explorer-content")).toBeHidden();
  await page.getByRole("button", { name: /Explorar 56 soluções/ }).click();
  await expect(page.locator("#explorer-content")).toBeVisible();
  await expect(page.locator(".explorer-group")).toHaveCount(8);
  const products = page.locator(".explorer-group").filter({ hasText: "Produtos web, comercial e portais" });
  await products.locator("summary").first().click();
  await expect(products.getByText("Portal do Cliente")).toBeVisible();
  await products.locator(".explorer-item").filter({ hasText: "Portal do Cliente" }).locator("summary").click();
  await expect(products.getByText("Spring Boot · React · PostgreSQL · AWS S3")).toBeVisible();
  await expect(page.locator(".studio-video iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Assistir apresentação" }).click();
  await expect(page.locator(".studio-video iframe")).toHaveAttribute("src", /player\.vimeo\.com\/video\/1230247856/);
  await page.goto("/ecossistema");
  await expect(page).toHaveURL(/\/#explorador$/);
  await expect(page.locator("#explorer-content")).toBeVisible();
});

test("opens cases and catalog with the keyboard and falls back without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, options?: unknown) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return Reflect.apply(original, this, [type, options]);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-neural-background] canvas")).toHaveCount(0);
  expect(errors).toEqual([]);

  const caseButton = page.locator("#case-automatax .case-row__toggle");
  await caseButton.focus();
  await page.keyboard.press("Enter");
  await expect(caseButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Space");
  await expect(caseButton).toHaveAttribute("aria-expanded", "false");

  const catalogButton = page.locator(".explorer__intro button");
  await catalogButton.focus();
  await page.keyboard.press("Enter");
  await expect(catalogButton).toHaveAttribute("aria-expanded", "true");
  const firstGroup = page.locator(".explorer-group").first();
  await firstGroup.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(firstGroup).toHaveAttribute("open", "");
});

test("renders the persistent 3D background", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-neural-background] canvas").first()).toBeVisible();
});

test("makes every documented solution discoverable", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "The full catalog is checked once in Chromium");
  // ~110 sequential clicks: the animated background (software WebGL + bloom in headless Chromium)
  // would compete for CPU with parallel workers. This test covers content, not motion.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#explorador");
  const groups = page.locator(".explorer-group");
  await expect(groups).toHaveCount(8);
  let solutionCount = 0;
  for (let groupIndex = 0; groupIndex < 7; groupIndex++) {
    const group = groups.nth(groupIndex);
    await group.locator("summary").first().click();
    const items = group.locator(".explorer-item");
    const count = await items.count();
    solutionCount += count;
    for (let itemIndex = 0; itemIndex < count; itemIndex++) {
      const item = items.nth(itemIndex);
      await item.locator("summary").click();
      await expect(item.locator(".explorer-item__detail")).toBeVisible();
      await expect(item.locator(".explorer-item__detail p")).not.toBeEmpty();
    }
    await group.locator("summary").first().click();
  }
  expect(solutionCount).toBe(56);
});
