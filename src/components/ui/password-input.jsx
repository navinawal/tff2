import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
				onClick={() => setShowPassword((prev) => !prev)}
			>
				{showPassword ? <EyeIcon className="w-4 h-4" aria-hidden="true" /> : <EyeOffIcon className="w-4 h-4" aria-hidden="true" />}
			</Button>
		</div>
	);
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
