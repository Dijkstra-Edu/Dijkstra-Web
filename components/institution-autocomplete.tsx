"use client"
import { useEffect, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "./ui/command"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Institution {
  name: string
  domain?: string
  logo_url?: string
}

interface InstitutionData {
  name: string
  domain?: string
  logo_url?: string
}

interface InstitutionAutoCompleteProps {
  apiKey: string
  value: string
  onChange: (institution: InstitutionData) => void
  selectedInstitution?: InstitutionData | null
}

export function InstitutionAutoComplete({ apiKey, value, onChange, selectedInstitution }: InstitutionAutoCompleteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value||"")
  const [institutions, setInstitutions] = useState<Institution[]>([])

  // Check if query matches any existing institution exactly
  const exactMatch = institutions.find(c => c.name.toLowerCase() === query.toLowerCase())
  const showCustomOption = query.trim() && !exactMatch

  useEffect(()=>{
    if(!query){ 
      setInstitutions([])
      return
    }

    const timeout = setTimeout(() => {
      fetch(`https://api.logo.dev/search?q=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then((res) => res.json()).then((data)=> {
        // The API returns an array of institutions with logo URLs
        if (Array.isArray(data)) {
          setInstitutions(data.map((institution: any) => ({
            name: institution.name,
            domain: institution.domain,
            logo_url: institution.logo_url
          })))
        } else {
          setInstitutions([])
        }
      }).catch((err)=> {
        console.error("Logo.dev error:", err)
        setInstitutions([])
      })
    },300)

    return () => clearTimeout(timeout)
  }, [query, apiKey])

  const handleCustomInstitution = () => {
    const customInstitution: InstitutionData = {
      name: query.trim(),
      domain: "",
      logo_url: ""
    }
    onChange(customInstitution)
    setQuery(query.trim())
    setOpen(false)
  }


  return (

    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[300px] justify-between">
                <div className="flex items-center gap-2">
                    {selectedInstitution?.logo_url ? (
                        <img 
                            src={selectedInstitution.logo_url} 
                            alt={`${selectedInstitution.name} logo`}
                            className="w-4 h-4 object-contain"
                        />
                    ) : selectedInstitution ? (
                        <div className="w-4 h-4 rounded bg-muted flex items-center justify-center text-xs font-semibold">
                            {selectedInstitution.name.charAt(0).toUpperCase()}
                        </div>
                    ) : null}
                    <span className="truncate">
                        {selectedInstitution?.name || value || "Select institution..."}
                    </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[300px] p-0 bg-background border">
            <Command className="bg-background">
                <CommandInput placeholder="Search institution..."  value={query} onValueChange={setQuery} className="text-foreground" />
                <CommandList className="bg-background">
                    {institutions.length === 0 && !showCustomOption && query && (
                        <CommandEmpty>No institution found.</CommandEmpty>
                    )}
                    
                    {institutions.length > 0 && (
                        <CommandGroup heading="Institutions">
                            {institutions.map((institution: Institution) => (
                                <CommandItem 
                                    key={institution.domain || institution.name} 
                                    value={institution.name} 
                                    onSelect={(currentValue) => {
                                        const selectedInstitutionData: InstitutionData = {
                                            name: institution.name,
                                            domain: institution.domain,
                                            logo_url: institution.logo_url
                                        }
                                        onChange(selectedInstitutionData)
                                        setQuery(institution.name)
                                        setOpen(false)
                                    }} 
                                    className="flex items-center gap-2 hover:bg-accent  "
                                >
                                    {institution.logo_url ? (
                                        <img 
                                            src={institution.logo_url} 
                                            alt={`${institution.name} logo`}
                                            className="w-5 h-5 object-contain flex-shrink-0"
                                        />
                                    ) : (
                                         <img
                        src={`/abstract-geometric-shapes.png?key=kh3mj&height=48&width=48&query=${encodeURIComponent(`${institutions[0]?.name} institution logo`)}`}
                        alt={`${institutions[0]?.name} logo`}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                                    )}
                                    <span className="flex-1 truncate">{institution.name}</span>
                                    <Check className={cn("ml-auto h-4 w-4", 
                                        selectedInstitution?.name === institution.name ? "opacity-100" : "opacity-0"
                                    )} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    
                    {showCustomOption && (
                        <CommandGroup heading={institutions.length > 0 ? "Or create new" : "Create new"}>
                            <CommandItem
                                onSelect={handleCustomInstitution}
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