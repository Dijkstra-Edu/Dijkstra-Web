import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Download, Trash2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  owner: string;
  lastModified: string;
}

interface StackedProjectsTableProps {
  projects: ProjectItem[];
}

export const StackedProjectsTable = ({ projects }: StackedProjectsTableProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(projects.map(project => project.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (projectId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, projectId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== projectId));
    }
  };

  const isAllSelected = selectedItems.length === projects.length && projects.length > 0;

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md p-6 mt-8 transition-colors duration-300">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-card-foreground font-inter tracking-tight">
            All projects
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border-border text-card-foreground hover:bg-muted/50 hover:text-primary focus-visible:ring-primary"
              >
                More
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border text-card-foreground">
              <DropdownMenuItem className="hover:bg-muted/50 hover:text-primary focus:bg-muted/50 focus:text-primary">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted/50 hover:text-primary focus:bg-muted/50 focus:text-primary">
                Make a copy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 align-middle">
              <Checkbox 
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all" 
              />
            </TableHead>
            <TableHead className="text-base font-semibold text-muted-foreground align-middle">Title</TableHead>
            <TableHead className="text-base font-semibold text-muted-foreground align-middle">Owner</TableHead>
            <TableHead className="text-base font-semibold text-muted-foreground align-middle">Last modified</TableHead>
            <TableHead className="text-base font-semibold text-muted-foreground align-middle text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="hover:bg-muted/70 hover:shadow-primary/10 transition-all duration-200"
            >
              <TableCell className="w-12 align-middle">
                <Checkbox 
                  checked={selectedItems.includes(project.id)}
                  onCheckedChange={(checked : any) => handleSelectItem(project.id, checked as boolean)}
                  aria-label={`Select ${project.title}`} 
                />
              </TableCell>
              <TableCell className="text-base text-card-foreground font-inter">
                {project.title}
              </TableCell>
              <TableCell className="text-base text-muted-foreground font-inter">
                {project.owner}
              </TableCell>
              <TableCell className="text-base text-muted-foreground font-inter">
                {project.lastModified}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" aria-label="Duplicate project"
                  className="text-card-foreground hover:text-primary hover:bg-transparent focus-visible:ring-primary"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Download project"
                  className="text-card-foreground hover:text-primary hover:bg-transparent focus-visible:ring-primary"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Delete project"
                  className="text-card-foreground hover:text-primary hover:bg-transparent focus-visible:ring-primary"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};