import { getSession } from "@/lib/auth";
import { getUserTables } from "@/scripts/getUserTables";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserTablesProps {
  params: { userId: string };
}

export default async function UserTables({ params }: UserTablesProps) {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    redirect("/login");
  }

  // Instead of fetch, directly import and use the function
  const tables = await getUserTables(session.userId);

  if (!tables) {
    console.error("Failed to fetch user tables");
    return <div>Error loading tables</div>;
  }

  console.log("userTables", tables);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <h1>Hi {session.name}, here are your tables</h1>
        <p>Here you can manage your tables</p>
      </div>
      {/* Display the tables */}
      <ul>
        {tables.map((table: any) => (
          <Link href={`/tables/${session.userId}/${table.id}`} key={table.id}>
            <li key={table.id}>
              <h3>{table.name}</h3>
              <p>{table.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
