// Shared edit controls component

import { Button } from "@/components/ui/button";
import { Save, X, Edit } from "lucide-react";

interface EditControlsProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function EditControls({ 
  isEditing, 
  onToggleEdit, 
  onSave, 
  onCancel, 
  isLoading = false 
}: EditControlsProps) {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        {onSave && (
          <Button size="sm" onClick={onSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        )}
        {onCancel && (
          <Button size="sm" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button size="sm" variant="outline" onClick={onToggleEdit}>
      <Edit className="w-4 h-4 mr-2" />
      Edit
    </Button>
  );
}
