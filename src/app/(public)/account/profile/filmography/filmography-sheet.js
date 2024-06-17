import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export function FilmographySheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm" className="border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="!max-w-[600px] w-[600px]">
				<SheetHeader>
					<SheetTitle>Filmography</SheetTitle>
					<SheetDescription>Add your Filmography (Work Experiences)</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right w-full">
							Project Name
						</Label>
						<Input id="name" value="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right text-nowrap">
							Project Type (Genre)
						</Label>
						<Input id="username" value="@peduarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Your Role
						</Label>
						<Input id="username" value="@peduarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Year Of Production
						</Label>
						<Input id="username" value="@peduarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Link To The Project
						</Label>
						<Input id="username" value="@peduarte" className="col-span-3" />
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
