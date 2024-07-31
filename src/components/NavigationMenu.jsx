"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import UserNav from "./Account/user-nav";
import AuthButtons from "./Auth/AuthButtons/AuthButton";
import { useAuth } from "@/hooks/useAuth";

export function NavigationMenuDemo() {
	const { user, loading } = useAuth();
	return (
		<div className="flex flex-grow gap-4">
			<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Image className="inline-block h-auto max-w-[300px]" alt="image" src="/logo_white.png" width="120" height="120" sizes="100vw"></Image>
			</Link>
			<NavigationMenu className="max-w-full justify-start">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Job</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="flex flex-col p-4 md:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<ListItem href="/find-job" title="Find a Job">
									Lorem ipsum dolor, sit amet
								</ListItem>
								<ListItem href="/account/profile/saved-jobs" title="Saved Job">
									SLorem ipsum dolor, sit amet consectetur
								</ListItem>
								<ListItem href="/account/profile/company-job-posts" title="Job Posts">
									SLorem ipsum dolor, sit amet consectetur
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Companies</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-4 md:w-[500px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								{user && user.company && (
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Link
												className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/account/profile/company-details"
											>
												<Image src={user.company.profileImage} alt="" width={100} height={100}></Image>
												<div className="mb-2 mt-4 text-lg font-medium">Company Profile</div>
												<p className="text-sm leading-tight text-muted-foreground">Manage or Edit your Company Profile</p>
											</Link>
										</NavigationMenuLink>
									</li>
								)}
								<ListItem href="/companies" title="Find Company">
									SLorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aliquam dicta perferendis nemo iure rerum consectetur modi dolor
									voluptatem. Animi totam repellat laudantium voluptate nisi ipsa dolore nulla cumque soluta?
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>TeamMembers</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-4 md:w-[500px] lg:w-[500px] grid-cols-[.75fr_1fr]">
								{user && user.teamMember && (
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Link
												className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/account/profile/team-profile"
											>
												<Image src={user.teamMember.profileImage} alt="" width={200} height={100}></Image>
												<div className="mb-2 mt-4 text-lg font-medium">TeamMember Profile</div>
												<p className="text-sm leading-tight text-muted-foreground">Manage or Edit your TeamMember Profile</p>
											</Link>
										</NavigationMenuLink>
									</li>
								)}
								<ListItem href="/team-members" title="Find TeamMember">
									SLorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aliquam dicta perferendis nemo iure rerum consectetur modi dolor
									voluptatem. Animi totam repellat laudantium voluptate nisi ipsa dolore nulla cumque soluta?
								</ListItem>
								<ListItem href="/account/profile/saved-team-members" title="Saved TeamMember">
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aliquam dicta perferendis nemo iure rerum consectetur modi dolor
									voluptatem. Animi totam repellat laudantium voluptate nisi ipsa dolore nulla cumque soluta?
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					{user && (
						<NavigationMenuItem>
							<NavigationMenuTrigger>Job Applications</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="flex flex-col p-4 md:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<ListItem href="/account/profile/recieved-job-applications" title="Recieved Job Applications">
										SLorem ipsum dolor, sit amet consectetur
									</ListItem>
									<ListItem href="/account/profile/my-applications" title="My Applications">
										SLorem ipsum dolor, sit amet consectetur
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex ml-auto justify-center items-center">
				{loading ? <Skeleton className="h-8 w-8 rounded-full" /> : user ? <UserNav /> : <AuthButtons />}
			</div>
		</div>
	);
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
