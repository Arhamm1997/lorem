'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  
  // Check initial theme from document
  const [settings, setSettings] = useState({
    autoSave: true,
    notifications: true,
    darkMode: true,
    maxConcurrentRequests: 5,
    requestTimeout: 30,
    defaultScope: "domain" as const,
    defaultMaxPages: 100,
    defaultMaxDepth: 3,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('loremSleuthSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
    
    // Check current theme
    const isDark = document.documentElement.classList.contains('dark');
    setSettings(prev => ({ ...prev, darkMode: isDark }));
  }, []);

  // Toggle dark mode
  const toggleDarkMode = (checked: boolean) => {
    setSettings({ ...settings, darkMode: checked });
    
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme has been updated.",
    });
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('loremSleuthSettings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your crawling preferences and application settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general application behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-save crawl results</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save crawl results to history
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications when crawls complete
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for the application
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Crawl Defaults</CardTitle>
            <CardDescription>Set default values for new crawls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="default-max-pages">Default Max Pages</Label>
                <Input
                  id="default-max-pages"
                  type="number"
                  value={settings.defaultMaxPages}
                  onChange={(e) => setSettings({ ...settings, defaultMaxPages: parseInt(e.target.value) })}
                  min={1}
                  max={1000}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-max-depth">Default Max Depth</Label>
                <Input
                  id="default-max-depth"
                  type="number"
                  value={settings.defaultMaxDepth}
                  onChange={(e) => setSettings({ ...settings, defaultMaxDepth: parseInt(e.target.value) })}
                  min={1}
                  max={20}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Performance Settings</CardTitle>
            <CardDescription>Configure crawler performance parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="concurrent-requests">Max Concurrent Requests</Label>
                <Input
                  id="concurrent-requests"
                  type="number"
                  value={settings.maxConcurrentRequests}
                  onChange={(e) => setSettings({ ...settings, maxConcurrentRequests: parseInt(e.target.value) })}
                  min={1}
                  max={20}
                />
                <p className="text-xs text-muted-foreground">
                  Number of simultaneous requests (1-20)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-timeout">Request Timeout (seconds)</Label>
                <Input
                  id="request-timeout"
                  type="number"
                  value={settings.requestTimeout}
                  onChange={(e) => setSettings({ ...settings, requestTimeout: parseInt(e.target.value) })}
                  min={5}
                  max={120}
                />
                <p className="text-xs text-muted-foreground">
                  Timeout for each request (5-120s)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Clear all history</p>
                <p className="text-sm text-muted-foreground">
                  Delete all saved crawl results permanently
                </p>
              </div>
              <Button variant="destructive" onClick={() => {
                localStorage.removeItem('loremSleuthHistory');
                toast({
                  title: "History Cleared",
                  description: "All crawl history has been deleted.",
                  variant: "destructive",
                });
              }}>
                Clear History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
