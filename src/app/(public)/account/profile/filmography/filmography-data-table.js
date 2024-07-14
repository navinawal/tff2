"use client";

import { CaretSortIcon, DotsHorizontalIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { FilmographySheet } from "./filmography-sheet";
import { deleteFilmography } from "@/app/actions/teamFilmography";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

export function FilmographyDataTable({ teamMemberId, filmographies }) {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [filmographyId, setFilmographyId] = useState(null);

	const columns = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "projectName",
			header: ({ column }) => {
				return (
					<div className="flex items-center">
						Project Name
						<Button variant="link" size="icon" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
							<CaretSortIcon className="h-4 w-4" />
						</Button>
					</div>
				);
			},
			cell: ({ row }) => <div>{row.getValue("projectName")}</div>,
		},
		{
			accessorKey: "projectType",
			header: ({ column }) => {
				return (
					<div className="flex items-center">
						Project Type
						<Button variant="link" size="icon" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
							<CaretSortIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
				);
			},
			cell: ({ row }) => <div>{row.getValue("projectType")}</div>,
		},
		{
			accessorKey: "role",
			header: ({ column }) => {
				return (
					<div className="flex items-center">
						Role
						<Button variant="link" size="icon" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
							<CaretSortIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
				);
			},
			cell: ({ row }) => <div>{row.getValue("role")}</div>,
		},
		{
			accessorKey: "productionYear",
			header: ({ column }) => {
				return (
					<div className="flex items-center">
						Production Year
						<Button variant="link" size="icon" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
							<CaretSortIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
				);
			},
			cell: ({ row }) => <div>{row.getValue("productionYear")}</div>,
		},
		{
			accessorKey: "projectLink",
			header: "Project Link",
			cell: ({ row }) => <div>{row.getValue("projectLink")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const filmography = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									handleOpenFilmographySheet(filmography.id);
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={async () => await handleDelete(teamMemberId, filmography.id)}>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	async function handleDelete(teamMemberId, filmographyId) {
		try {
			const response = await deleteFilmography(teamMemberId, filmographyId);
			if (response.success) {
				toast.success(response.message);
			} else {
				toast.error("something went wrong");
				console.log(response.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	const handleOpenFilmographySheet = (id = null) => {
		setFilmographyId(id);
		setIsSheetOpen(true);
	};

	const table = useReactTable({
		data: filmographies,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="float-right">
				<Button variant="outline" size="sm" onClick={() => handleOpenFilmographySheet(null)}>
					<PlusIcon className="mr-2 size-4" aria-hidden="true" />
					Add New
				</Button>
				<FilmographySheet teamMemberId={teamMemberId} filmographyId={filmographyId} isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} />
			</div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter filmography..."
					value={table.getColumn("projectName")?.getFilterValue() ?? ""}
					onChange={(event) => table.getColumn("projectName")?.setFilterValue(event.target.value)}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="whitespace-nowrap">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="whitespace-nowrap" key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
