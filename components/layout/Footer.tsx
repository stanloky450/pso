import Link from "next/link";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaYoutube,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-primary-dark text-text">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* About Section */}
					<div>
						<h3 className="text-xl font-bold text-secondary mb-4">
							Pastor Sola Olukoya
						</h3>
						<p className="text-text-muted mb-4">
							Special Adviser to the General Overseer on Youth Affairs (SATGO),
							Author, and Ministry Leader dedicated to raising disciples and
							transforming lives.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.facebook.com/PastorSolaOlukoya/"
								className="text-secondary hover:text-secondary-light transition-colors"
							>
								<FaFacebook size={20} />
							</a>
							<a
								href="https://x.com/pastorolukoya"
								className="text-secondary hover:text-secondary-light transition-colors"
							>
								<FaTwitter size={20} />
							</a>
							<a
								href="https://www.instagram.com/pastorsolaolukoya/"
								className="text-secondary hover:text-secondary-light transition-colors"
							>
								<FaInstagram size={20} />
							</a>
							<a
								href="https://www.youtube.com/@pastorsolaolukoya"
								className="text-secondary hover:text-secondary-light transition-colors"
							>
								<FaYoutube size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-bold text-secondary mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									About Pastor
								</Link>
							</li>
							<li>
								<Link
									href="/satgo"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									SATGO Office
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									Blog/Devotional
								</Link>
							</li>
							<li>
								<Link
									href="/books"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									Books
								</Link>
							</li>
						</ul>
					</div>

					{/* Ministry Links */}
					<div>
						<h3 className="text-xl font-bold text-secondary mb-4">Ministry</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/satgo#yaya"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									YAYA Worldwide
								</Link>
							</li>
							<li>
								<Link
									href="/satgo#psf"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									PSF - Living Seed
								</Link>
							</li>
							<li>
								<Link
									href="/satgo#shift"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									SHIFT Talent Hunt
								</Link>
							</li>
							<li>
								<Link
									href="/satgo#rise"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									RISE Initiative
								</Link>
							</li>
							<li>
								<Link
									href="/satgo#iyc"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									Youth Convention
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-xl font-bold text-secondary mb-4">Contact</h3>
						<ul className="space-y-3">
							<li className="flex items-start">
								<FaMapMarkerAlt className="text-secondary mt-1 mr-3 flex-shrink-0" />
								<span className="text-text-muted">
									RCCG Jesus Embassy
									<br />
									Abuja, Nigeria
								</span>
							</li>
							<li className="flex items-center">
								<FaPhone className="text-secondary mr-3" />
								<a
									href="tel:+234"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									+234 XXX XXX XXXX
								</a>
							</li>
							<li className="flex items-center">
								<FaEnvelope className="text-secondary mr-3" />
								<a
									href="mailto:contact@pastorsolaolukoya.com"
									className="text-text-muted hover:text-secondary transition-colors"
								>
									info@solaolukoya.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-primary-light mt-8 pt-8 text-center">
					<p className="text-text-muted">
						&copy; {currentYear} Pastor Sola Olukoya Ministry. All rights
						reserved.
					</p>
					<p className="text-text-muted mt-2 text-sm">
						Built with faith and excellence
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
