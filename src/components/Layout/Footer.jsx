export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>Timetable Manager &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
