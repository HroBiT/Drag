import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function Forms() {
    return (
        <div>
            <form className="flex flex-col space-y-4">
                <Input type="text" placeholder="Enter a title of task" className="w-full"
                    required />
                <Input type="text" placeholder="Enter a description of task" className="w-full"
                    required />
                    <Button type="submit" className="px-3 py-2">
                    Create Task
                </Button>
            </form>
        </div>
    );
}