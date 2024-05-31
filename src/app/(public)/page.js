import AppBanner from "@/components/AppBanner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<AppBanner />
			<section className="layout-pt-120 layout-pb-60">
				<div className="auto-container">
					<div className="row justify-content-between align-items-end">
						<div className="col-lg-6">
							<div className="sect-title">
								<h2 className="fw-700">Jobs by category</h2>
								<div className="text mt-9">2020 jobs live - 293 added today.</div>
							</div>
						</div>
						<div className="col-auto">
							<a href="#" className="button-icon -arrow text-dark-blue">
								Browse All<span className="fa fa-angle-right ms-1"></span>
							</a>
						</div>
					</div>
					<div className="row grid-flex pt-50 aos-init aos-animate" data-aos="fade-up">
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-money-1"></div>
								</div>
								<div className="content">
									<h4>Accounting / Finance</h4>
								</div>
							</a>
						</div>
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-promotion"></div>
								</div>
								<div className="content">
									<h4>Marketing</h4>
								</div>
							</a>
						</div>
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-vector"></div>
								</div>
								<div className="content">
									<h4>Design</h4>
								</div>
							</a>
						</div>
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-web-programming"></div>
								</div>
								<div className="content">
									<h4>Development</h4>
								</div>
							</a>
						</div>
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-headhunting"></div>
								</div>
								<div className="content">
									<h4>Human Resource</h4>
								</div>
							</a>
						</div>
						<div className="col-xl-auto col-lg-3 col-md-6 col-sm-12">
							<a className="icon-item -type-3" href="/job-list-v8">
								<div className="icon-wrap">
									<div className="icon flaticon-rocket-ship"></div>
								</div>
								<div className="content">
									<h4>Automotive Jobs</h4>
								</div>
							</a>
						</div>
					</div>
				</div>
			</section>
			<section className="layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="sec-title text-center">
								<h2>How It Works?</h2>
								<div className="text">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
								</div>
							</div>
						</div>
					</div>
					<div className="row grid-base aos-init aos-animate" data-aos="fade-up">
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="work-block -type-2 mb-0">
								<div className="inner-box">
									<div className="icon-wrap -blue">
										<span className="icon icon-case"></span>
									</div>
									<h5>Register an account to start</h5>
									<p>Achieve virtually any design and layout from within the one template.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="work-block -type-2 mb-0">
								<div className="inner-box">
									<div className="icon-wrap -red">
										<span className="icon icon-contact"></span>
									</div>
									<h5>Explore over thousands of resumes</h5>
									<p>Achieve virtually any design and layout from within the one template.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="work-block -type-2 mb-0">
								<div className="inner-box">
									<div className="icon-wrap -yellow">
										<span className="icon icon-doc"></span>
									</div>
									<h5>Find the most suitable candidate</h5>
									<p>Achieve virtually any design and layout from within the one template.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="about-section-two style-two layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="row justify-content-between align-items-center">
						<div className="image-column -no-margin col-xl-6 col-lg-6 col-md-12 col-sm-12 wow fadeInRight">
							<div className="image-box -type-1">
								<figure className="main-image aos-init aos-animate" data-aos-delay="500" data-aos="fade-in">
									<img src="/images/index-13/images/1.png" alt="resource" />
								</figure>
								<div className="info_block aos-init aos-animate" data-aos-delay="800" data-aos="fade-in">
									<span className="icon flaticon-email-3"></span>
									<p>
										Work Inquiry From <br />
										Ali Tufan
									</p>
								</div>
								<div className="info_block_two aos-init aos-animate" data-aos-delay="1100" data-aos="fade-in">
									<p>10k+ Candidates</p>
									<div className="image">
										<img src="/images/resource/multi-peoples.png" alt="resource" />
									</div>
								</div>
								<div className="info_block_four aos-init aos-animate" data-aos-delay="1300" data-aos="fade-in">
									<span className="icon flaticon-file"></span>
									<div className="inner">
										<p>Upload Your CV</p>
										<span className="sub-text">It only takes a few seconds</span>
									</div>
								</div>
							</div>
						</div>
						<div className="content-column mb-0 col-xl-5 col-lg-6 col-md-12 col-sm-12">
							<div data-aos="fade-right" className="aos-init aos-animate">
								<div className="sec-title">
									<h2 className="fw-700">Professional CV is your ticket to the dream job</h2>
									<div className="text mt-30">
										To start searching for jobs, you can attend job fairs online or in person, use job boards and career websites or reach out
										directly to recruiters in a targeted company to broaden your network.
									</div>
								</div>
								<a className="theme-btn btn-style-one" href="/candidates-dashboard/cv-manager">
									Post Resume
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="layout-pt-60 layout-pb-60">
				<div className="auto-container">
					<div className="featured-column">
						<div className="sec-title text-center">
							<h2 className="color-blue-dark fw-700">Latest Jobs</h2>
							<div className="text">Know your worth and find the job that qualify your life</div>
						</div>
					</div>
					<div className="outer-box job-block-five-separated aos-init aos-animate" data-aos="fade-up">
						<div className="mb-50">
							<ul className="switchbox -horizontal">
								<li>
									<label className="switch">
										<input type="checkbox" />
										<span className="slider round"></span>
										<span className="title">Freelancer</span>
									</label>
								</li>
								<li>
									<label className="switch">
										<input type="checkbox" checked="" />
										<span className="slider round"></span>
										<span className="title">Full Time</span>
									</label>
								</li>
								<li>
									<label className="switch">
										<input type="checkbox" />
										<span className="slider round"></span>
										<span className="title">Internship</span>
									</label>
								</li>
							</ul>
						</div>
						<div className="job-block-five">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<img src="/images/resource/company-logo/1-2.png" alt="item brand" />
									</span>
									<h4>
										<a href="/job-single-v4/2">Recruiting Coordinator</a>
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
								</div>
								<ul className="job-other-info">
									<li className="time">Freelancer</li>
								</ul>
								<a href="#" className="theme-btn btn-dark-blue">
									Apply Job
								</a>
							</div>
						</div>
						<div className="job-block-five">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<img src="/images/resource/company-logo/1-3.png" alt="item brand" />
									</span>
									<h4>
										<a href="/job-single-v4/3">Product Manager, Studio</a>
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
								</div>
								<ul className="job-other-info">
									<li className="time">Part Time</li>
								</ul>
								<a href="#" className="theme-btn btn-dark-blue">
									Apply Job
								</a>
							</div>
						</div>
						<div className="job-block-five">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<img src="/images/resource/company-logo/1-4.png" alt="item brand" />
									</span>
									<h4>
										<a href="/job-single-v4/4">Senior Product Designer</a>
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
								</div>
								<ul className="job-other-info">
									<li className="time">Temporary</li>
								</ul>
								<a href="#" className="theme-btn btn-dark-blue">
									Apply Job
								</a>
							</div>
						</div>
						<div className="job-block-five">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<img src="/images/resource/company-logo/1-5.png" alt="item brand" />
									</span>
									<h4>
										<a href="/job-single-v4/5">Senior Full Stack Engineer, Creator Success</a>
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
								</div>
								<ul className="job-other-info">
									<li className="time">Full Time</li>
								</ul>
								<a href="#" className="theme-btn btn-dark-blue">
									Apply Job
								</a>
							</div>
						</div>
						<div className="job-block-five">
							<div className="inner-box">
								<div className="content">
									<span className="company-logo">
										<img src="/images/resource/company-logo/1-6.png" alt="item brand" />
									</span>
									<h4>
										<a href="/job-single-v4/6">Software Engineer (Android), Libraries</a>
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
								</div>
								<ul className="job-other-info">
									<li className="time">Freelancer</li>
								</ul>
								<a href="#" className="theme-btn btn-dark-blue">
									Apply Job
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="layout-pt-60 layout-pb-120">
				<div className="auto-container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<div className="sec-title -type-2 text-center">
								<h2>Choose a plan that’s right for you.</h2>
								<div className="text">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
								</div>
							</div>
						</div>
					</div>
					<div className="row grid-base pricing3_hover aos-init aos-animate" data-aos="fade-up">
						<div className="col-lg-4 col-md-6">
							<div className="pricingCard -type-2">
								<h4 className="pricingCard__title">Start Up</h4>
								<div className="pricingCard__price">Free</div>
								<div className="pricingCard__subtitle">per month</div>
								<div className="pricingCard__img">
									<img src="/images/index-13/pricing/1.svg" alt="images" />
								</div>
								<div className="pricingCard__text text-left">Standard listing submission, active for 30 days</div>
								<ul className="pricingCard__list">
									<li>1 job posting</li>
									<li>0 featured job</li>
									<li>Job displayed for 20 days</li>
									<li>Premium Support 24/7</li>
								</ul>
								<div className="pricingCard__btn">
									<a className="theme-btn btn-style-modern" href="/shop/cart">
										Add to cart
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="pricingCard -type-2">
								<h4 className="pricingCard__title">Company</h4>
								<div className="pricingCard__price">$599.95</div>
								<div className="pricingCard__subtitle">per month</div>
								<div className="pricingCard__img">
									<img src="/images/index-13/pricing/2.svg" alt="images" />
								</div>
								<div className="pricingCard__text text-left">Standard listing submission, active for 30 days</div>
								<ul className="pricingCard__list">
									<li>1 job posting</li>
									<li>0 featured job</li>
									<li>Job displayed for 20 days</li>
									<li>Premium Support 24/7</li>
								</ul>
								<div className="pricingCard__btn">
									<a className="theme-btn btn-style-modern" href="/shop/cart">
										Add to cart
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="pricingCard -type-2">
								<h4 className="pricingCard__title">Enterprise</h4>
								<div className="pricingCard__price">$999.95</div>
								<div className="pricingCard__subtitle">per month</div>
								<div className="pricingCard__img">
									<img src="/images/index-13/pricing/3.svg" alt="images" />
								</div>
								<div className="pricingCard__text text-left">Standard listing submission, active for 30 days</div>
								<ul className="pricingCard__list">
									<li>1 job posting</li>
									<li>0 featured job</li>
									<li>Job displayed for 20 days</li>
									<li>Premium Support 24/7</li>
								</ul>
								<div className="pricingCard__btn">
									<a className="theme-btn btn-style-modern" href="/shop/cart">
										Add to cart
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
