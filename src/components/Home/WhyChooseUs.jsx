import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
	FiShield,
	FiDollarSign,
	FiCheckCircle,
	FiUserCheck,
} from "react-icons/fi";

const WhyChooseUs = () => {
	return (
		<section className="py-24 bg-primary text-white font-manrope">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left: Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7 }}
						viewport={{ once: true }}
					>
						<span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold tracking-wide">
							WHY CHOOSE US
						</span>
						<h2 className="text-4xl md:text-5xl font-extrabold mt-6 mb-6 leading-tight">
							We Are The Best <br /> Tuition Platform
						</h2>
						<p className="text-white/80 text-lg mb-8 leading-relaxed">
							Our platform ensures a seamless experience for both students and
							tutors with verified profiles, secure payments, and dedicated
							support.
						</p>
						<Link
							to="/register"
							className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100"
						>
							Get Started Now
						</Link>
					</motion.div>

					{/* Right: Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[
							{
								title: "Verified Tutors",
								desc: "All tutors go through a strict verification process.",
								icon: FiShield,
							},
							{
								title: "Secure Payment",
								desc: "We ensure your payments are safe and tracked.",
								icon: FiDollarSign,
							},
							{
								title: "Dedicated Support",
								desc: "24/7 support to help you with any issues.",
								icon: FiCheckCircle,
							},
							{
								title: "Verified Reviews",
								desc: "Real feedback from students and parents.",
								icon: FiUserCheck,
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
							>
								<feature.icon size={32} className="text-secondary mb-4" />
								<h4 className="text-xl font-bold mb-2">{feature.title}</h4>
								<p className="text-white/70 text-sm">{feature.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
