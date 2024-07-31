"use client";

import { Rating } from "@smastrom/react-rating";
import ReviewForm from "./_components/review-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Reviews({ uid, teamMemberId, teamMemberReviews }) {
	return (
		<>
			<div className="block">
				<div className="flex flex-col">
					{teamMemberReviews?.reviews && teamMemberReviews?.reviews?.length > 0
						? teamMemberReviews.reviews.map((teamMemberReview) => {
								console.log(teamMemberReviews);
								return (
									<div key={teamMemberReview.id}>
										<div className="flex gap-2 items-center py-5 border-b">
											<Rating readOnly style={{ maxWidth: 200 }} value={teamMemberReviews?.averageRating ?? 0} visibleLabelId="rating_label" />
											<div className="text-2xl font-bold">{teamMemberReviews?.averageRating}</div>
											<div className="text-2xl font-bold">Out of 5 Star</div>
										</div>
										<div className="flex flex-col gap-4 py-5 border-b">
											<div className="flex gap-4">
												<div className="flex justify-center items-center rounded-full">
													<Avatar className="h-16 w-16">
														<AvatarImage src={teamMemberReview?.reviewedByDetails?.profileImage} alt="" />
														<AvatarFallback>{teamMemberReview?.reviewedByDetails?.firstName}</AvatarFallback>
													</Avatar>
												</div>
												<div className="flex flex-col	">
													<div className="text-base font-bold">{`${teamMemberReview?.reviewedByDetails?.firstName} ${teamMemberReview?.reviewedByDetails?.lastName}`}</div>
													<Rating readOnly value={teamMemberReview.rating ?? 0} style={{ maxWidth: 120 }} visibleLabelId="rating_label" />
													<div className="text-base font-light">April 29, 2020</div>
												</div>
											</div>
											<div className="text-sm font-light">{teamMemberReview.comments}</div>
										</div>
									</div>
								);
						  })
						: null}
				</div>
			</div>
			{uid && uid !== teamMemberId && (
				<div className="py-5">
					<h1 className="text-5xl font-bold text-center">Leave Us a Review</h1>
					<ReviewForm uid={uid} teamMemberId={teamMemberId} />
				</div>
			)}
		</>
	);
}
