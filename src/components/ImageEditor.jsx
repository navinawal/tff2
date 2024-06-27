"use client";
import React, { useState } from "react";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";

export default function ImageEditor() {
	const [isImgEditorShown, setIsImgEditorShown] = useState(false);

	const openImgEditor = () => {
		setIsImgEditorShown(true);
	};

	const closeImgEditor = () => {
		setIsImgEditorShown(false);
	};

	return (
		<div>
			<button onClick={openImgEditor}>Open Filerobot image editor</button>
			{isImgEditorShown && (
				<FilerobotImageEditor
					source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
					onSave={(editedImageObject, designState) => console.log("saved", editedImageObject, designState)}
					onClose={closeImgEditor}
					Text={{ text: "Filerobot..." }}
					Rotate={{ angle: 90, componentType: "slider" }}
					tabsIds={[TABS.ADJUST]} // or {['Adjust', 'Annotate', 'Watermark']}
					defaultTabId={TABS.ADJUST} // or 'Annotate'
					defaultToolId={TOOLS.ADJUST} // or 'Text'
				/>
			)}
		</div>
	);
}
