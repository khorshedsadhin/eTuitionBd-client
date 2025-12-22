import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiMapPin, FiDollarSign, FiCalendar, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Tuitions = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(''); 
    const [classFilter, setClassFilter] = useState('');
    
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tuitions', page, search], 
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuitions?page=${page}&limit=9&search=${search}`);
            return res.data;
        }
    });

    const filteredTuitions = data?.tuitions?.filter(item => {
        if (!classFilter) return true;
        return item.class === classFilter;
    }).sort((a, b) => {
        if (sortOrder === 'asc') return a.salary - b.salary;
        if (sortOrder === 'desc') return b.salary - a.salary;
        return 0;
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); 
        refetch();
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-base-100 min-h-screen py-8 md:py-12 px-4 font-manrope">
            <div className="container mx-auto">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-primary">Available Tuitions</h2>
                        <p className="text-base-content/70 mt-1">Find the perfect tuition job for you.</p>
                    </div>

                    <form onSubmit={handleSearch} className="join w-full md:w-auto">
                        <input 
                            type="text" 
                            className="input input-bordered join-item w-full md:w-64 focus:outline-none" 
                            placeholder="Search subject or location..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary join-item text-white">
                            <FiSearch />
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 bg-base-200/50 p-4 rounded-xl border border-base-200">
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-primary" />
                        <span className="font-semibold text-sm">Filters:</span>
                    </div>
                    
                    <select 
                        className="select select-bordered select-sm rounded-lg focus:outline-none"
                        onChange={(e) => setClassFilter(e.target.value)}
                        value={classFilter}
                    >
                        <option value="">All Classes</option>
                        <option value="Class 1-5">Class 1-5</option>
                        <option value="Class 6-8">Class 6-8</option>
                        <option value="SSC">SSC</option>
                        <option value="HSC">HSC</option>
                    </select>

                    <select 
                        className="select select-bordered select-sm rounded-lg focus:outline-none"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                        <option value="">Sort by Salary</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>

                    <button 
                        onClick={() => { setClassFilter(''); setSortOrder(''); setSearch(''); }}
                        className="btn btn-sm btn-ghost text-error"
                    >
                        Reset
                    </button>
                </div>

                {filteredTuitions?.length === 0 ? (
                    <div className="text-center py-20 bg-base-200/30 rounded-xl border border-dashed border-base-300">
                        <p className="text-xl text-base-content/60 font-medium">No tuitions found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTuitions?.map((item) => (
                            <div key={item._id} className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <h3 className="card-title text-xl text-primary">{item.subject}</h3>
                                        <span className="badge badge-secondary badge-outline font-semibold">{item.class}</span>
                                    </div>
                                    
                                    <div className="space-y-3 my-4 text-base-content/70">
                                        <div className="flex items-center gap-2">
                                            <FiMapPin className="text-primary" />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiDollarSign className="text-primary" />
                                            <span className="font-bold text-base-content">{item.salary} Tk</span> / month
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="text-primary" />
                                            <span>{item.days} days/week</span>
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/tuition/${item._id}`} className="btn btn-primary btn-sm w-full text-white gap-2">
                                            View Details <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-12 gap-2">
                    <button 
                        onClick={() => setPage(old => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Previous
                    </button>
                    <span className="flex items-center px-4 font-bold text-primary">Page {page} of {data?.totalPages || 1}</span>
                    <button 
                        onClick={() => setPage(old => (data?.totalPages && old < data.totalPages ? old + 1 : old))}
                        disabled={page === (data?.totalPages || 1)}
                        className="btn btn-sm btn-outline"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tuitions;