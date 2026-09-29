import { chromium } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browser = await chromium.launch();

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["tablet", 820, 1180],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:3000");
  await page.waitForTimeout(1800);
  const path = join(tmpdir(), `portfolio-${name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(path);
  if (name === "desktop") {
    const heroPath = join(tmpdir(), "portfolio-hero.png");
    await page.locator("section").first().screenshot({ path: heroPath });
    console.log(heroPath);
    await page.locator("#case-automatax .case-row__toggle").click();
    const casePath = join(tmpdir(), "portfolio-case.png");
    await page.locator("#case-automatax").screenshot({ path: casePath });
    console.log(casePath);
    await page.locator(".explorer__intro button").click();
    const explorerPath = join(tmpdir(), "portfolio-explorer.png");
    await page.locator("#explorador").screenshot({ path: explorerPath });
    console.log(explorerPath);
  }
  await page.close();
}

await browser.close();
