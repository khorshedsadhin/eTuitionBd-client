import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUserCheck, FiBookOpen } from "react-icons/fi";

const HowItWorks = () => {
	return (
		<section className="py-24 container mx-auto px-4 font-manrope">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-extrabold text-primary">How It Works</h2>
				<p className="text-base-content/70 mt-3">
					Get started in 3 simple steps
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
				<div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-primary/20 -z-10"></div>

				<motion.div
					initial={{ x: -100, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center bg-base-100 p-6"
				>
					<div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
						<FiSearch size={40} />
					</div>
					<h3 className="text-xl font-bold mb-3">1. Post a Requirement</h3>
					<p className="text-base-content/70">
						Students post their tuition needs including subject, class, and
						budget details.
					</p>
				</motion.div>

				<motion.div
					initial={{ y: 50, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="text-center bg-base-100 p-6"
				>
					<div className="w-24 h-24 mx-auto bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6 shadow-sm">
						<FiUserCheck size={40} />
					</div>
					<h3 className="text-xl font-bold mb-3">2. Connect with Tutors</h3>
					<p className="text-base-content/70">
						Qualified tutors apply to your post. Review their profiles and
						select the best match.
					</p>
				</motion.div>

				<motion.div
					initial={{ x: 100, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="text-center bg-base-100 p-6"
				>
					<div className="w-24 h-24 mx-auto bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6 shadow-sm">
						<FiBookOpen size={40} />
					</div>
					<h3 className="text-xl font-bold mb-3">3. Start Learning</h3>
					<p className="text-base-content/70">
						Confirm the tutor and begin your learning journey securely.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default HowItWorks;
