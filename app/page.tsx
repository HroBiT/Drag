
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="min-h-screen ">
      <h1 className="text-2xl font-bold text-center mt-10">Welcome to the Task Management App</h1>
      <p className="text-center mt-12">Go login first :)</p>
      <Link href="/login" className="justify-center flex">
      <Button className="mt-4">
        Go to Login
      </Button>
      </Link>
    </main>
  );
}
