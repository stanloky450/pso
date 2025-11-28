"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaGraduationCap, FaHammer, FaChurch, FaAward } from "react-icons/fa";

const Biography = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const highlights = [
		{
			icon: FaGraduationCap,
			title: "Education",
			items: ["Bachelor of Science (B.Sc.)", "Master of Theology (M.Th.)"],
		},
		{
			icon: FaHammer,
			title: "Professional",
			items: ["Skilled Builder", "Ministry Leader"],
		},
		{
			icon: FaChurch,
			title: "Ministry Role",
			items: ["Special Adviser to G.O. (SATGO)", "Youth Affairs Leader"],
		},
		{
			icon: FaAward,
			title: "Author",
			items: ["The G-Factor", "Set-Time", "Overcoming Issues of Life"],
		},
	];

	return (
		<section ref={ref} className="section-container bg-gradient-primary">
			<div className="grid lg:grid-cols-2 gap-12 items-center">
				{/* Image Placeholder */}

				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="relative"
				>
					<div className="relative w-full max-w-lg mx-auto">
						<div className="aspect-[3/4] bg-primary-dark rounded-3xl overflow-hidden shadow-2xl">
							<div className="w-full h-full flex items-center justify-center">
								<Image
									src="/images/PSO3.jpg"
									alt="Pastor Sola Olukoya"
									width={400}
									height={350}
									className="object-cover w-full h-full"
								/>
								{/* <p className="text-secondary text-center px-8">
									Pastor Sola Olukoya
									<br />
									<span className="text-sm text-text-muted">
										Professional Portrait Photo
									</span>

								</p> */}
							</div>
						</div>
						<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl" />
					</div>
				</motion.div>

				{/* Biography Content */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						Meet <span className="gradient-text">Pastor Sola Olukoya</span>
					</h1>

					<p className="text-xl text-text-muted mb-6 leading-relaxed">
						Pastor Sola Olukoya is a passionate servant of God, committed to
						raising disciples and transforming lives through the power of the
						Gospel. With a strong academic foundation and diverse professional
						experience, he brings a unique perspective to ministry leadership.
					</p>

					<p className="text-lg text-text-muted mb-8 leading-relaxed">
						As the Special Adviser to the General Overseer on Youth Affairs
						(SATGO) in the Redeemed Christian Church of God (RCCG), Pastor Sola
						leads global youth initiatives that impact millions of young people
						worldwide. His ministry is characterized by excellence, innovation,
						and a deep commitment to discipleship.
					</p>

					<div className="grid sm:grid-cols-2 gap-4">
						{highlights.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
								className="bg-primary-light rounded-lg p-4 border border-secondary/20"
							>
								<div className="flex items-center mb-3">
									<div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
										<item.icon className="text-primary text-lg" />
									</div>
									<h3 className="text-secondary font-bold">{item.title}</h3>
								</div>
								<ul className="text-text-muted text-sm space-y-1">
									{item.items.map((point, i) => (
										<li key={i}>• {point}</li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Biography;
