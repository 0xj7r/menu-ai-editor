"use client"

import type { Menu } from "@/types/menu"
import type { MenuSettings } from "@/types/settings"
import { MenuSectionComponent } from "./menu-section"
import { EditableRichText } from "@/components/ui/editable-rich-text"
import { getPageDimensions } from "@/utils/page-dimensions"
import { getColumnizedCategories } from "@/utils/menu-utils"
import { renderDecorativeLine } from "@/utils/decorative-lines"
import { usePageBreaks } from "@/hooks/use-page-breaks"
import { LogoUploader } from "@/components/ui/logo-uploader"

interface MenuPreviewProps {
  menu: Menu
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
  onMenuChange?: (updater: (prev: Menu) => Menu) => void
}

export const MenuPreview = ({ menu, settings, onSettingChange, onMenuChange }: MenuPreviewProps) => {
  // Provide default values to prevent undefined errors
  const safeSettings = {
    ...settings,
    pageFormat: settings.pageFormat || "a4",
    orientation: settings.orientation || "portrait",
    backgroundColor: settings.backgroundColor || "#ffffff",
    margins: settings.margins || 20,
    pageBorders: {
      top: { show: false, thickness: 1, color: "#000000", ...settings.pageBorders?.top },
      bottom: { show: false, thickness: 1, color: "#000000", ...settings.pageBorders?.bottom },
      left: { show: false, thickness: 1, color: "#000000", ...settings.pageBorders?.left },
      right: { show: false, thickness: 1, color: "#000000", ...settings.pageBorders?.right },
      ...settings.pageBorders,
    },
    branding: {
      showLogo: false,
      logoPosition: "center",
      logoSize: 50,
      topMargin: 0,
      headerText: "Menu",
      ...settings.branding,
    },
    spacing: {
      logoToHeader: 16,
      headerToSection: 24,
      ...settings.spacing,
    },
    headerText: {
      alignment: "center",
      fontSize: 32,
      fontFamily: "Arial, sans-serif",
      color: "#000000",
      fontWeight: "bold",
      ...settings.headerText,
    },
    headerDecorations: {
      lineType: "none",
      linePosition: "below",
      lineColor: "#000000",
      lineThickness: 1,
      ...settings.headerDecorations,
    },
    layout: {
      columns: 1,
      columnGap: 24,
      ...settings.layout,
    },
    sectionTitles: {
      foodSection: "Food",
      beverageSection: "Beverages",
      ...settings.sectionTitles,
    },
  }

  const pageDimensions = getPageDimensions(safeSettings.pageFormat, safeSettings.orientation)
  const columnizedCategories = getColumnizedCategories(menu.categories || [], safeSettings.layout.columns)

  const { pageBreaks, addPageBreak, removePageBreak, hasPageBreak, getPageBreakId } = usePageBreaks(
    menu.pageBreaks || [],
  )

  return (
    <div className="flex justify-center print-area">
      <div
        className="bg-white shadow-lg border border-gray-200 overflow-visible"
        data-print-area="true"
        data-testid="menu-preview"
        style={{
          width: pageDimensions.maxWidth,
          minHeight: `calc(${pageDimensions.aspectRatio} * ${pageDimensions.maxWidth})`,
          backgroundColor: safeSettings.backgroundColor,
          padding: `${safeSettings.margins}px`,
          position: "relative",
        }}
      >
        {/* Page Borders */}
        {safeSettings.pageBorders.top.show && (
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: `${safeSettings.pageBorders.top.thickness}px`,
              backgroundColor: safeSettings.pageBorders.top.color,
            }}
          />
        )}
        {safeSettings.pageBorders.bottom.show && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${safeSettings.pageBorders.bottom.thickness}px`,
              backgroundColor: safeSettings.pageBorders.bottom.color,
            }}
          />
        )}
        {safeSettings.pageBorders.left.show && (
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: `${safeSettings.pageBorders.left.thickness}px`,
              backgroundColor: safeSettings.pageBorders.left.color,
            }}
          />
        )}
        {safeSettings.pageBorders.right.show && (
          <div
            className="absolute top-0 bottom-0 right-0"
            style={{
              width: `${safeSettings.pageBorders.right.thickness}px`,
              backgroundColor: safeSettings.pageBorders.right.color,
            }}
          />
        )}

        <div className="w-full">
          {/* Logo and Header */}
          {safeSettings.branding.showLogo && (
            <div
              className="flex items-center"
              style={{
                justifyContent:
                  safeSettings.branding.logoPosition === "center"
                    ? "center"
                    : safeSettings.branding.logoPosition === "right"
                      ? "flex-end"
                      : "flex-start",
                marginTop: `${safeSettings.branding.topMargin}px`,
                marginBottom: `${safeSettings.spacing.logoToHeader}px`,
              }}
            >
              <LogoUploader
                value={safeSettings.branding.logoUrl}
                onChange={(dataUrl) => onSettingChange("branding.logoUrl", dataUrl)}
                size={safeSettings.branding.logoSize}
              />
            </div>
          )}

          {/* Header Text */}
          <div
            style={{
              textAlign: safeSettings.headerText.alignment as any,
              marginBottom: `${safeSettings.spacing.headerToSection}px`,
              display:
                safeSettings.headerDecorations.lineType !== "none" &&
                safeSettings.headerDecorations.linePosition === "beside"
                  ? "flex"
                  : "block",
              alignItems:
                safeSettings.headerDecorations.lineType !== "none" &&
                safeSettings.headerDecorations.linePosition === "beside"
                  ? "center"
                  : "initial",
              gap:
                safeSettings.headerDecorations.lineType !== "none" &&
                safeSettings.headerDecorations.linePosition === "beside"
                  ? "16px"
                  : "0",
              justifyContent:
                safeSettings.headerText.alignment === "center"
                  ? "center"
                  : safeSettings.headerText.alignment === "right"
                    ? "flex-end"
                    : "flex-start",
            }}
          >
            {safeSettings.headerDecorations.lineType !== "none" &&
              safeSettings.headerDecorations.linePosition === "beside" &&
              safeSettings.headerText.alignment === "right" && (
                <div
                  style={{
                    ...renderDecorativeLine(
                      safeSettings.headerDecorations.lineType,
                      safeSettings.headerDecorations.lineColor,
                      safeSettings.headerDecorations.lineThickness,
                    ),
                    flex: 1,
                    minWidth: "50px",
                  }}
                />
              )}

            {safeSettings.headerDecorations.lineType !== "none" &&
              safeSettings.headerDecorations.linePosition === "beside" &&
              safeSettings.headerText.alignment === "center" && (
                <div
                  style={{
                    ...renderDecorativeLine(
                      safeSettings.headerDecorations.lineType,
                      safeSettings.headerDecorations.lineColor,
                      safeSettings.headerDecorations.lineThickness,
                    ),
                    flex: 1,
                    minWidth: "50px",
                  }}
                />
              )}

            <EditableRichText
              value={safeSettings.branding.headerText}
              onChange={(value) => onSettingChange("branding.headerText", value)}
              style={{
                fontSize: `${safeSettings.headerText.fontSize}px`,
                fontFamily: safeSettings.headerText.fontFamily,
                color: safeSettings.headerText.color,
                fontWeight: safeSettings.headerText.fontWeight === "bold" ? "bold" : "normal",
                fontStyle: safeSettings.headerText.fontWeight === "italic" ? "italic" : "normal",
                margin: 0,
                lineHeight: 1.2,
              }}
            />

            {safeSettings.headerDecorations.lineType !== "none" &&
              safeSettings.headerDecorations.linePosition === "beside" &&
              safeSettings.headerText.alignment === "left" && (
                <div
                  style={{
                    ...renderDecorativeLine(
                      safeSettings.headerDecorations.lineType,
                      safeSettings.headerDecorations.lineColor,
                      safeSettings.headerDecorations.lineThickness,
                    ),
                    flex: 1,
                    minWidth: "50px",
                  }}
                />
              )}

            {safeSettings.headerDecorations.lineType !== "none" &&
              safeSettings.headerDecorations.linePosition === "beside" &&
              safeSettings.headerText.alignment === "center" && (
                <div
                  style={{
                    ...renderDecorativeLine(
                      safeSettings.headerDecorations.lineType,
                      safeSettings.headerDecorations.lineColor,
                      safeSettings.headerDecorations.lineThickness,
                    ),
                    flex: 1,
                    minWidth: "50px",
                  }}
                />
              )}

            {safeSettings.headerDecorations.lineType !== "none" &&
              safeSettings.headerDecorations.linePosition === "below" && (
                <div
                  className="mt-4"
                  style={renderDecorativeLine(
                    safeSettings.headerDecorations.lineType,
                    safeSettings.headerDecorations.lineColor,
                    safeSettings.headerDecorations.lineThickness,
                  )}
                />
              )}
          </div>

          {/* Menu Content */}
          <div
            style={{
              display: safeSettings.layout.columns === 2 ? "grid" : "block",
              gridTemplateColumns: safeSettings.layout.columns === 2 ? "1fr 1fr" : "1fr",
              gap: safeSettings.layout.columns === 2 ? `${safeSettings.layout.columnGap}px` : "0",
            }}
          >
            {columnizedCategories.map((columnCategories, columnIndex) => (
              <div key={columnIndex} className="space-y-4">
                {/* Food Section */}
                <MenuSectionComponent
                  categories={columnCategories}
                  sectionTitle={safeSettings.sectionTitles.foodSection}
                  settings={safeSettings}
                  onSettingChange={onSettingChange}
                  onMenuChange={onMenuChange}
                  sectionType="food"
                  onAddPageBreak={addPageBreak}
                  onRemovePageBreak={removePageBreak}
                  hasPageBreakBefore={hasPageBreak("section-food", "before")}
                  hasPageBreakAfter={hasPageBreak("section-food", "after")}
                  pageBreakBeforeId={getPageBreakId("section-food", "before")}
                  pageBreakAfterId={getPageBreakId("section-food", "after")}
                  hasPageBreak={hasPageBreak}
                  getPageBreakId={getPageBreakId}
                />

                {/* Beverage Section */}
                <MenuSectionComponent
                  categories={columnCategories}
                  sectionTitle={safeSettings.sectionTitles.beverageSection}
                  settings={safeSettings}
                  onSettingChange={onSettingChange}
                  onMenuChange={onMenuChange}
                  sectionType="drink"
                  onAddPageBreak={addPageBreak}
                  onRemovePageBreak={removePageBreak}
                  hasPageBreakBefore={hasPageBreak("section-drink", "before")}
                  hasPageBreakAfter={hasPageBreak("section-drink", "after")}
                  pageBreakBeforeId={getPageBreakId("section-drink", "before")}
                  pageBreakAfterId={getPageBreakId("section-drink", "after")}
                  hasPageBreak={hasPageBreak}
                  getPageBreakId={getPageBreakId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
