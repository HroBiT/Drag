"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Wystąpił błąd podczas logowania.");
        return;
      }

      document.cookie = `token=${data.token}; path=/; max-age=3600; secure; samesite=strict`;

      router.push("/");
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Logowanie
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                {error}
              </div>
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
