"use client";

import { useState } from "react";
import { MenuPreview } from "@/components/menu/menu-preview";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { useMenuSettings } from "@/hooks/use-menu-settings";
import { sampleMenu } from "@/constants/menu-data";
import type { Menu } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { PdfExportButton } from "@/components/export/pdf-export-button";
import { Toaster } from "@/components/ui/sonner";

export default function MenuEditor() {
  const [showSettings, setShowSettings] = useState(true);
  const { settings, updateSetting } = useMenuSettings();
  const [menu, setMenu] = useState<Menu>(sampleMenu);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Menu Editor</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="mr-2 h-4 w-4" />
              {showSettings ? "Hide" : "Show"} Settings
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Export Button */}
            <PdfExportButton variant="outline" size="sm" filename="menu" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Settings Panel */}
        {showSettings && (
          <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            <SettingsPanel
              settings={settings}
              onSettingChange={updateSetting}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
              <MenuPreview
                menu={menu}
              settings={settings}
              onSettingChange={updateSetting}
                onMenuChange={(updater) => setMenu((prev) => updater(prev))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
