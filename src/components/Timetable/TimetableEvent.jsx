export default function TimetableEvent({ event, onEdit, onDelete }) {
  const getEventDuration = () => {
    const startHour = Number.parseInt(event.startTime.split(":")[0])
    const startMinute = Number.parseInt(event.startTime.split(":")[1])
    const endHour = Number.parseInt(event.endTime.split(":")[0])
    const endMinute = Number.parseInt(event.endTime.split(":")[1])

    const start = startHour + startMinute / 60
    const end = endHour + endMinute / 60

    return `${event.startTime} - ${event.endTime}`
  }

  return (
    <div className="bg-blue-100 p-2 rounded mb-1 text-sm">
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs text-gray-600">{getEventDuration()}</div>
      <div className="flex mt-1 space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-xs bg-red-500 text-white px-2 py-0.5 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
