import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Download, Trash2 } from "lucide-react";
import { SavedResumeData } from "@/types/resume";

interface ProjectItem {
  id: string;
  title: string;
  owner: string;
  lastModified: string;
  isTemplate?: boolean;
  resumeData?: SavedResumeData;
}

interface StackedProjectsTableProps {
  projects: ProjectItem[];
  onProjectClick?: (project: ProjectItem) => void;
  onDelete?: (projectId: string) => void;
  onBulkDelete?: (projectIds: string[]) => void;
}

export const StackedProjectsTable = ({ projects, onProjectClick, onDelete, onBulkDelete }: StackedProjectsTableProps) => {
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

  const handleDeleteSingle = (projectId: string, projectTitle: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`);
    if (confirmed && onDelete) {
      onDelete(projectId);
      // Remove from selection if it was selected
      setSelectedItems(prev => prev.filter(id => id !== projectId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedItems.length} selected project${selectedItems.length > 1 ? 's' : ''}? This action cannot be undone.`);
    if (confirmed && onBulkDelete) {
      onBulkDelete(selectedItems);
      setSelectedItems([]);
    }
  };

  const isAllSelected = selectedItems.length === projects.length && projects.length > 0;

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-sm p-6 mb-10 border border-border/60 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <h3 className="text-2xl font-semibold tracking-tight">All Documents</h3>
        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <Button 
              variant="destructive"
              size="sm"
              className="rounded-lg shadow-sm"
              onClick={handleBulkDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete {selectedItems.length}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="rounded-lg border border-border text-sm"
              >
                More
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl shadow-lg border border-border bg-popover">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow
                key={project.id}
                className="hover:bg-muted/70 hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
                onClick={() => onProjectClick && onProjectClick(project)}
              >
                <TableCell className="w-12 align-middle">
                  <Checkbox 
                    checked={selectedItems.includes(project.id)}
                    onCheckedChange={(checked: boolean | string) => handleSelectItem(project.id, checked as boolean)}
                    aria-label={`Select ${project.title}`} 
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="text-base text-card-foreground font-inter">
                  {project.title} {!project.isTemplate && (
                    <span className="text-xs text-blue-600 ml-2">(Saved)</span>
                  )}
                </TableCell>
                <TableCell className="text-base text-muted-foreground font-inter">
                  {project.owner}
                </TableCell>
                <TableCell className="text-base text-muted-foreground font-inter">
                  {project.lastModified}
                </TableCell>
                <TableCell className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
                    onClick={() => handleDeleteSingle(project.id, project.title)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No documents found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};