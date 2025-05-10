import { useState } from "react"

// Simple custom Select component
const Select = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// Simple Input component
const Input = ({ type, name, value, onChange, className, required }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded ${className || ""}`}
      required={required}
    />
  )
}

// Simple Button component
const Button = ({ type, children }) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  )
}

export default function EventForm({onSubmit, initialValues}) {
  
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    day: initialValues?.day || "Monday",
    startTime: initialValues?.startTime || "09:00",
    endTime: initialValues?.endTime || "10:00",
    color: initialValues?.color || "#3b82f6",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: initialValues?.id || "",
    })
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Generate time options in 15-minute increments
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      label: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
    }
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Day</label>
        <Select
          name="day"
          value={formData.day}
          onChange={handleChange}
          options={days.map((day) => ({ value: day, label: day }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <Select 
            name="startTime" 
            value={formData.startTime} 
            onChange={handleChange} 
            options={timeOptions} 
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <Select 
            name="endTime" 
            value={formData.endTime} 
            onChange={handleChange} 
            options={timeOptions} 
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Color</label>
        <Input 
          type="color" 
          name="color" 
          value={formData.color} 
          onChange={handleChange} 
          className="h-10" 
        />
      </div>

      <Button type="submit">{initialValues ? "Update Event" : "Add Event"}</Button>
      
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Current Form Data:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </form>
  )
}