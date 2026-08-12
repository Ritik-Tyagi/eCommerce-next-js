"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

type UsersResponse = {
  success: boolean;
  data: User[];
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const result: UsersResponse = await response.json();
        setUsers(result.data);
      } catch (err) {
        console.error("Backend Error:", err);
        setError("Backend connection failed");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main>
      <h1>Next.js + FastAPI</h1>

      {loading ? (
        <p>Connecting to backend...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}