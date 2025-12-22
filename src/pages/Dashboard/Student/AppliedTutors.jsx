import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import FadeIn from '../../../components/Shared/FadeIn';

const AppliedTutors = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['applications-received', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/applications/received');
            return data;
        }
    });

    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) => {
            const { data } = await axiosSecure.patch(`/application/status/${id}`, { status });
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success(`Tutor ${variables.status} successfully!`);
            refetch();
        },
        onError: () => toast.error("Failed to update status.")
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full">
            <FadeIn>

            <h2 className="text-2xl font-bold mb-6 text-primary">Applied Tutors</h2>
            </FadeIn>

            <FadeIn delay={0.2}>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
                    <p className="text-gray-500">No tutors have applied to your tuitions yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th>Tutor Name</th>
                                <th>Tuition Subject</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id} className="hover:bg-base-200/20">
                                    <td className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={app.tutorImage || "https://i.ibb.co/MgsTCcv/avater.jpg"} alt="Tutor" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{app.tutorName}</div>
                                                <div className="text-xs opacity-50">{app.tutorEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{app.tuitionSubject}</td>
                                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${
                                            app.status === 'accepted' ? 'badge-success text-white' : 
                                            app.status === 'rejected' ? 'badge-error text-white' : 'badge-ghost'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        {app.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => updateStatus({ id: app._id, status: 'accepted' })}
                                                    className="btn btn-xs btn-success text-white"
                                                    title="Accept"
                                                >
                                                    <FiCheck />
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus({ id: app._id, status: 'rejected' })}
                                                    className="btn btn-xs btn-error text-white"
                                                    title="Reject"
                                                >
                                                    <FiX />
                                                </button>
                                            </div>
                                        )}
                                        {app.status === 'accepted' && (
                                            <button className="btn btn-xs btn-ghost text-primary">
                                                <FiMessageSquare /> Contact
                                            </button>
                                        )}
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

export default AppliedTutors;