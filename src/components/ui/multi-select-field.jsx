import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useController } from "react-hook-form";
import { MultiSelect } from "@/components/ui/multi-select";

export function FormMultiSelectField({ control, name, options, placeholder }) {
	const { field } = useController({ control, name });

	return (
		<FormItem>
			<FormLabel>{placeholder}</FormLabel>
			<FormControl>
				<MultiSelect options={options} selectedOptions={field.value || []} onChange={field.onChange} placeholder={placeholder} />
			</FormControl>
			<FormMessage />
		</FormItem>
	);
}
