import Forms from "@/components/Forms";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <div className="container flex items-center justify-between py-4">
        <h1 className="text-2xl sm:text-4xl font-bold">Kolumny</h1>
      </div>
      <div className="flex flex-col">
        <hr className="flex w-full border-gray-300 my-10" />
        <Forms />
      </div>
    </main>
  );
}
