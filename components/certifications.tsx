"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Award, ExternalLink, Save, X, Trash2 } from "lucide-react"

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string
  credentialId: string
  credentialUrl: string
  skills: string[]
}

export function Certifications() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      issueDate: "2024-05",
      expiryDate: "2027-05",
      credentialId: "AWS-ASA-12345",
      credentialUrl: "https://aws.amazon.com/verification",
      skills: ["AWS", "Cloud Architecture", "EC2", "S3", "RDS"],
    },
    {
      id: "2",
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      issueDate: "2024-03",
      expiryDate: "2026-03",
      credentialId: "GCP-PD-67890",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["Google Cloud", "Kubernetes", "App Engine", "Cloud Functions"],
    },
    {
      id: "3",
      name: "Meta Front-End Developer Certificate",
      issuer: "Meta",
      issueDate: "2023-12",
      expiryDate: "",
      credentialId: "META-FED-54321",
      credentialUrl: "https://coursera.org/verify/professional-cert",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
    },
  ])

  const [newCertification, setNewCertification] = useState<Omit<Certification, "id">>({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    skills: [],
  })
  const [tempCertification, setTempCertification] = useState<Certification | null>(null)

  const handleAdd = () => {
    const certification: Certification = {
      ...newCertification,
      id: Date.now().toString(),
    }
    setCertifications([...certifications, certification])
    setNewCertification({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      skills: [],
    })
    setIsAdding(false)
  }

  const handleEdit = (certification: Certification) => {
    setTempCertification({ ...certification })
    setEditingId(certification.id)
  }

  const handleSave = () => {
    if (tempCertification) {
      setCertifications(certifications.map((cert) => (cert.id === tempCertification.id ? tempCertification : cert)))
    }
    setEditingId(null)
    setTempCertification(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempCertification(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const handleSkillsChange = (skillsString: string, isTemp = false) => {
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill)
    if (isTemp && tempCertification) {
      setTempCertification({ ...tempCertification, skills: skillsArray })
    } else {
      setNewCertification({ ...newCertification, skills: skillsArray })
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "No Expiry"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const isExpiringSoon = (expiryDate: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
    return expiry <= sixMonthsFromNow
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
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
              <h4 className="font-semibold">Add New Certification</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Certification Name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                />
                <Input
                  placeholder="Issuer"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                />
                <Input
                  type="month"
                  placeholder="Issue Date"
                  value={newCertification.issueDate}
                  onChange={(e) => setNewCertification({ ...newCertification, issueDate: e.target.value })}
                />
                <Input
                  type="month"
                  placeholder="Expiry Date (optional)"
                  value={newCertification.expiryDate}
                  onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
                />
                <Input
                  placeholder="Credential ID"
                  value={newCertification.credentialId}
                  onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                />
                <Input
                  placeholder="Credential URL"
                  value={newCertification.credentialUrl}
                  onChange={(e) => setNewCertification({ ...newCertification, credentialUrl: e.target.value })}
                />
              </div>
              <Input
                placeholder="Skills (comma-separated)"
                value={newCertification.skills.join(", ")}
                onChange={(e) => handleSkillsChange(e.target.value)}
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

          {certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 space-y-4">
              {editingId === cert.id && tempCertification ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={tempCertification.name}
                      onChange={(e) => setTempCertification({ ...tempCertification, name: e.target.value })}
                    />
                    <Input
                      value={tempCertification.issuer}
                      onChange={(e) => setTempCertification({ ...tempCertification, issuer: e.target.value })}
                    />
                    <Input
                      type="month"
                      value={tempCertification.issueDate}
                      onChange={(e) => setTempCertification({ ...tempCertification, issueDate: e.target.value })}
                    />
                    <Input
                      type="month"
                      value={tempCertification.expiryDate}
                      onChange={(e) => setTempCertification({ ...tempCertification, expiryDate: e.target.value })}
                    />
                    <Input
                      value={tempCertification.credentialId}
                      onChange={(e) => setTempCertification({ ...tempCertification, credentialId: e.target.value })}
                    />
                    <Input
                      value={tempCertification.credentialUrl}
                      onChange={(e) => setTempCertification({ ...tempCertification, credentialUrl: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Skills (comma-separated)"
                    value={tempCertification.skills.join(", ")}
                    onChange={(e) => handleSkillsChange(e.target.value, true)}
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
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-lg">{cert.name}</h4>
                      <p className="text-primary font-medium">{cert.issuer}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                        <span>Expires: {formatDate(cert.expiryDate)}</span>
                        {isExpiringSoon(cert.expiryDate) && <Badge variant="destructive">Expiring Soon</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditing && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(cert)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(cert.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Credential ID: {cert.credentialId}</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
