import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import FadeIn from '../../../components/Shared/FadeIn';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/tutor/applications');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full">
            <FadeIn>

            <h2 className="text-2xl font-bold mb-6 text-primary">My Applications</h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200/50">
                        <tr>
                            <th>Subject</th>
                            <th>Student Name</th>
                            <th>Applied Date</th>
                            <th>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    You haven't applied to any tuitions yet.
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} className="hover:bg-base-200/20">
                                    <td className="font-bold text-primary">{app.tuitionSubject}</td>
                                    <td>{app.studentEmail}</td>
                                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${
                                            app.status === 'accepted' ? 'badge-success text-white' : 
                                            app.status === 'rejected' ? 'badge-error text-white' : 'badge-ghost'
                                        }`}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            </FadeIn>
        </div>
    );
};

export default MyApplications;