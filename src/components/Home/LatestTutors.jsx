import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "../Shared/LoadingSpinner";

const LatestTutors = () => {
	const { data: latestTutors = [], isLoading } = useQuery({
		queryKey: ["home-tutors"],
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/home/tutors`
			);
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<section className="py-20 bg-base-200/50 font-manrope">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<span className="text-secondary font-bold text-sm uppercase tracking-wider">
						Expertise
					</span>
					<h2 className="text-3xl font-bold text-primary mt-2">
						Meet Our Top Tutors
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{latestTutors.map((tutor, index) => (
						<motion.div
							key={tutor._id}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 text-center hover:shadow-2xl transition-all"
						>
							<div className="avatar mb-4">
								<div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
									<img
										src={tutor.image || "https://i.ibb.co/MgsTCcv/avater.jpg"}
										alt={tutor.name}
									/>
								</div>
							</div>
							<h3 className="text-xl font-bold text-primary">{tutor.name}</h3>
							<p className="text-sm text-secondary uppercase font-semibold mt-1">
								Tutor
							</p>
							<div className="divider my-2 opacity-50"></div>
							<p className="text-xs text-base-content/60 mb-4">{tutor.email}</p>
							<Link
								to="/tutors"
								className="btn btn-sm btn-outline btn-primary w-full"
							>
								View Profile
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LatestTutors;
