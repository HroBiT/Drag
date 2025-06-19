import { Button } from "./ui/button"

export default function Header() {
       return( <div className="flex flex-col justify-center items-center">
      <div className="container flex items-center justify-between py-4">
        <h1 className="text-2xl sm:text-4xl font-bold">DragApp.JS</h1>
        <Button>Login</Button>
      </div>
    </div>
       )
}