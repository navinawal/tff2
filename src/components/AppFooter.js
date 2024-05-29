export default function AppFooter() {
	return (
		<footer className="main-footer style-six alternate -type-11 bg-background">
			<div className="footer-bg-image">
				<img src="/images/index-11/footer/1.png" alt="image" />
			</div>
			<div className="auto-container">
				<div className="row justify-content-center">
					<div className="col-auto">
						<div className="footer-title text-center">
							<h3>Got a question?</h3>
							<div>We are here to help. Check out our FAQs, send us an email or call us at 2 600 7777 9999</div>
						</div>
					</div>
				</div>
			</div>
			<div className="auto-container">
				<div className="widgets-section aos-init aos-animate" data-aos="fade-up">
					<div className="row">
						<div className="big-column col-xl-3 col-lg-3 col-md-12">
							<div className="footer-column about-widget">
								<div className="logo">
									<a href="#">
										<img src="/images/logo-2.svg" alt="brand" />
									</a>
								</div>
								<p className="phone-num">
									<span>Call us </span>
									<a href="thebeehost@support.com">123 456 7890</a>
								</p>
								<p className="address">
									329 Queensberry Street, North Melbourne VIC
									<br />
									3051, Australia. <br />
									<a href="mailto:support@superio.com" className="email">
										support@superio.com
									</a>
								</p>
							</div>
						</div>
						<div className="big-column col-xl-9 col-lg-9 col-md-12">
							<div className="row">
								<div className="footer-column col-lg-3 col-md-6 col-sm-12">
									<div className="footer-widget links-widget">
										<h4 className="widget-title">For Candidates</h4>
										<div className="widget-content">
											<ul className="list">
												<li>
													<a href="/">Browse Jobs</a>
												</li>
												<li>
													<a href="/">Browse Categories</a>
												</li>
												<li>
													<a href="/">Candidate Dashboard</a>
												</li>
												<li>
													<a href="/">Job Alerts</a>
												</li>
												<li>
													<a href="/">My Bookmarks</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="footer-column col-lg-3 col-md-6 col-sm-12">
									<div className="footer-widget links-widget">
										<h4 className="widget-title">For Employers</h4>
										<div className="widget-content">
											<ul className="list">
												<li>
													<a href="/">Browse Candidates</a>
												</li>
												<li>
													<a href="/">Employer Dashboard</a>
												</li>
												<li>
													<a href="/">Add Job</a>
												</li>
												<li>
													<a href="/">Job Packages</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="footer-column col-lg-2 col-md-6 col-sm-12">
									<div className="footer-widget links-widget">
										<h4 className="widget-title">About Us</h4>
										<div className="widget-content">
											<ul className="list">
												<li>
													<a href="/">Job Page</a>
												</li>
												<li>
													<a href="/">Job Page Alternative</a>
												</li>
												<li>
													<a href="/">Resume Page</a>
												</li>
												<li>
													<a href="/">Blog</a>
												</li>
												<li>
													<a href="/">Contact</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="footer-column col-lg-4 col-md-12 col-sm-12">
									<div className="footer-widget">
										<h4 className="widget-title">Join Us On</h4>
										<div className="widget-content">
											<div className="newsletter-form">
												<div className="text">We don’t send spam so don’t worry.</div>
												<form>
													<div className="form-group">
														<div className="response"></div>
													</div>
													<div className="form-group">
														<input type="email" name="email" className="email" placeholder="Email" required="" />
														<button type="button" id="subscribe-newslatters" className="theme-btn">
															<i className="flaticon-envelope"></i>
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-between items-center border-solid border-t border-t-white py-3 px-20">
				<div className="copyright-text">
					© 2024 Superio by{" "}
					<a href="https://themeforest.net/user/ib-themes" target="_blank" rel="noopener noreferrer">
						ib-themes
					</a>
					. All Right Reserved.
				</div>
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
			</div>
		</footer>
	);
}
