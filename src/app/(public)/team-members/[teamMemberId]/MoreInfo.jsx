"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function TeamMemberMoreInfo({ teamMember, filmographies }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Learn More</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-full md:w-fit">
				<ScrollArea className="h-full my-5 pr-5">
					<SheetHeader className="text-left mb-5">
						<SheetTitle className="text-xl text-white font-bold">More Information</SheetTitle>
						<SheetDescription>Learn more about {teamMember.firstName}.</SheetDescription>
					</SheetHeader>
					<Separator />
					<div className="flex flex-col gap-1 py-5">
						<h1 className="text-xl text-white font-bold">About {teamMember.firstName}</h1>
						<p className="text-sm font-light">{teamMember?.about ? teamMember?.about : "The user has not written about themself yet."}</p>
					</div>
					<div className="flex flex-col gap-1 py-5">
						<h1 className="text-xl text-white font-bold">Filmography & Roles</h1>
						<div className="flex flex-col gap-6">
							{filmographies && filmographies.length > 0 ? (
								filmographies?.map((filmography) => (
									<div className="flex flex-col" key={filmography.id}>
										<div className="text-sm">Project Name : {filmography.projectName}</div>
										<div className="text-sm">Project Type : {filmography.projectType}</div>
										<div className="text-sm">Role : {filmography.role}</div>
										<div className="text-sm">Production Year : {filmography.productionYear}</div>
										<div className="text-sm">Project Link : {filmography.projectLink}</div>
									</div>
								))
							) : (
								<p className="text-sm font-light">No Data provided yet</p>
							)}
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
