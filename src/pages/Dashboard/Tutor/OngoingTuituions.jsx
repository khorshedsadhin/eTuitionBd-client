import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiCheckCircle } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import FadeIn from '../../../components/Shared/FadeIn';

const OngoingTuituions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: ongoing = [], isLoading } = useQuery({
        queryKey: ['ongoing-tuitions', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/tutor/ongoing-tuitions');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full">
            <FadeIn>

            <h2 className="text-2xl font-bold mb-6 text-primary">Ongoing Tuitions</h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ongoing.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
                        <p className="text-gray-500">No active tuitions right now.</p>
                    </div>
                ) : (
                    ongoing.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow-md border border-base-200">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="card-title text-primary">{item.tuitionSubject}</h3>
                                        <p className="text-sm text-gray-500">Student: {item.studentEmail}</p>
                                    </div>
                                    <div className="badge badge-success text-white gap-1">
                                        <FiCheckCircle /> Active
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="btn btn-sm btn-outline btn-primary w-full">
                                        View Class Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </FadeIn>
        </div>
    );
};

export default OngoingTuituions;