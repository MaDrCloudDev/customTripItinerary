import puppeteer from "puppeteer";
import { json } from "@sveltejs/kit";
async function generatePDF(baseUrl, options) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      // Wide enough for most content
      height: 3e3,
      // Tall enough to avoid truncation
      deviceScaleFactor: 1
    });
    const url = new URL(baseUrl);
    url.searchParams.set("viewMode", options.viewMode);
    if (options.dayIndex !== void 0) {
      url.searchParams.set("dayIndex", options.dayIndex.toString());
    }
    url.searchParams.set("printMode", "true");
    await page.goto(url.toString(), {
      waitUntil: "networkidle0",
      timeout: 3e4
    });
    await page.waitForFunction(
      () => document.readyState === "complete"
    );
    await new Promise((resolve) => setTimeout(resolve, 2e3));
    await page.waitForFunction(
      () => {
        const main = document.querySelector("main");
        return main && main.scrollHeight > 200;
      },
      { timeout: 5e3 }
    );
    const contentInfo = await page.evaluate(() => {
      const elementsToHide = document.querySelectorAll(
        ".no-print, nav, footer, button:not(.print-button)"
      );
      elementsToHide.forEach((el) => {
        el.style.display = "none";
      });
      const main = document.querySelector("main");
      if (!main) return { height: 0, width: 0, activityCount: 0 };
      document.body.style.height = "auto";
      document.documentElement.style.height = "auto";
      main.style.height = "auto";
      main.style.maxHeight = "none";
      main.style.overflow = "visible";
      const allElements = main.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el;
        htmlEl.style.height = "auto";
        htmlEl.style.maxHeight = "none";
        htmlEl.style.overflow = "visible";
      });
      const overviewGrid = main.querySelector(
        ".overview-grid, .grid"
      );
      if (overviewGrid) {
        overviewGrid.style.display = "grid";
        overviewGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
        overviewGrid.style.gap = "1rem";
        overviewGrid.style.width = "100%";
      }
      main.offsetHeight;
      const activityCards = main.querySelectorAll(
        '.bg-white.border, [class*="ActivityCard"], [class*="TimeSlot"]'
      );
      const timeSlots = main.querySelectorAll(
        '[class*="slot"], .space-y-4 > div, .space-y-6 > div'
      );
      const overviewCards = main.querySelectorAll(
        '.overview-grid > div, .grid > div, [class*="day-card"]'
      );
      const contentHeight = Math.max(
        main.scrollHeight,
        main.offsetHeight
      );
      const contentWidth = Math.max(
        main.scrollWidth,
        main.offsetWidth
      );
      return {
        height: contentHeight,
        width: contentWidth,
        activityCount: Math.max(
          activityCards.length,
          timeSlots.length,
          overviewCards.length
        ),
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth
      };
    });
    console.log("Content dimensions:", contentInfo);
    console.log(
      `Found ${contentInfo.activityCount} activities/elements in content`
    );
    const pdfPageHeight = 11 * 72;
    const pdfPageWidth = 8.5 * 72;
    const margins = 28.8;
    const availableHeight = pdfPageHeight - margins;
    const availableWidth = pdfPageWidth - margins;
    const scaleForHeight = availableHeight / (contentInfo.height * 0.5);
    const scaleForWidth = availableWidth / (contentInfo.width * 0.5);
    const optimalScale = Math.min(
      scaleForHeight,
      scaleForWidth,
      0.95
    );
    console.log("PDF scaling:", {
      contentHeight: contentInfo.height,
      availableHeight,
      scaleForHeight,
      scaleForWidth,
      optimalScale
    });
    const pdf = await page.pdf({
      format: options.format || "A4",
      printBackground: true,
      margin: {
        top: "0.2in",
        bottom: "0.2in",
        left: "0.2in",
        right: "0.2in"
      },
      scale: Math.max(optimalScale, 0.4),
      // Reasonable minimum scale
      preferCSSPageSize: false,
      width: `${contentInfo.width}px`,
      height: `${contentInfo.height}px`
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
async function POST({ request, url }) {
  try {
    const { viewMode, dayIndex, format } = await request.json();
    const baseUrl = new URL("/", url.origin);
    const pdfBuffer = await generatePDF(baseUrl.toString(), {
      viewMode,
      dayIndex,
      format: format || "A4"
    });
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="itinerary-${viewMode}${dayIndex !== void 0 ? `-day-${dayIndex + 1}` : ""}.pdf"`
      }
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
export {
  POST
};
