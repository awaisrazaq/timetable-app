import { useState, useEffect } from "react"
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"
import Button from "../components/UI/Button"
import Select from "../components/UI/Select"

export default function Settings() {
  const [settings, setSettings] = useState({
    startHour: "8",
    endHour: "18",
    theme: "light",
    weekStartsOn: "monday",
  })

  useEffect(() => {
    const storedSettings = localStorage.getItem("timetableSettings")
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveSettings = () => {
    localStorage.setItem("timetableSettings", JSON.stringify(settings))
    alert("Settings saved successfully!")
  }

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all timetable data? This cannot be undone.")) {
      localStorage.removeItem("timetableEvents")
      alert("All timetable data has been cleared.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Timetable Settings</h2>

          <div className="grid gap-4 mb-6">
            <div>
              <label className="block mb-1">Start Hour</label>
              <Select
                name="startHour"
                value={settings.startHour}
                onChange={handleChange}
                options={Array.from({ length: 24 }, (_, i) => ({
                  value: i.toString(),
                  label: `${i}:00`,
                }))}
              />
            </div>

            <div>
              <label className="block mb-1">End Hour</label>
              <Select
                name="endHour"
                value={settings.endHour}
                onChange={handleChange}
                options={Array.from({ length: 24 }, (_, i) => ({
                  value: i.toString(),
                  label: `${i}:00`,
                }))}
              />
            </div>

            <div>
              <label className="block mb-1">Theme</label>
              <Select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ]}
              />
            </div>

            <div>
              <label className="block mb-1">Week Starts On</label>
              <Select
                name="weekStartsOn"
                value={settings.weekStartsOn}
                onChange={handleChange}
                options={[
                  { value: "monday", label: "Monday" },
                  { value: "sunday", label: "Sunday" },
                ]}
              />
            </div>
          </div>

          <Button onClick={saveSettings}>Save Settings</Button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <Button variant="danger" onClick={clearAllData}>
            Clear All Timetable Data
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
