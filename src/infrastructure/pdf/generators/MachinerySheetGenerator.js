import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const TEMPLATE_PATH = path.join(new URL(".", import.meta.url).pathname, "..", "templates", "machinerySheet.html");

function renderTemplate(template, data) {
  let html = template;

  const ifRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  html = html.replace(ifRegex, (match, key, block) => {
    const value = data[key];
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    return value && !isEmptyArray ? block : "";
  });

  const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  html = html.replace(eachRegex, (match, key, block) => {
    const items = data[key];
    if (!Array.isArray(items) || items.length === 0) return "";
    return items
      .map((item, index) => {
        return block
          .replace(/\{\{@index\}\}/g, index + 1)
          .replace(/\{\{(\w+)\}\}/g, (_, prop) => {
            const val = item[prop];
            return val !== undefined && val !== null ? val : "";
          });
      })
      .join("");
  });

  html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    return value !== undefined && value !== null ? value : "";
  });

  return html;
}

export async function generateMachinerySheetPdf(data) {
  const templateContent = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const html = renderTemplate(templateContent, data);

  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });
    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore close errors
      }
    }
  }
}
