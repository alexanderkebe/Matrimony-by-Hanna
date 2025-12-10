import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
}

export function EventCard({ title, date, time, location }: EventCardProps) {
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="font-medium text-foreground mb-3">{title}</h3>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {date}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </p>
      </div>

      <Button className="w-full mt-4 rounded-xl bg-transparent" variant="outline">
        Add to Calendar
      </Button>
    </div>
  )
}
