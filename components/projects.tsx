"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, ExternalLink, Github, Code, Save, X, Trash2 } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  startDate: string
  endDate: string
  status: "completed" | "in-progress" | "planned"
}

export function Projects() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies and deployed on cloud infrastructure.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.alexjohnson.dev",
      startDate: "2024-03",
      endDate: "2024-06",
      status: "completed",
    },
    {
      id: "2",
      name: "AI Chat Assistant",
      description:
        "Intelligent chatbot using natural language processing to provide customer support. Implements machine learning models for intent recognition and response generation.",
      technologies: ["Python", "TensorFlow", "Flask", "React", "Docker"],
      githubUrl: "https://github.com/alexjohnson/ai-chat-assistant",
      liveUrl: "",
      startDate: "2024-07",
      endDate: "",
      status: "in-progress",
    },
    {
      id: "3",
      name: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Tailwind CSS"],
      githubUrl: "https://github.com/alexjohnson/task-manager",
      liveUrl: "https://tasks.alexjohnson.dev",
      startDate: "2024-01",
      endDate: "2024-03",
      status: "completed",
    },
  ])

  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    technologies: [],
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: "",
    status: "planned",
  })
  const [tempProject, setTempProject] = useState<Project | null>(null)

  const handleAdd = () => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    }
    setProjects([...projects, project])
    setNewProject({
      name: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      startDate: "",
      endDate: "",
      status: "planned",
    })
    setIsAdding(false)
  }

  const handleEdit = (project: Project) => {
    setTempProject({ ...project })
    setEditingId(project.id)
  }

  const handleSave = () => {
    if (tempProject) {
      setProjects(projects.map((proj) => (proj.id === tempProject.id ? tempProject : proj)))
    }
    setEditingId(null)
    setTempProject(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempProject(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
  }

  const handleTechnologiesChange = (techString: string, isTemp = false) => {
    const techArray = techString
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech)
    if (isTemp && tempProject) {
      setTempProject({ ...tempProject, technologies: techArray })
    } else {
      setNewProject({ ...newProject, technologies: techArray })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planned":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Projects
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant={isEditing ? "destructive" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit"}
            </Button>
            <Button size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isAdding && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
              <h4 className="font-semibold">Add New Project</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
                <Select
                  value={newProject.status}
                  onValueChange={(value: any) => setNewProject({ ...newProject, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="month"
                  placeholder="Start Date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                />
                <Input
                  type="month"
                  placeholder="End Date (optional)"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                />
                <Input
                  placeholder="GitHub URL"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                />
                <Input
                  placeholder="Live URL (optional)"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <Input
                placeholder="Technologies (comma-separated)"
                value={newProject.technologies.join(", ")}
                onChange={(e) => handleTechnologiesChange(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 space-y-4">
                {editingId === project.id && tempProject ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={tempProject.name}
                        onChange={(e) => setTempProject({ ...tempProject, name: e.target.value })}
                      />
                      <Select
                        value={tempProject.status}
                        onValueChange={(value: any) => setTempProject({ ...tempProject, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="month"
                        value={tempProject.startDate}
                        onChange={(e) => setTempProject({ ...tempProject, startDate: e.target.value })}
                      />
                      <Input
                        type="month"
                        value={tempProject.endDate}
                        onChange={(e) => setTempProject({ ...tempProject, endDate: e.target.value })}
                      />
                      <Input
                        value={tempProject.githubUrl}
                        onChange={(e) => setTempProject({ ...tempProject, githubUrl: e.target.value })}
                      />
                      <Input
                        value={tempProject.liveUrl}
                        onChange={(e) => setTempProject({ ...tempProject, liveUrl: e.target.value })}
                      />
                    </div>
                    <Textarea
                      value={tempProject.description}
                      onChange={(e) => setTempProject({ ...tempProject, description: e.target.value })}
                    />
                    <Input
                      placeholder="Technologies (comma-separated)"
                      value={tempProject.technologies.join(", ")}
                      onChange={(e) => handleTechnologiesChange(e.target.value, true)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{project.name}</h4>
                        <div className="flex items-center gap-2">
                          {isEditing && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(project.startDate)} -{" "}
                        {project.status === "in-progress" ? "Present" : formatDate(project.endDate)}
                      </p>
                    </div>

                    <p className="text-muted-foreground text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
