export const renderDecorativeLine = (lineType: string, color: string, thickness = 1) => {
  if (lineType === "none") {
    return { display: "none" }
  }

  switch (lineType) {
    case "straight":
      return {
        background: color,
        height: `${thickness}px`,
      }
    case "dotted":
      return {
        background: `repeating-linear-gradient(to right, ${color} 0, ${color} ${thickness * 2}px, transparent ${thickness * 2}px, transparent ${thickness * 6}px)`,
        height: `${thickness}px`,
      }
    case "dashed":
      return {
        background: `repeating-linear-gradient(to right, ${color} 0, ${color} ${thickness * 8}px, transparent ${thickness * 8}px, transparent ${thickness * 12}px)`,
        height: `${thickness}px`,
      }
    case "double":
      return {
        background: `linear-gradient(to bottom, ${color} 0, ${color} ${thickness}px, transparent ${thickness}px, transparent ${thickness * 2}px, ${color} ${thickness * 2}px, ${color} ${thickness * 3}px)`,
        height: `${thickness * 3}px`,
      }
    case "diamond":
      return {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg width="16" height="${thickness * 4}" xmlns="http://www.w3.org/2000/svg"><polygon points="8,0 12,${thickness * 2} 8,${thickness * 4} 4,${thickness * 2}" fill="${color}"/></svg>`)}")`,
        backgroundRepeat: "repeat-x",
        height: `${thickness * 4}px`,
      }
    case "stars":
      return {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg width="20" height="${thickness * 6}" xmlns="http://www.w3.org/2000/svg"><polygon points="10,0 12,6 18,6 13,10 15,16 10,12 5,16 7,10 2,6 8,6" fill="${color}"/></svg>`)}")`,
        backgroundRepeat: "repeat-x",
        height: `${thickness * 6}px`,
      }
    default:
      return {
        background: color,
        height: `${thickness}px`,
      }
  }
}
