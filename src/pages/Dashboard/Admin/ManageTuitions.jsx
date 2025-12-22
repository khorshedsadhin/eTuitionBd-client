import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import FadeIn from "../../../components/Shared/FadeIn";

const ManageTuitions = () => {
	const axiosSecure = useAxiosSecure();

	const {
		data: allTuitions = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["admin-all-tuitions"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/tuitions/all");
			return data;
		},
	});

	const { mutateAsync: deleteTuition } = useMutation({
		mutationFn: async (id) => {
			const { data } = await axiosSecure.delete(`/tuition/${id}`);
			return data;
		},
		onSuccess: (data) => {
			if (data.deletedCount > 0) {
				toast.success("Tuition removed successfully.");
				refetch();
			}
		},
		onError: () => toast.error("Failed to delete tuition."),
	});

	const handleDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#2F9E44",
			cancelButtonColor: "#D62828",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteTuition(id);
			}
		});
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
      <FadeIn>
			<h2 className="text-2xl font-bold mb-6 text-primary">Manage Tuitions</h2>

      </FadeIn>

      <FadeIn delay={0.2}>

			<div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
				<table className="table w-full">
					<thead className="bg-base-200/50">
						<tr>
							<th>Subject</th>
							<th>Posted By</th>
							<th>Location</th>
							<th>Status</th>
							<th className="text-right">Action</th>
						</tr>
					</thead>
					<tbody>
						{allTuitions.map((item) => (
							<tr key={item._id} className="hover:bg-base-200/20">
								<td className="font-bold">{item.subject}</td>
								<td>{item.studentEmail}</td>
								<td>{item.location}</td>
								<td>
									<span className="badge badge-ghost badge-sm">
										{item.status || "Active"}
									</span>
								</td>
								<td className="text-right">
									<button
										onClick={() => handleDelete(item._id)}
										className="btn btn-ghost btn-sm text-error hover:bg-error/10"
										title="Delete Tuition"
									>
										<FiTrash2 size={18} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
      </FadeIn>
		</div>
	);
};

export default ManageTuitions;
