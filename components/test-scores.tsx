"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Trophy, Save, X, Trash2 } from "lucide-react"

interface TestScore {
  id: string
  testName: string
  score: string
  maxScore: string
  percentile: number
  testDate: string
  sections: { name: string; score: string }[]
}

export function TestScores() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [testScores, setTestScores] = useState<TestScore[]>([
    {
      id: "1",
      testName: "GRE General Test",
      score: "325",
      maxScore: "340",
      percentile: 92,
      testDate: "2024-01",
      sections: [
        { name: "Verbal Reasoning", score: "160" },
        { name: "Quantitative Reasoning", score: "165" },
        { name: "Analytical Writing", score: "4.5" },
      ],
    },
    {
      id: "2",
      testName: "TOEFL iBT",
      score: "115",
      maxScore: "120",
      percentile: 95,
      testDate: "2023-11",
      sections: [
        { name: "Reading", score: "29" },
        { name: "Listening", score: "28" },
        { name: "Speaking", score: "29" },
        { name: "Writing", score: "29" },
      ],
    },
    {
      id: "3",
      testName: "SAT",
      score: "1520",
      maxScore: "1600",
      percentile: 98,
      testDate: "2022-05",
      sections: [
        { name: "Evidence-Based Reading and Writing", score: "750" },
        { name: "Math", score: "770" },
      ],
    },
  ])

  const [tempTestScore, setTempTestScore] = useState<Partial<TestScore>>({})

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return "bg-green-500"
    if (percentile >= 75) return "bg-blue-500"
    if (percentile >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const handleEdit = (test: TestScore) => {
    setEditingId(test.id)
    setTempTestScore({ ...test })
  }

  const handleSave = () => {
    if (editingId && tempTestScore.id) {
      setTestScores(testScores.map((test) => (test.id === editingId ? { ...(tempTestScore as TestScore) } : test)))
      setEditingId(null)
      setTempTestScore({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempTestScore({})
  }

  const handleDelete = (id: string) => {
    setTestScores(testScores.filter((test) => test.id !== id))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setTempTestScore({
      id: Date.now().toString(),
      testName: "",
      score: "",
      maxScore: "",
      percentile: 0,
      testDate: "",
      sections: [],
    })
  }

  const handleAddSave = () => {
    if (tempTestScore.testName && tempTestScore.score) {
      setTestScores([...testScores, tempTestScore as TestScore])
      setIsAdding(false)
      setTempTestScore({})
    }
  }

  const handleAddCancel = () => {
    setIsAdding(false)
    setTempTestScore({})
  }

  const updateTempTestScore = (field: keyof TestScore, value: any) => {
    setTempTestScore((prev) => ({ ...prev, [field]: value }))
  }

  const updateSection = (index: number, field: "name" | "score", value: string) => {
    const sections = [...(tempTestScore.sections || [])]
    sections[index] = { ...sections[index], [field]: value }
    setTempTestScore((prev) => ({ ...prev, sections }))
  }

  const addSection = () => {
    const sections = [...(tempTestScore.sections || []), { name: "", score: "" }]
    setTempTestScore((prev) => ({ ...prev, sections }))
  }

  const removeSection = (index: number) => {
    const sections = (tempTestScore.sections || []).filter((_, i) => i !== index)
    setTempTestScore((prev) => ({ ...prev, sections }))
  }

  const renderEditForm = (test: TestScore) => (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
      <div className="space-y-3">
        <Input
          value={tempTestScore.testName || ""}
          onChange={(e) => updateTempTestScore("testName", e.target.value)}
          placeholder="Test Name"
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            value={tempTestScore.score || ""}
            onChange={(e) => updateTempTestScore("score", e.target.value)}
            placeholder="Score"
          />
          <Input
            value={tempTestScore.maxScore || ""}
            onChange={(e) => updateTempTestScore("maxScore", e.target.value)}
            placeholder="Max Score"
          />
          <Input
            type="number"
            value={tempTestScore.percentile || 0}
            onChange={(e) => updateTempTestScore("percentile", Number.parseInt(e.target.value))}
            placeholder="Percentile"
          />
        </div>
        <Input
          type="month"
          value={tempTestScore.testDate || ""}
          onChange={(e) => updateTempTestScore("testDate", e.target.value)}
          placeholder="Test Date"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Section Scores:</label>
            <Button size="sm" variant="outline" onClick={addSection}>
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
          {(tempTestScore.sections || []).map((section, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={section.name}
                onChange={(e) => updateSection(index, "name", e.target.value)}
                placeholder="Section name"
                className="flex-1"
              />
              <Input
                value={section.score}
                onChange={(e) => updateSection(index, "score", e.target.value)}
                placeholder="Score"
                className="w-24"
              />
              <Button size="sm" variant="outline" onClick={() => removeSection(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
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
            <Trophy className="w-5 h-5" />
            Test Scores & Grades
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
            <div className="space-y-4">
              <h4 className="font-semibold">Add New Test Score</h4>
              {renderEditForm({} as TestScore)}
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Test Score
                </Button>
                <Button size="sm" variant="destructive" onClick={handleAddCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {testScores.map((test) => (
              <div key={test.id}>
                {editingId === test.id ? (
                  renderEditForm(test)
                ) : (
                  <div className="border rounded-lg p-4 space-y-4">
                    {isEditing && (
                      <div className="flex gap-2 mb-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(test)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(test.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{test.testName}</h4>
                        <Badge className={`${getPercentileColor(test.percentile)} text-white`}>
                          {test.percentile}th percentile
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-primary">
                          {test.score}
                          <span className="text-sm text-muted-foreground font-normal">/{test.maxScore}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{formatDate(test.testDate)}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Section Scores:</h5>
                      <div className="grid gap-2">
                        {test.sections.map((section, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{section.name}</span>
                            <span className="font-medium">{section.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
