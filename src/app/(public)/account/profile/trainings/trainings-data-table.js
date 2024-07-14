"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { deleteTraining } from "@/app/actions/teamMemberTrainings";
import { TrainingsSheet } from "./trainings-sheet";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export function TrainingsDataTable({ teamMemberId, trainings }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

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
			accessorKey: "mentor",
			header: "Mentor",
			cell: ({ row }) => <div>{row.getValue("mentor")}</div>,
		},
		{
			accessorKey: "courseTaken",
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Course
						<CaretSortIcon className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("courseTaken")}</div>,
		},
		{
			accessorKey: "courseLength",
			header: "Course Length",
			cell: ({ row }) => <div>{row.getValue("courseLength")}</div>,
		},
		{
			accessorKey: "instituition",
			header: "Institution",
			cell: ({ row }) => <div>{row.getValue("instituition")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			cell: function Cell({ row }) {
				const [showTrainingSheet, setShowTrainingSheet] = useState(false);
				const training = row.original;

				return (
					<>
						<TrainingsSheet teamMemberId={teamMemberId} open={showTrainingSheet} onOpenChange={setShowTrainingSheet} training={row.original} />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<DotsHorizontalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => setShowTrainingSheet(true)}>Edit</DropdownMenuItem>
								<DropdownMenuItem onClick={async () => await handleDelete(training.teamMemberId, training.id)}>Delete</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				);
			},
		},
	];

	async function handleDelete(teamMemberId, trainingId) {
		try {
			const response = await deleteTraining(teamMemberId, trainingId);
			if (response.success) {
				toast.success(response.message);
			} else {
				console.log(error.message);
				toast.error("something went wrong");
			}
		} catch (error) {
			console.log(error.message);
			toast.error("something went wrong");
		}
	}

	const table = useReactTable({
		data: trainings,
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

	const [showTrainingSheet, setShowTrainingSheet] = useState(false);

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<div className="flex flex-1 items-center space-x-2">
					<Input
						placeholder="Filter Training..."
						value={table.getColumn("courseTaken")?.getFilterValue() ?? ""}
						onChange={(event) => table.getColumn("courseTaken")?.setFilterValue(event.target.value)}
						className="h-8 w-40 lg:w-64"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => setShowTrainingSheet(true)}>
						<PlusIcon className="mr-2 size-4" aria-hidden="true" />
						Add New
					</Button>
					<TrainingsSheet teamMemberId={teamMemberId} open={showTrainingSheet} onOpenChange={setShowTrainingSheet} />
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
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
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
