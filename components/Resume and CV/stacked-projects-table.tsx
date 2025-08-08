import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Trash2, Copy, MoreHorizontal } from "lucide-react";
import { useState } from "react";

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
    <div className="bg-[#0c1a0c]/80 rounded-2xl shadow-lg border border-[#233023] mt-8 overflow-x-auto transition-all duration-200">
      <div className="p-4 border-b border-[#1a281a]">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-white font-inter tracking-tight">
            All projects
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border-[#233023] text-[#f3f4f6] hover:bg-[#192a19]/50 hover:text-green-500 focus-visible:ring-green-500"
              >
                More
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0c1a0c] border-[#233023] text-[#f3f4f6]">
              <DropdownMenuItem className="hover:bg-[#192a19]/50 hover:text-green-500 focus:bg-[#192a19]/50 focus:text-green-500">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#192a19]/50 hover:text-green-500 focus:bg-[#192a19]/50 focus:text-green-500">
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
            <TableHead className="text-base font-semibold text-[#9ca3af] align-middle">Title</TableHead>
            <TableHead className="text-base font-semibold text-[#9ca3af] align-middle">Owner</TableHead>
            <TableHead className="text-base font-semibold text-[#9ca3af] align-middle">Last modified</TableHead>
            <TableHead className="text-base font-semibold text-[#9ca3af] align-middle text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="hover:bg-[#192a19]/70 hover:shadow-green-500/10 transition-all duration-200"
            >
              <TableCell className="w-12 align-middle">
                <Checkbox 
                  checked={selectedItems.includes(project.id)}
                  onCheckedChange={(checked : any) => handleSelectItem(project.id, checked as boolean)}
                  aria-label={`Select ${project.title}`} 
                />
              </TableCell>
              <TableCell className="text-base text-white font-inter">
                {project.title}
              </TableCell>
              <TableCell className="text-base text-[#f3f4f6] font-inter">
                {project.owner}
              </TableCell>
              <TableCell className="text-base text-[#f3f4f6] font-inter">
                {project.lastModified}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" aria-label="Duplicate project"
                  className="text-[#f3f4f6] hover:text-green-500 hover:bg-transparent focus-visible:ring-green-500"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Download project"
                  className="text-[#f3f4f6] hover:text-green-500 hover:bg-transparent focus-visible:ring-green-500"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Delete project"
                  className="text-[#f3f4f6] hover:text-green-500 hover:bg-transparent focus-visible:ring-green-500"
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
