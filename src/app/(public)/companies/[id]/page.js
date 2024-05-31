"use client";

import { useParams } from "next/navigation";

export default function ComplanyDetails() {
	const { id } = useParams();
	return (
		<section className="job-detail-section">
			<div className="upper-box">
				<div className="auto-container">
					<div className="job-block-seven">
						<div className="inner-box mt-36">
							<div className="content">
								<span className="company-logo">
									<img src="/images/resource/company-1.png" alt="logo" />
								</span>
								<h4>Udemy</h4>
								<ul className="job-info">
									<li>
										<span className="icon flaticon-map-locator"></span>London, UK
									</li>
									<li>
										<span className="icon flaticon-briefcase"></span>Accounting / Finance
									</li>
									<li>
										<span className="icon flaticon-telephone-1"></span>123 456 7890
									</li>
									<li>
										<span className="icon flaticon-mail"></span>info@udemy.com
									</li>
								</ul>
								<ul className="job-other-info">
									<li className="time">Open Jobs – 15</li>
								</ul>
							</div>
							<div className="btn-box">
								<button className="theme-btn btn-style-one" data-bs-toggle="modal" data-bs-target="#privateMessage">
									Private Message
								</button>
								<button className="bookmark-btn">
									<i className="flaticon-bookmark"></i>
								</button>
							</div>
							<div className="modal fade" id="privateMessage" tabindex="-1" aria-hidden="true">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<div className="apply-modal-content modal-content">
										<div className="text-center">
											<h3 className="title">Send message to Udemy</h3>
											<button type="button" className="closed-modal" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<form className="default-form">
											<div className="row">
												<div className="col-lg-12 col-md-12 col-sm-12 form-group">
													<input type="text" name="username" placeholder="Your Name" required="" />
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 form-group">
													<textarea className="darma" name="message" placeholder="Message" required=""></textarea>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 form-group">
													<button className="theme-btn btn-style-one w-100" type="submit" name="submit-form">
														Send Message
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="job-detail-outer">
				<div className="auto-container">
					<div className="row">
						<div className="content-column col-lg-8 col-md-12 col-sm-12">
							<div className="job-detail">
								<h4>About Company</h4>
								<p>
									Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company
									for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial
									analysis software and services.
								</p>
								<p>
									Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was
									acquired by Dun &amp; Bradstreet in 1962. In 2000, Dun &amp; Bradstreet spun off Moody’s Corporation as a separate company that was
									listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the
									rating agency, and Moody’s Analytics, with all of its other products.
								</p>
								<div className="row images-outer">
									<div className="col-lg-3 col-md-3 col-sm-6">
										<figure className="image" role="button">
											<div className="lightbox-image">
												<img src="/images/resource/employers-single-1.png" alt="resource" />
											</div>
										</figure>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-6">
										<figure className="image" role="button">
											<div className="lightbox-image">
												<img src="/images/resource/employers-single-2.png" alt="resource" />
											</div>
										</figure>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-6">
										<figure className="image" role="button">
											<div className="lightbox-image">
												<img src="/images/resource/employers-single-3.png" alt="resource" />
											</div>
										</figure>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-6">
										<figure className="image" role="button">
											<div className="lightbox-image">
												<img src="/images/resource/employers-single-4.png" alt="resource" />
											</div>
										</figure>
									</div>
								</div>
								<p>
									Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company
									for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial
									analysis software and services.
								</p>
								<p>
									Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was
									acquired by Dun &amp; Bradstreet in 1962. In 2000, Dun &amp; Bradstreet spun off Moody’s Corporation as a separate company that was
									listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the
									rating agency, and Moody’s Analytics, with all of its other products.
								</p>
							</div>
							<div className="related-jobs">
								<div className="title-box">
									<h3>3 Others jobs available</h3>
									<div className="text">2020 jobs live - 293 added today.</div>
								</div>
								<div className="job-block">
									<div className="inner-box">
										<div className="content">
											<span className="company-logo">
												<img src="/images/resource/company-logo/1-1.png" alt="resource" />
											</span>
											<h4>
												<a href="/job-single-v1/1">Software Engineer (Android), Libraries</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Segment
												</li>
												<li>
													<span className="icon flaticon-map-locator"></span>London, UK
												</li>
												<li>
													<span className="icon flaticon-clock-3"></span> 11 hours ago
												</li>
												<li>
													<span className="icon flaticon-money"></span> $35k - $45k
												</li>
											</ul>
											<ul className="job-other-info">
												<li className="time">Full Time</li>
												<li className="privacy">Private</li>
												<li className="required">Urgent</li>
											</ul>
											<button className="bookmark-btn">
												<span className="flaticon-bookmark"></span>
											</button>
										</div>
									</div>
								</div>
								<div className="job-block">
									<div className="inner-box">
										<div className="content">
											<span className="company-logo">
												<img src="/images/resource/company-logo/1-2.png" alt="resource" />
											</span>
											<h4>
												<a href="/job-single-v1/2">Recruiting Coordinator</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Catalyst
												</li>
												<li>
													<span className="icon flaticon-map-locator"></span>London, UK
												</li>
												<li>
													<span className="icon flaticon-clock-3"></span> 11 hours ago
												</li>
												<li>
													<span className="icon flaticon-money"></span> $35k - $45k
												</li>
											</ul>
											<ul className="job-other-info">
												<li className="time">Freelancer</li>
												<li className="privacy">Private</li>
												<li className="required">Urgent</li>
											</ul>
											<button className="bookmark-btn">
												<span className="flaticon-bookmark"></span>
											</button>
										</div>
									</div>
								</div>
								<div className="job-block">
									<div className="inner-box">
										<div className="content">
											<span className="company-logo">
												<img src="/images/resource/company-logo/1-3.png" alt="resource" />
											</span>
											<h4>
												<a href="/job-single-v1/3">Product Manager, Studio</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Invision
												</li>
												<li>
													<span className="icon flaticon-map-locator"></span>London, UK
												</li>
												<li>
													<span className="icon flaticon-clock-3"></span> 11 hours ago
												</li>
												<li>
													<span className="icon flaticon-money"></span> $35k - $45k
												</li>
											</ul>
											<ul className="job-other-info">
												<li className="time">Part Time</li>
												<li className="privacy">Private</li>
												<li className="required">Urgent</li>
											</ul>
											<button className="bookmark-btn">
												<span className="flaticon-bookmark"></span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
							<aside className="sidebar">
								<div className="sidebar-widget company-widget">
									<div className="widget-content">
										<ul className="company-info mt-0">
											<li>
												Primary industry: <span>Software</span>
											</li>
											<li>
												Company size: <span>501-1,000</span>
											</li>
											<li>
												Founded in: <span>2011</span>
											</li>
											<li>
												Phone: <span>123 456 7890</span>
											</li>
											<li>
												Email: <span>info@udemy.com</span>
											</li>
											<li>
												Location: <span>London, UK</span>
											</li>
											<li>
												Social media:
												<div className="social-links">
													<a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
														<i className="fab fa-facebook-f"></i>
													</a>
													<a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
														<i className="fab fa-twitter"></i>
													</a>
													<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
														<i className="fab fa-instagram"></i>
													</a>
													<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
														<i className="fab fa-linkedin-in"></i>
													</a>
												</div>
											</li>
										</ul>
										<div className="btn-box">
											<a href="#" className="theme-btn btn-style-three">
												www.Udemy.com
											</a>
										</div>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
