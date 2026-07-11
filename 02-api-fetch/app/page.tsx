"use client";

import { useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  company: UserCompany[];
};

type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/usersd",
      );

      if (!response.ok) return [];

      const data = await response.json();

      setError("");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(`${error}`);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <h1>Simple Api Fetch App</h1>
      <button onClick={() => getUsers()}>Click here!</button>
      {loading ? (
        <p>Lädt...</p>
      ) : (
        <div>
          {users.map((user) => (
            <p key={user.id}>
              <span>{user.name}</span>
              <span>{user.username}</span>
              {user.company.map((companyInfo) => (
                <p key={companyInfo.name}>
                  <span>{companyInfo.name}</span>
                  <span>{companyInfo.catchPhrase}</span>
                  <span>{companyInfo.bs}</span>
                </p>
              ))}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
