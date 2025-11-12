import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const usePdfExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportToPdf = useCallback(async (filename = "menu") => {
    setIsExporting(true);
    setError(null);

    try {
      console.log("Starting PDF export...");

      console.log("Libraries loaded successfully");

      // Find the menu element with multiple fallback selectors
      const selectors = [
        '[data-print-area="true"]',
        ".print-area",
        '[data-testid="menu-preview"]',
        ".menu-preview",
        ".bg-white.shadow-lg",
      ];

      let element: HTMLElement | null = null;
      for (const selector of selectors) {
        element = document.querySelector(selector);
        if (element) {
          console.log(`Found element with selector: ${selector}`);
          break;
        }
      }

      if (!element) {
        throw new Error(
          `Menu element not found. Tried selectors: ${selectors.join(", ")}`
        );
      }

      console.log("Element found:", element);
      console.log("Element dimensions:", {
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      // Generate canvas with conservative settings
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      console.log("Canvas generated:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Scale to fit page while maintaining aspect ratio
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      // Center the image on the page
      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);

      // Save the PDF
      const finalFilename = filename.endsWith(".pdf")
        ? filename
        : `${filename}.pdf`;
      pdf.save(finalFilename);

      console.log("PDF exported successfully:", finalFilename);
      alert(`PDF exported successfully as ${finalFilename}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("PDF export failed:", err);
      setError(errorMessage);
      alert(`PDF export failed: ${errorMessage}`);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return {
    exportToPdf,
    isExporting,
    error,
  };
};
