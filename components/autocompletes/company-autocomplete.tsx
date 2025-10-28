"use client"
import { useEffect, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from "../ui/command"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Company {
  name: string
  domain?: string
  logo_url?: string
}

interface CompanyData {
  name: string
  domain?: string
  logo_url?: string
}

interface CompanyAutoCompleteProps {
  value: string
  onChange: (company: CompanyData) => void
  selectedCompany?: CompanyData | null
}

export function CompanyAutoComplete({ value, onChange, selectedCompany }: CompanyAutoCompleteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value||"")
  const [companies, setCompanies] = useState<Company[]>([])

  // Check if query matches any existing company exactly
  const exactMatch = companies.find(c => c.name.toLowerCase() === query.toLowerCase())
  const showCustomOption = query.trim() && !exactMatch

  useEffect(()=>{
    if(!query){ 
      setCompanies([])
      return
    }

    const timeout = setTimeout(() => {
      fetch(`/api/companies?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data)=> {
          if (Array.isArray(data)) {
            setCompanies(data)
          } else {
            setCompanies([])
          }
        })
        .catch((err)=> {
          console.error("Company search error:", err)
          setCompanies([])
        })
    },300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleCustomCompany = () => {
    const customCompany: CompanyData = {
      name: query.trim(),
      domain: "",
      logo_url: ""
    }
    onChange(customCompany)
    setQuery(query.trim())
    setOpen(false)
  }


  return (

    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[300px] justify-between">
                <div className="flex items-center gap-2">
                    {selectedCompany?.logo_url ? (
                        <img 
                            src={selectedCompany.logo_url} 
                            alt={`${selectedCompany.name} logo`}
                            className="w-4 h-4 object-contain"
                        />
                    ) : selectedCompany ? (
                        <div className="w-4 h-4 rounded bg-muted flex items-center justify-center text-xs font-semibold">
                            {selectedCompany.name.charAt(0).toUpperCase()}
                        </div>
                    ) : null}
                    <span className="truncate">
                        {selectedCompany?.name || value || "Select company..."}
                    </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[300px] p-0 bg-popover text-popover-foreground border">
            <Command className="bg-popover text-popover-foreground">
                <CommandInput placeholder="Search company..." value={query} onValueChange={setQuery} className="text-foreground" />
                <CommandList className="bg-popover text-popover-foreground">
                    {companies.length === 0 && !showCustomOption && query && (
                        <CommandEmpty>No company found.</CommandEmpty>
                    )}
                    
                    {companies.length > 0 && (
                        <CommandGroup heading="Companies">
                            {companies.map((company: Company) => (
                                <CommandItem 
                                    key={company.domain || company.name} 
                                    value={company.name} 
                                    onSelect={(currentValue) => {
                                        const selectedCompanyData: CompanyData = {
                                            name: company.name,
                                            domain: company.domain,
                                            logo_url: company.logo_url
                                        }
                                        onChange(selectedCompanyData)
                                        setQuery(company.name)
                                        setOpen(false)
                                    }} 
                                    className="flex items-center gap-2 hover:bg-accent  "
                                >
                                    {company.logo_url ? (
                                        <img 
                                            src={company.logo_url} 
                                            alt={`${company.name} logo`}
                                            className="w-5 h-5 object-contain flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-semibold">
                                          {company.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="flex-1 truncate">{company.name}</span>
                                    <Check className={cn("ml-auto h-4 w-4", 
                                        selectedCompany?.name === company.name ? "opacity-100" : "opacity-0"
                                    )} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    
                    {showCustomOption && (
                        <CommandGroup heading={companies.length > 0 ? "Or create new" : "Create new"}>
                            <CommandItem
                                onSelect={handleCustomCompany}
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