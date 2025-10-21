"use client"
import { useEffect, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "./ui/command"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, Plus, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Location {
  city: string
  state?: string
  country: string
  latitude?: number
  longitude?: number
}

interface LocationData {
  city: string
  state?: string
  country: string
  latitude?: number
  longitude?: number
}

interface LocationAutoCompleteProps {
  value: string
  onChange: (location: LocationData) => void
  selectedLocation?: LocationData | null
}

export function LocationAutoComplete({ value, onChange, selectedLocation }: LocationAutoCompleteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value||"")
  const [locations, setLocations] = useState<Location[]>([])

  // Check if query matches any existing location exactly
  const exactMatch = locations.find(l => 
    l.city.toLowerCase() === query.toLowerCase() && 
    l.country.toLowerCase() === query.toLowerCase()
  )
  const showCustomOption = query.trim() && !exactMatch

  useEffect(()=>{
    if(!query){ 
      setLocations([])
      return
    }

    const timeout = setTimeout(() => {
      fetch(`/api/locations?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data)=> {
          if (Array.isArray(data)) {
            setLocations(data)
          } else {
            setLocations([])
          }
        })
        .catch((err)=> {
          console.error("Location search error:", err)
          setLocations([])
        })
    },300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleCustomLocation = () => {
    const customLocation: LocationData = {
      city: query.trim(),
      country: "",
      latitude: undefined,
      longitude: undefined
    }
    onChange(customLocation)
    setQuery(query.trim())
    setOpen(false)
  }

  const formatLocationDisplay = (location: Location) => {
    if (location.state) {
      return `${location.city}, ${location.state}, ${location.country}`
    }
    return `${location.city}, ${location.country}`
  }

  const formatSelectedLocation = (location: LocationData) => {
    if (location.state) {
      return `${location.city}, ${location.state}, ${location.country}`
    }
    return `${location.city}, ${location.country}`
  }

  return (

    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[300px] justify-between">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">
                        {selectedLocation ? formatSelectedLocation(selectedLocation) : value || "Select location..."}
                    </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[300px] p-0 bg-popover text-popover-foreground border">
            <Command className="bg-popover text-popover-foreground">
                <CommandInput placeholder="Search location..." value={query} onValueChange={setQuery} className="text-foreground" />
                <CommandList className="bg-popover text-popover-foreground">
                    {locations.length === 0 && !showCustomOption && query && (
                        <CommandEmpty>No location found.</CommandEmpty>
                    )}
                    
                    {locations.length > 0 && (
                        <CommandGroup heading="Locations">
                            {locations.map((location: Location, index: number) => (
                                <CommandItem 
                                    key={`${location.city}-${location.country}-${index}`}
                                    value={formatLocationDisplay(location)}
                                    onSelect={(currentValue) => {
                                        const selectedLocationData: LocationData = {
                                            city: location.city,
                                            state: location.state,
                                            country: location.country,
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }
                                        onChange(selectedLocationData)
                                        setQuery(formatLocationDisplay(location))
                                        setOpen(false)
                                    }} 
                                    className="flex items-center gap-2 hover:bg-accent"
                                >
                                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                    <span className="flex-1 truncate">{formatLocationDisplay(location)}</span>
                                    <Check className={cn("ml-auto h-4 w-4", 
                                        selectedLocation?.city === location.city && 
                                        selectedLocation?.country === location.country ? "opacity-100" : "opacity-0"
                                    )} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    
                    {showCustomOption && (
                        <CommandGroup heading={locations.length > 0 ? "Or create new" : "Create new"}>
                            <CommandItem
                                onSelect={handleCustomLocation}
                                className="flex items-center gap-2 text-primary hover:bg-accent"
                            >
                                <Plus className="w-5 h-5" />
                                "{query.trim()}" 
                            </CommandItem>
                        </CommandGroup>
                    )}
                </CommandList>
            </Command>
        </PopoverContent>

    </Popover>
  )
 
}
