import { useState, useEffect } from "react"
import TimetableGrid from "@/components/Timetable/TimetableGrid"
import Footer from "@/components/Layout/Footer"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import EventForm from "@/components/Timetable/EventForm"

export default function Home() {
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    const storedEvents = localStorage.getItem("timetableEvents")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents)
    localStorage.setItem("timetableEvents", JSON.stringify(updatedEvents))
  }

  const handleAddEvent = (event) => {
    const newEvents = [...events, { ...event, id: Date.now().toString() }]
    saveEvents(newEvents)
    setIsModalOpen(false)
  }

  const handleEditEvent = (event) => {
    const newEvents = events.map((e) => (e.id === event.id ? event : e))
    saveEvents(newEvents)
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (id) => {
    const newEvents = events.filter((event) => event.id !== id)
    saveEvents(newEvents)
  }

  const openEditModal = (event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Timetable Manager</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Event</Button>
        </div>
        <TimetableGrid events={events} onEditEvent={openEditModal} onDeleteEvent={handleDeleteEvent} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
          }}
          title={editingEvent ? "Edit Event" : "Add New Event"}
        >
          <EventForm
            onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
            initialValues={editingEvent || undefined}
          />
        </Modal>
      </main>
      <Footer />
    </div>
  )
}
