"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";

const MeetPSOButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Floating Button */}
			{/* <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-secondary to-secondary-light text-primary font-bold py-4 px-6 rounded-full shadow-2xl flex items-center space-x-2 animate-pop animate-pulse-glow hover:scale-110 transition-transform"
      >
        <FaPlay className="text-xl" />
        <span className="text-lg">MEET PSO</span>
      </motion.button> */}

			{/* Video Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
						>
							{/* Modal Content */}
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ type: "spring", damping: 25 }}
								onClick={(e) => e.stopPropagation()}
								className="relative w-full max-w-5xl bg-primary-dark rounded-2xl overflow-hidden shadow-2xl"
							>
								{/* Close Button */}
								<button
									onClick={() => setIsOpen(false)}
									className="absolute top-4 right-4 z-10 w-12 h-12 bg-secondary hover:bg-secondary-dark rounded-full flex items-center justify-center transition-colors"
								>
									<FaTimes className="text-primary text-xl" />
								</button>

								{/* Video Content */}
								<div className="relative pt-[56.25%]">
									{/* Replace this div with actual video player */}
									<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
										<div className="text-center p-8">
											<FaPlay className="text-secondary text-6xl mx-auto mb-4" />
											<h3 className="text-3xl font-bold text-text mb-4">
												Meet Pastor Sola Olukoya
											</h3>
											<p className="text-text-muted mb-6">
												Upload your video file to public/videos/ folder
											</p>
											<p className="text-text-muted text-sm">
												Replace this with a video element or embed:
												<br />
												<code className="text-secondary mt-2 block">
													{`<video controls>`}
													<br />
													{`  <source src="/videos/meet-pso.mp4" type="video/mp4" />`}
													<br />
													{`</video>`}
												</code>
											</p>

											{/* Example with actual video element (uncomment when video is available) */}
											{/* <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                      >
                        <source src="/videos/meet-pso.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video> */}
										</div>
									</div>
								</div>

								{/* Video Info */}
								<div className="p-6 bg-primary-light">
									<h4 className="text-xl font-bold text-secondary mb-2">
										Pastor Sola Olukoya
									</h4>
									<p className="text-text-muted">
										Special Adviser to the General Overseer on Youth Affairs
										(SATGO) | Author | Ministry Leader
									</p>
								</div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default MeetPSOButton;
