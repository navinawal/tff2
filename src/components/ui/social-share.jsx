"use client";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";

export default function SocialShare({ url, title, quote, hashtag }) {
	return (
		<div className="flex gap-2">
			<FacebookShareButton url={url} quote={quote} hashtag={hashtag}>
				<FacebookIcon size={32} round={true} />
			</FacebookShareButton>
			<TwitterShareButton url={url} title={title} hashtags={[hashtag.replace("#", "")]}>
				<TwitterIcon size={32} round={true} />
			</TwitterShareButton>
			<LinkedinShareButton url={url} title={title} summary={quote}>
				<LinkedinIcon size={32} round={true} />
			</LinkedinShareButton>
			<WhatsappShareButton url={url} title={title}>
				<WhatsappIcon size={32} round={true} />
			</WhatsappShareButton>
		</div>
	);
}
