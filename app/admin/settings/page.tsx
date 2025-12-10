"use client"

import { Save, Bell, Mail, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    appName: "Matrimony by Hana",
    supportEmail: "support@matrimonybyhana.com",
    monthlyPrice: 29,
    currency: "USD",
    enableRegistration: true,
    requireApproval: true,
    enableChapa: true,
    enableCardPayment: true,
    enablePrepaid: true,
  })

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground mt-1">Configure application settings</p>
      </div>

      {/* General Settings */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold text-foreground">General Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">Application Name</Label>
            <Input
              id="appName"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyPrice">Monthly Price</Label>
              <Input
                id="monthlyPrice"
                type="number"
                value={settings.monthlyPrice}
                onChange={(e) => setSettings({ ...settings, monthlyPrice: Number(e.target.value) })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Settings */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold text-foreground">Registration Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Registration</p>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Require Admin Approval</p>
              <p className="text-sm text-muted-foreground">All new registrations need approval</p>
            </div>
            <Switch
              checked={settings.requireApproval}
              onCheckedChange={(checked) => setSettings({ ...settings, requireApproval: checked })}
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-semibold text-foreground">Payment Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Card Payment</p>
              <p className="text-sm text-muted-foreground">Allow credit/debit card payments</p>
            </div>
            <Switch
              checked={settings.enableCardPayment}
              onCheckedChange={(checked) => setSettings({ ...settings, enableCardPayment: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Chapa Payment</p>
              <p className="text-sm text-muted-foreground">Allow Chapa mobile money payments</p>
            </div>
            <Switch
              checked={settings.enableChapa}
              onCheckedChange={(checked) => setSettings({ ...settings, enableChapa: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Enable Prepaid/Manual Payment</p>
              <p className="text-sm text-muted-foreground">Allow manual payment approval</p>
            </div>
            <Switch
              checked={settings.enablePrepaid}
              onCheckedChange={(checked) => setSettings({ ...settings, enablePrepaid: checked })}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="h-12 rounded-xl gap-2 px-6">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

