"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QAGatePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    console.log("Submitting QA gate request...");
    const res = await fetch("/api/qa-gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);

    if (res.ok) {
      const data = await res.json();
      console.log("QA gate passed:", data);

      // Redirect to login or home page
      window.location.href = "/login";
    }
     else {
      let errorMessage = "Access denied";
      try {
        const data = await res.json();
        errorMessage = data.error || errorMessage;

        if (data.joiningUrl) {
        setError(errorMessage);
        setTimeout(() => {
          window.location.href = data.joiningUrl;
        }, 2000); // a 2s delay before redirect
        
        return; //redirect to Dijkstra Org on Github
    }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        errorMessage = `Server error (${res.status})`;
      }
      setError(errorMessage);
    }
  } catch (err: unknown) {
    
    if (err instanceof Error) {
      console.error("QA gate error:", err);
      setError(`Network error: ${err.message}`);
    } else {
      console.error("Unknown error:", err);
      setError("An unknown error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">🔒 QA Environment Access</CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Enter your GitHub credentials to access the QA environment
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
            <Input
              type="password"
              placeholder="Password (Format: username-secretkey)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!username || !password || loading}
            >
              {loading ? "Verifying..." : "Unlock QA Environment"}
            </Button>
            <div className="text-xs text-gray-500 text-center">
              <p>• Must be a member of Dijkstra-Edu organization</p>
              <p>• Must be part of the development team</p>
              <p>• Not a member? You'll be redirected to the login page</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}