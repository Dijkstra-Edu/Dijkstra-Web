"use client"
import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { DOMAIN_OPTIONS } from "@/constants/enum-constants"
import type { Domain } from "@/types/client/profile-section/profile-sections"

interface DomainMultiSelectProps {
  value: Domain[]
  onChange: (domains: Domain[]) => void
  placeholder?: string
  disabled?: boolean
}

export function DomainMultiSelect({ 
  value, 
  onChange, 
  placeholder = "Select domains...",
  disabled = false 
}: DomainMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const selectedDomains = value || []
  
  // Filter domains based on query
  const filteredDomains = DOMAIN_OPTIONS.filter(domain =>
    domain.label.toLowerCase().includes(query.toLowerCase()) &&
    !selectedDomains.includes(domain.value)
  )

  const handleSelect = (domainValue: Domain) => {
    if (!selectedDomains.includes(domainValue)) {
      onChange([...selectedDomains, domainValue])
    }
    setQuery("")
  }

  const handleRemove = (domainValue: Domain) => {
    onChange(selectedDomains.filter(domain => domain !== domainValue))
  }

  const formatDisplayText = () => {
    if (selectedDomains.length === 0) return placeholder
    if (selectedDomains.length === 1) {
      const domain = DOMAIN_OPTIONS.find(d => d.value === selectedDomains[0])
      return domain?.label || selectedDomains[0]
    }
    return `${selectedDomains.length} domains selected`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          className="w-full justify-between min-h-[40px] h-auto"
          disabled={disabled}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedDomains.length > 0 ? (
                selectedDomains.map((domainValue) => {
                  const domain = DOMAIN_OPTIONS.find(d => d.value === domainValue)
                  return (
                    <Badge 
                      key={domainValue} 
                      variant="secondary" 
                      className="text-xs px-2 py-1"
                    >
                      {domain?.label || domainValue}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(domainValue)
                        }}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </div>
                    </Badge>
                  )
                })
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-full p-0 bg-popover text-popover-foreground border">
        <Command className="bg-popover text-popover-foreground">
          <CommandInput 
            placeholder="Search domains..." 
            value={query} 
            onValueChange={setQuery} 
            className="text-foreground" 
          />
          <CommandList className="bg-popover text-popover-foreground">
            {filteredDomains.length === 0 && query && (
              <CommandEmpty>No domains found.</CommandEmpty>
            )}
            
            {filteredDomains.length > 0 && (
              <CommandGroup heading="Available Domains">
                {filteredDomains.map((domain) => (
                  <CommandItem 
                    key={domain.value}
                    value={domain.label}
                    onSelect={() => handleSelect(domain.value)}
                    className="flex items-center gap-2 hover:bg-accent"
                  >
                    <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="flex-1">{domain.label}</span>
                    <Check className={cn("ml-auto h-4 w-4", 
                      selectedDomains.includes(domain.value) ? "opacity-100" : "opacity-0"
                    )} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
