import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_PATH = path.join(
  __dirname,
  "..",
  "templates",
  "invoiceSheet.html"
);

function resolveExpression(expr, data) {
  // Soporta expresiones como: payments.length > 0, cuts, additional_charges.length > 0
  const trimmed = expr.trim();

  // Manejar expresiones con operadores
  const match = trimmed.match(/^(\w+(?:\.\w+)*)\s*(>|<|>=|<=|===|!==|==|!=)\s*(.+)$/);
  if (match) {
    const leftVal = getNestedValue(match[1], data);
    const operator = match[2];
    let rightVal = match[3].trim();

    // Si el lado derecho es un número
    if (/^-?\d+$/.test(rightVal)) {
      rightVal = Number(rightVal);
    } else if (/^["'].*["']$/.test(rightVal)) {
      rightVal = rightVal.slice(1, -1);
    } else {
      rightVal = getNestedValue(rightVal, data);
    }

    switch (operator) {
      case ">": return leftVal > rightVal;
      case "<": return leftVal < rightVal;
      case ">=": return leftVal >= rightVal;
      case "<=": return leftVal <= rightVal;
      case "===": return leftVal === rightVal;
      case "!==": return leftVal !== rightVal;
      case "==": return leftVal == rightVal;
      case "!=": return leftVal != rightVal;
      default: return false;
    }
  }

  // Variable simple o anidada
  const val = getNestedValue(trimmed, data);
  if (Array.isArray(val)) return val.length > 0;
  return !!val;
}

function getNestedValue(path, data) {
  const parts = path.split(".");
  let current = data;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

function renderTemplate(template, data) {
  let html = template;

  // Procesar #if con soporte de else y expresiones complejas
  const ifRegex = /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  html = html.replace(ifRegex, (match, condition, block) => {
    // Dividir en then y else usando {{else}}
    let thenBlock = block;
    let elseBlock = "";
    const elseIndex = block.indexOf("{{else}}");
    if (elseIndex !== -1) {
      thenBlock = block.substring(0, elseIndex);
      elseBlock = block.substring(elseIndex + "{{else}}".length);
    }

    const result = resolveExpression(condition, data);
    return result ? thenBlock : elseBlock;
  });

  // Procesar #each
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

  // Procesar variables simples
  html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    return value !== undefined && value !== null ? value : "";
  });

  return html;
}

export async function generateInvoiceSheetPdf(data) {
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