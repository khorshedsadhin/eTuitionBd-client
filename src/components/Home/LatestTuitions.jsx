import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiArrowRight } from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";

const LatestTuitions = () => {
	const { data: latestTuitions = [], isLoading } = useQuery({
		queryKey: ["home-tuitions"],
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/home/tuitions`
			);
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<section className="py-20 container mx-auto px-4">
			<div className="flex justify-between items-end mb-10">
				<div>
					<span className="text-secondary font-bold text-sm uppercase tracking-wider">
						Opportunities
					</span>
					<h2 className="text-3xl font-bold text-primary mt-2">
						Latest Tuitions
					</h2>
				</div>
				<Link
					to="/tuitions"
					className="btn btn-ghost text-primary hidden md:flex"
				>
					View All <FiArrowRight />
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{latestTuitions.map((item, index) => (
					<motion.div
						key={item._id}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
						className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 transition-all duration-300"
					>
						<div className="card-body">
							<div className="flex justify-between items-start">
								<h3 className="card-title text-primary">{item.subject}</h3>
								<div className="badge badge-secondary badge-outline">
									{item.class}
								</div>
							</div>
							<div className="text-sm text-base-content/70 space-y-2 mt-4">
								<div className="flex items-center gap-2">
									<FiMapPin className="text-primary" /> {item.location}
								</div>
								<div className="flex items-center gap-2 font-bold text-base-content">
									<FiDollarSign className="text-primary" /> {item.salary}{" "}
									Tk/month
								</div>
							</div>
							<div className="card-actions justify-end mt-6">
								<Link
									to={`/tuition/${item._id}`}
									className="btn btn-sm btn-primary w-full text-white"
								>
									View Details
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-8 text-center md:hidden">
				<Link to="/tuitions" className="btn btn-outline btn-primary w-full">
					View All Tuitions
				</Link>
			</div>
		</section>
	);
};

export default LatestTuitions;
