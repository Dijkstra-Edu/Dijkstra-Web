"use client"
import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { TOOLS_OPTIONS } from "@/constants/enum-constants"
import type { Tools } from "@/types/client/profile-section/profile-sections"

interface ToolsMultiSelectProps {
  value: Tools[]
  onChange: (tools: Tools[]) => void
  placeholder?: string
  disabled?: boolean
}

export function ToolsMultiSelect({ 
  value, 
  onChange, 
  placeholder = "Select tools...",
  disabled = false 
}: ToolsMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const selectedTools = value || []
  
  // Filter tools based on query
  const filteredTools = TOOLS_OPTIONS.filter(tool =>
    tool.label.toLowerCase().includes(query.toLowerCase()) &&
    !selectedTools.includes(tool.value)
  )

  const handleSelect = (toolValue: Tools) => {
    if (!selectedTools.includes(toolValue)) {
      onChange([...selectedTools, toolValue])
    }
    setQuery("")
  }

  const handleRemove = (toolValue: Tools) => {
    onChange(selectedTools.filter(tool => tool !== toolValue))
  }

  const formatDisplayText = () => {
    if (selectedTools.length === 0) return placeholder
    if (selectedTools.length === 1) {
      const tool = TOOLS_OPTIONS.find(t => t.value === selectedTools[0])
      return tool?.label || selectedTools[0]
    }
    return `${selectedTools.length} tools selected`
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
            <Wrench className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedTools.length > 0 ? (
                selectedTools.map((toolValue) => {
                  const tool = TOOLS_OPTIONS.find(t => t.value === toolValue)
                  return (
                    <Badge 
                      key={toolValue} 
                      variant="secondary" 
                      className="text-xs px-2 py-1"
                    >
                      {tool?.label || toolValue}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(toolValue)
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
            placeholder="Search tools..." 
            value={query} 
            onValueChange={setQuery} 
            className="text-foreground" 
          />
          <CommandList className="bg-popover text-popover-foreground">
            {filteredTools.length === 0 && query && (
              <CommandEmpty>No tools found.</CommandEmpty>
            )}
            
            {filteredTools.length > 0 && (
              <CommandGroup heading="Available Tools">
                {filteredTools.map((tool) => (
                  <CommandItem 
                    key={tool.value}
                    value={tool.label}
                    onSelect={() => handleSelect(tool.value)}
                    className="flex items-center gap-2 hover:bg-accent"
                  >
                    <Wrench className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="flex-1">{tool.label}</span>
                    <Check className={cn("ml-auto h-4 w-4", 
                      selectedTools.includes(tool.value) ? "opacity-100" : "opacity-0"
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
