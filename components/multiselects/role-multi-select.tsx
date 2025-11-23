"use client"
import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROLE_OPTIONS } from "@/constants/roles"
import type { Role } from "@/constants/roles"

interface RoleMultiSelectProps {
  value: string[]
  onChange: (roles: string[]) => void
  availableRoles: string[]
  placeholder?: string
  disabled?: boolean
}

export function RoleMultiSelect({ 
  value, 
  onChange, 
  availableRoles,
  placeholder = "Select roles...",
  disabled = false 
}: RoleMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const selectedRoles = value || []
  
  // Filter roles based on query and available roles
  const filteredRoles = ROLE_OPTIONS.filter(role =>
    availableRoles.includes(role.value) &&
    role.label.toLowerCase().includes(query.toLowerCase()) &&
    !selectedRoles.includes(role.value)
  )

  const handleSelect = (roleValue: Role) => {
    if (!selectedRoles.includes(roleValue)) {
      onChange([...selectedRoles, roleValue])
    }
    setQuery("")
  }

  const handleRemove = (roleValue: string) => {
    onChange(selectedRoles.filter(role => role !== roleValue))
  }

  const formatDisplayText = () => {
    if (selectedRoles.length === 0) return placeholder
    if (selectedRoles.length === 1) {
      const role = ROLE_OPTIONS.find(r => r.value === selectedRoles[0])
      return role?.label || selectedRoles[0]
    }
    return `${selectedRoles.length} roles selected`
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
            <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedRoles.length > 0 ? (
                selectedRoles.map((roleValue) => {
                  const role = ROLE_OPTIONS.find(r => r.value === roleValue)
                  return (
                    <Badge 
                      key={roleValue} 
                      variant="secondary" 
                      className="text-xs px-2 py-1"
                    >
                      {role?.label || roleValue}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(roleValue)
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
            placeholder="Search roles..." 
            value={query} 
            onValueChange={setQuery} 
            className="text-foreground" 
          />
          <CommandList className="bg-popover text-popover-foreground">
            {filteredRoles.length === 0 && query && (
              <CommandEmpty>No roles found.</CommandEmpty>
            )}
            
            {filteredRoles.length > 0 && (
              <CommandGroup heading="Available Roles">
                {filteredRoles.map((role) => (
                  <CommandItem 
                    key={role.value}
                    value={role.label}
                    onSelect={() => handleSelect(role.value)}
                    className="flex items-center gap-2 hover:bg-accent"
                  >
                    <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="flex-1">{role.label}</span>
                    <Check className={cn("ml-auto h-4 w-4", 
                      selectedRoles.includes(role.value) ? "opacity-100" : "opacity-0"
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

