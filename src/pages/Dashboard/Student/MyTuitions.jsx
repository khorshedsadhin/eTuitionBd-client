import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FiTrash2 } from "react-icons/fi";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import FadeIn from '../../../components/Shared/FadeIn';

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tuitions = [], isLoading, refetch } = useQuery({
        queryKey: ['my-tuitions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get('/my-tuitions');
            return result.data;
        }
    });

    const { mutateAsync: deleteTuition } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/tuition/${id}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success("Tuition deleted successfully!");
                refetch();
            }
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to delete tuition.");
        }
    });

    const handleDelete = async (id) => {
       Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2F9E44",
            cancelButtonColor: "#D62828",
            confirmButtonText: "Yes, delete it!"
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

            <h2 className="text-2xl font-bold mb-6 text-primary">My Posted Tuitions</h2>
            </FadeIn>

            <FadeIn delay={0.2}>

            {tuitions.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
                    <p className="text-gray-500">You haven't posted any tuitions yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-base-200/50 text-base-content/70">
                            <tr>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitions.map((item) => (
                                <tr key={item._id} className="hover:bg-base-200/20 transition-colors">
                                    <td className="font-medium text-primary">{item.subject}</td>
                                    <td>{item.class}</td>
                                    <td>{item.salary} Tk</td>
                                    <td>
                                        <span className={`badge ${item.status === 'approved' ? 'badge-success text-white' : 'badge-ghost'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            </FadeIn>
        </div>
    );
};

export default MyTuitions;