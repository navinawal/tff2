import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FilerobotImageEditor from "react-filerobot-image-editor";

export const ImageEditorModal = ({ isOpen, onClose, onSave }) => {
	const [image, setImage] = useState(null);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Image</DialogTitle>
					<DialogDescription>Crop or apply filters to your image.</DialogDescription>
				</DialogHeader>
				<FilerobotImageEditor
					source="https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephanie-nakagawa-ADSKIn0ScDg-unsplash-408x570.jpg"
					onSave={(editedImage) => {
						onSave(editedImage);
						onClose();
					}}
					onClose={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
};
