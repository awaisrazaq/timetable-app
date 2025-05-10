import TimetableEvent from "./TimetableEvent";

export default function TimetableGrid({ events, onEditEvent, onDeleteEvent }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7 AM to 8 PM

  const getEventsForDayAndHour = (day, hour) => {
    return events.filter(
      (event) =>
        event.day === day &&
        Number.parseInt(event.startTime.split(":")[0]) <= hour &&
        Number.parseInt(event.endTime.split(":")[0]) > hour,
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-1">
          <div className="bg-gray-100 p-2 font-semibold"></div>
          {days.map((day) => (
            <div key={day} className="bg-gray-100 p-2 font-semibold text-center">
              {day}
            </div>
          ))}

          {hours.map((hour) => (
            <div key={`hour-${hour}`}>
              <div  className="p-2 border-t text-right text-sm text-gray-500">
                {hour}:00
              </div>

              {days.map((day) => (
                <div key={`${day}-${hour}`} className="border border-gray-200 p-1 min-h-[60px]">
                  {getEventsForDayAndHour(day, hour).map((event) => (
                    <TimetableEvent
                      key={event.id}
                      event={event}
                      onEdit={() => onEditEvent(event)}
                      onDelete={() => onDeleteEvent(event.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
