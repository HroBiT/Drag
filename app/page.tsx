import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  console.log("Session Cookie:", session);
  return (
    <main className="min-h-screen ">
      <h1 className="text-2xl font-bold text-center mt-28">
        Welcome to the Task Management App
      </h1>

      {session ? (
        <div className="flex flex-col items-center mt-[20px]">
          <p className="text-green-500 mt-4 justify-center flex">
            You are logged in!
          </p>

          <Button className="mt-4 justify-center flex">
            <Link href={"/tables/" + session.userId}>Go to Tables</Link>
          </Button>
        </div>
      ) : (
        <Link href="/login" className="justify-center flex">
          <p className="text-center mt-12">Go login first :)</p>
          <Button className="mt-4">Go to Login</Button>
        </Link>
      )}
    </main>
  );
}
