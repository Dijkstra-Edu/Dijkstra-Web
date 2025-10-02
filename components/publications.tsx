"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, BookOpen, ExternalLink, Save, X, Trash2 } from "lucide-react"

interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  publishDate: string
  doi: string
  url: string
  abstract: string
  keywords: string[]
  type: "journal" | "conference" | "preprint" | "book-chapter"
}

export function Publications() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: "1",
      title: "Machine Learning Approaches for Natural Language Processing in Educational Applications",
      authors: ["Alex Johnson", "Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      journal: "Journal of Educational Technology Research",
      publishDate: "2024-04",
      doi: "10.1234/jetr.2024.001",
      url: "https://journal.example.com/article/ml-nlp-education",
      abstract:
        "This paper explores the application of machine learning techniques to natural language processing tasks in educational contexts. We present novel approaches for automated essay scoring and intelligent tutoring systems.",
      keywords: ["Machine Learning", "Natural Language Processing", "Education Technology", "Automated Assessment"],
      type: "journal",
    },
    {
      id: "2",
      title: "Optimizing Database Query Performance in Distributed Systems",
      authors: ["Alex Johnson", "Dr. Lisa Wang"],
      journal: "International Conference on Database Systems",
      publishDate: "2024-02",
      doi: "10.1234/icds.2024.042",
      url: "https://conference.example.com/paper/db-optimization",
      abstract:
        "We propose a novel algorithm for optimizing database queries in distributed environments, achieving significant performance improvements over existing methods.",
      keywords: ["Database Systems", "Query Optimization", "Distributed Computing", "Performance"],
      type: "conference",
    },
  ])

  const [tempPublication, setTempPublication] = useState<Partial<Publication>>({})

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "journal":
        return "bg-blue-500"
      case "conference":
        return "bg-green-500"
      case "preprint":
        return "bg-yellow-500"
      case "book-chapter":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "journal":
        return "Journal Article"
      case "conference":
        return "Conference Paper"
      case "preprint":
        return "Preprint"
      case "book-chapter":
        return "Book Chapter"
      default:
        return "Publication"
    }
  }

  const handleEdit = (pub: Publication) => {
    setEditingId(pub.id)
    setTempPublication({ ...pub })
  }

  const handleSave = () => {
    if (editingId && tempPublication.id) {
      setPublications(publications.map((pub) => (pub.id === editingId ? { ...(tempPublication as Publication) } : pub)))
      setEditingId(null)
      setTempPublication({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempPublication({})
  }

  const handleDelete = (id: string) => {
    setPublications(publications.filter((pub) => pub.id !== id))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setTempPublication({
      id: Date.now().toString(),
      title: "",
      authors: [],
      journal: "",
      publishDate: "",
      doi: "",
      url: "",
      abstract: "",
      keywords: [],
      type: "journal",
    })
  }

  const handleAddSave = () => {
    if (tempPublication.title && tempPublication.journal) {
      setPublications([...publications, tempPublication as Publication])
      setIsAdding(false)
      setTempPublication({})
    }
  }

  const handleAddCancel = () => {
    setIsAdding(false)
    setTempPublication({})
  }

  const updateTempPublication = (field: keyof Publication, value: any) => {
    setTempPublication((prev) => ({ ...prev, [field]: value }))
  }

  const renderEditForm = (pub: Publication) => (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
      <div className="space-y-3">
        <Input
          value={tempPublication.title || ""}
          onChange={(e) => updateTempPublication("title", e.target.value)}
          placeholder="Publication title"
          className="font-semibold"
        />
        <Input
          value={tempPublication.authors?.join(", ") || ""}
          onChange={(e) => updateTempPublication("authors", e.target.value.split(", "))}
          placeholder="Authors (comma separated)"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={tempPublication.journal || ""}
            onChange={(e) => updateTempPublication("journal", e.target.value)}
            placeholder="Journal/Conference"
          />
          <Input
            type="month"
            value={tempPublication.publishDate || ""}
            onChange={(e) => updateTempPublication("publishDate", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={tempPublication.doi || ""}
            onChange={(e) => updateTempPublication("doi", e.target.value)}
            placeholder="DOI"
          />
          <Select
            value={tempPublication.type || "journal"}
            onValueChange={(value) => updateTempPublication("type", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journal">Journal Article</SelectItem>
              <SelectItem value="conference">Conference Paper</SelectItem>
              <SelectItem value="preprint">Preprint</SelectItem>
              <SelectItem value="book-chapter">Book Chapter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          value={tempPublication.url || ""}
          onChange={(e) => updateTempPublication("url", e.target.value)}
          placeholder="Publication URL"
        />
        <Textarea
          value={tempPublication.abstract || ""}
          onChange={(e) => updateTempPublication("abstract", e.target.value)}
          placeholder="Abstract"
          rows={3}
        />
        <Input
          value={tempPublication.keywords?.join(", ") || ""}
          onChange={(e) => updateTempPublication("keywords", e.target.value.split(", "))}
          placeholder="Keywords (comma separated)"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button size="sm" variant="destructive" onClick={handleCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Publications
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant={isEditing ? "destructive" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleAdd}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isAdding && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
              <h4 className="font-semibold">Add New Publication</h4>
              {renderEditForm({} as Publication)}
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Publication
                </Button>
                <Button size="sm" variant="destructive" onClick={handleAddCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {publications.map((pub) => (
            <div key={pub.id}>
              {editingId === pub.id ? (
                renderEditForm(pub)
              ) : (
                <div className="border rounded-lg p-4 space-y-4">
                  {isEditing && (
                    <div className="flex gap-2 mb-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(pub)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(pub.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg leading-tight">{pub.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{pub.authors.join(", ")}</p>
                      </div>
                      <Badge className={`${getTypeColor(pub.type)} text-white`}>{getTypeLabel(pub.type)}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium">{pub.journal}</span>
                      <span>{formatDate(pub.publishDate)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{pub.abstract}</p>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {pub.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">DOI: {pub.doi}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={pub.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Paper
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
