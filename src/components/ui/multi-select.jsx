"use client";

import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MultiSelect({ options = [], selectedOptions, onChange, placeholder = "Select options" }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option) => {
		const updatedSelection = selectedOptions.includes(option) ? selectedOptions.filter((o) => o !== option) : [...selectedOptions, option];
		onChange(updatedSelection);
	};

	return (
		<Popover.Root open={isOpen} onOpenChange={setIsOpen}>
			<Popover.Trigger asChild>
				<Button variant="outline" className="min-w-[200px]">
					{selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}
				</Button>
			</Popover.Trigger>
			<Popover.Content className="p-4 bg-white rounded shadow-lg w-72">
				{options.map((option) => (
					<div key={option} className="flex items-center space-x-2 p-2">
						<Checkbox.Root
							checked={selectedOptions.includes(option)}
							onCheckedChange={() => handleSelect(option)}
							className={cn(
								"h-4 w-4 rounded border border-gray-300 bg-white",
								selectedOptions.includes(option) ? "bg-blue-500 text-white" : "text-gray-900"
							)}
						>
							<Checkbox.Indicator className="flex items-center justify-center text-white">
								<CheckIcon />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label>{option}</label>
					</div>
				))}
			</Popover.Content>
		</Popover.Root>
	);
}
