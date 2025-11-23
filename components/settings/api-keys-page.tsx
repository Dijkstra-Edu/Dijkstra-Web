"use client";

import * as React from "react";
import { Key, Plus, Copy, Trash2, Eye, EyeOff, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAPIKeys, useCreateAPIKey, useRevokeAPIKey } from "@/hooks/api-keys/use-api-keys";
import type { CreateAPIKey } from "@/types/server/dataforge/User/api-keys";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ENV } from "@/lib/constants";
import { ALL_ROLES } from "@/constants/roles";
import { RoleMultiSelect } from "@/components/multiselects/role-multi-select";

function APIKeysPage() {
  const { data: apiKeys, isLoading, error } = useAPIKeys();
  const createMutation = useCreateAPIKey();
  const revokeMutation = useRevokeAPIKey();
  const { data: session } = useSession();

  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [newKeyDescription, setNewKeyDescription] = React.useState("");
  const [newKeyExpiration, setNewKeyExpiration] = React.useState("");
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [newlyCreatedKey, setNewlyCreatedKey] = React.useState<string | null>(null);
  const [showNewKey, setShowNewKey] = React.useState(false);

  // Get user roles from session
  const userRoles = (session?.user as any)?.roles || [];
  
  // Check if dev environment
  const isDev = ENV === "DEV";
  
  // Filter available roles based on environment
  const availableRoles = isDev ? ALL_ROLES : userRoles;

  const handleCreateKey = async () => {
    try {
      const data: CreateAPIKey = {
        description: newKeyDescription || null,
        expires_in: newKeyExpiration || null,
        roles: selectedRoles.length > 0 ? selectedRoles : null,
      };

      const response = await createMutation.mutateAsync(data);
      setNewlyCreatedKey(response.key);
      setShowNewKey(true);
      setShowCreateDialog(false);
      setNewKeyDescription("");
      setNewKeyExpiration("");
      setSelectedRoles([]);
      toast.success("API key created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create API key");
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      await revokeMutation.mutateAsync(keyId);
      toast.success("API key revoked successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to revoke API key");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return "•".repeat(key.length);
    return `${key.substring(0, 4)}${"•".repeat(key.length - 8)}${key.substring(key.length - 4)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Keys</h3>
        <p className="text-sm text-muted-foreground">
          Manage your API keys for accessing the Dijkstra API
        </p>
      </div>
      <Separator />

      {/* Security Warning */}
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <div className="flex gap-2">
          <svg
            className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="space-y-1">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
              Security Notice
            </p>
            <p className="text-sm text-yellow-600/90 dark:text-yellow-500/90">
              API keys provide full access to your account. Keep them secure and never share them publicly.
              You will only see the full key once when it's created.
            </p>
          </div>
        </div>
      </div>

      {/* Newly Created Key Display */}
      {newlyCreatedKey && showNewKey && (
        <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-green-600 dark:text-green-500">
              New API Key Created
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowNewKey(false);
                setNewlyCreatedKey(null);
              }}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Copy this key now. You won't be able to see it again!
          </p>
          <div className="flex items-center gap-2">
            <Input
              type={showNewKey ? "text" : "password"}
              value={newlyCreatedKey}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(newlyCreatedKey)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNewKey(!showNewKey)}
            >
              {showNewKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Create New Key Button */}
      <div className="flex justify-end">
        <Dialog 
          open={showCreateDialog} 
          onOpenChange={(open) => {
            setShowCreateDialog(open);
            if (!open) {
              setSelectedRoles([]);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key to access the Dijkstra API. You can add a description, optional expiration date, and assign roles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="e.g., Production API key"
                  value={newKeyDescription}
                  onChange={(e) => setNewKeyDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration">Expiration Date (optional)</Label>
                <Input
                  id="expiration"
                  type="datetime-local"
                  value={newKeyExpiration}
                  onChange={(e) => setNewKeyExpiration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty for no expiration
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roles">Roles (optional)</Label>
                <RoleMultiSelect
                  value={selectedRoles}
                  onChange={setSelectedRoles}
                  availableRoles={availableRoles}
                  placeholder="Select roles..."
                />
                <p className="text-xs text-muted-foreground">
                  {isDev 
                    ? "Dev environment: All roles available" 
                    : `Available roles: ${availableRoles.length > 0 ? availableRoles.join(", ") : "None"}`}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateDialog(false);
                  setSelectedRoles([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateKey}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create Key"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys List */}
      {isLoading && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Loading API keys...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">
            Error loading API keys: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      )}

      {!isLoading && !error && apiKeys && (
        <div className="space-y-3">
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No API keys found. Create your first API key to get started.
            </div>
          ) : (
            apiKeys.map((key) => (
              <div
                key={key.id}
                className="rounded-lg border p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">
                        {key.description || "Unnamed API Key"}
                      </p>
                      {key.active ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />
                          Revoked
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created: {formatDate(key.created_at)}
                      </div>
                      {key.expires_in && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expires: {formatDate(key.expires_in)}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Key ID: {key.id}
                    </div>
                  </div>
                  {key.active && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke API Key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently revoke the API key
                            and it will no longer be able to access the API.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRevokeKey(key.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Revoke
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default APIKeysPage;

