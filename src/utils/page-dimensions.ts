export const getPageDimensions = (pageFormat: string, orientation: string) => {
  const isLandscape = orientation === "landscape"

  switch (pageFormat) {
    case "a4":
      return isLandscape
        ? { width: "297mm", height: "210mm", maxWidth: "1122px", aspectRatio: "297/210" }
        : { width: "210mm", height: "297mm", maxWidth: "794px", aspectRatio: "210/297" }
    case "letter":
      return isLandscape
        ? { width: "11in", height: "8.5in", maxWidth: "1056px", aspectRatio: "11/8.5" }
        : { width: "8.5in", height: "11in", maxWidth: "816px", aspectRatio: "8.5/11" }
    case "legal":
      return isLandscape
        ? { width: "14in", height: "8.5in", maxWidth: "1344px", aspectRatio: "14/8.5" }
        : { width: "8.5in", height: "14in", maxWidth: "816px", aspectRatio: "8.5/14" }
    default:
      return isLandscape
        ? { width: "297mm", height: "210mm", maxWidth: "1122px", aspectRatio: "297/210" }
        : { width: "210mm", height: "297mm", maxWidth: "794px", aspectRatio: "210/297" }
  }
}
