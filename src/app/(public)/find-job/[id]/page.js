"use client";

import { useParams } from "next/navigation";

export default function JobDetails() {
	const { id } = useParams();
	return (
		<section className="job-detail-section">
			<div className="upper-box">
				<div className="auto-container">
					<div className="job-block-seven">
						<div className="inner-box pt-20">
							<div className="content">
								<span className="company-logo">
									<img src="/images/resource/company-logo/1-1.png" alt="logo" />
								</span>
								<h4>Software Engineer (Android), Libraries</h4>
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
							</div>
							<div className="btn-box">
								<a href="#" className="theme-btn btn-style-one" data-bs-toggle="modal" data-bs-target="#applyJobModal">
									Apply For Job
								</a>
								<button className="bookmark-btn">
									<i className="flaticon-bookmark"></i>
								</button>
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
								<h4>Job Description</h4>
								<p>
									As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will
									help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on
									building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue
									your career into the FinTech or Big Data arenas.
								</p>
								<h4>Key Responsibilities</h4>
								<ul className="list-style-three">
									<li>Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing.</li>
									<li>Work with BAs, product managers and tech teams to lead the Product Design</li>
									<li>
										Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design
										specifications.
									</li>
									<li>Accurately estimate design tickets during planning sessions.</li>
									<li>
										Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files, style
										guides, high fidelity prototypes, micro interaction specifications and pattern libraries.
									</li>
									<li>
										Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to plan
										moderated usability test sessions.
									</li>
									<li>
										Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing the
										wheel
									</li>
									<li>Present your work to the wider business at Show &amp; Tell sessions.</li>
								</ul>
								<h4>Skill &amp; Experience</h4>
								<ul className="list-style-three">
									<li>You have at least 3 years’ experience working as a Product Designer.</li>
									<li>You have experience using Sketch and InVision or Framer X</li>
									<li>You have some previous experience working in an agile environment – Think two-week sprints.</li>
									<li>You are familiar using Jira and Confluence in your workflow</li>
								</ul>
							</div>
							<div className="other-options">
								<div className="social-share">
									<h5>Share this job</h5>
									<a href="https://www.facebook.com/" className="facebook" target="_blank" rel="noopener noreferrer">
										<i className="fab fa-facebook-f"></i> Facebook
									</a>
									<a href="https://www.twitter.com/" className="twitter" target="_blank" rel="noopener noreferrer">
										<i className="fab fa-twitter"></i> Twitter
									</a>
									<a href="https://www.linkedin.com/" className="linkedin" target="_blank" rel="noopener noreferrer">
										<i className="fab fa-likedin"></i> Linkedin
									</a>
								</div>
							</div>
							<div className="related-jobs">
								<div className="title-box">
									<h3>Related Jobs</h3>
									<div className="text">2020 jobs live - 293 added today.</div>
								</div>
								<div className="job-block">
									<div className="inner-box">
										<div className="content">
											<span className="company-logo">
												<img src="/images/resource/company-logo/1-4.png" alt="item brand" />
											</span>
											<h4>
												<a href="/job-single-v1/4">Senior Product Designer</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Upwork
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
												<li className="time">Temporary</li>
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
												<img src="/images/resource/company-logo/1-5.png" alt="item brand" />
											</span>
											<h4>
												<a href="/job-single-v1/5">Senior Full Stack Engineer, Creator Success</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Medium
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
												<img src="/images/resource/company-logo/1-6.png" alt="item brand" />
											</span>
											<h4>
												<a href="/job-single-v1/6">Software Engineer (Android), Libraries</a>
											</h4>
											<ul className="job-info">
												<li>
													<span className="icon flaticon-briefcase"></span>Figma
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
												<img src="/images/resource/company-logo/1-1.png" alt="item brand" />
											</span>
											<h4>
												<a href="/job-single-v1/7">Software Engineer (Android), Libraries</a>
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
								<div className="sidebar-widget">
									<h4 className="widget-title">Job Overview</h4>
									<div className="widget-content">
										<ul className="job-overview">
											<li>
												<i className="icon icon-calendar"></i>
												<h5>Date Posted:</h5>
												<span>Posted 1 hours ago</span>
											</li>
											<li>
												<i className="icon icon-expiry"></i>
												<h5>Expiration date:</h5>
												<span>April 06, 2021</span>
											</li>
											<li>
												<i className="icon icon-location"></i>
												<h5>Location:</h5>
												<span>London, UK</span>
											</li>
											<li>
												<i className="icon icon-user-2"></i>
												<h5>Job Title:</h5>
												<span>Designer</span>
											</li>
											<li>
												<i className="icon icon-clock"></i>
												<h5>Hours:</h5>
												<span>50h / week</span>
											</li>
											<li>
												<i className="icon icon-rate"></i>
												<h5>Rate:</h5>
												<span>$15 - $25 / hour</span>
											</li>
											<li>
												<i className="icon icon-salary"></i>
												<h5>Salary:</h5>
												<span>$35k - $45k</span>
											</li>
										</ul>
									</div>
									<h4 className="widget-title mt-5">Job Location</h4>

									<h4 className="widget-title">Job Skills</h4>
									<div className="widget-content">
										<ul className="job-skills">
											<li>
												<a href="#">app</a>
											</li>
											<li>
												<a href="#">administrative</a>
											</li>
											<li>
												<a href="#">android</a>
											</li>
											<li>
												<a href="#">wordpress</a>
											</li>
											<li>
												<a href="#">design</a>
											</li>
											<li>
												<a href="#">react</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="sidebar-widget company-widget">
									<div className="widget-content">
										<div className="company-title">
											<div className="company-logo">
												<img src="/images/resource/company-logo/1-1.png" alt="resource" />
											</div>
											<h5 className="company-name">Segment</h5>
											<a href="#" className="profile-link">
												View company profile
											</a>
										</div>
										<ul className="company-info">
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
												Email: <span>info@joio.com</span>
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
											<a href="#" target="_blank" rel="noopener noreferrer" className="theme-btn btn-style-three">
												https://segment.com
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
