import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiEdit, FiUser, FiShield, FiBookOpen, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Button from "../../../components/Shared/Button/Button";
import FadeIn from "../../../components/Shared/FadeIn";

const ManageUsers = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const { mutateAsync: updateRole, isPending } = useMutation({
    mutationFn: async ({ id, role }) => {
      const { data } = await axiosSecure.patch(`/users/role/${id}`, { role });
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("User role updated successfully!");
        refetch();
        setSelectedUser(null);
      }
    },
    onError: () => toast.error("Failed to update role."),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
      <h2 className="text-2xl font-bold mb-6 text-primary">Manage Users</h2>

      </FadeIn>

      <FadeIn delay={0.2}>
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.email !== loggedInUser?.email)
              .map((user, index) => (
                <tr key={user._id} className="hover:bg-base-200/20">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-primary"
                          : user.role === "tutor"
                          ? "badge-secondary"
                          : "badge-ghost"
                      } badge-outline capitalize`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end">
                      <Button 
                        label="Edit Role" 
                        small 
                        variant="ghost" 
                        icon={FiEdit}
                        onClick={() => setSelectedUser(user)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      </FadeIn>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-base-100 p-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Update User Role</h3>
              <button 
                onClick={() => setSelectedUser(null)}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => updateRole({ id: selectedUser._id, role: "student" })}
                disabled={isPending}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedUser.role === 'student' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-base-300 hover:border-primary/50'
                }`}
              >
                <div className="p-2 bg-base-100 rounded-lg"><FiUser /></div>
                <div className="text-left">
                    <p className="font-bold text-sm">Student</p>
                    <p className="text-xs opacity-70">Standard user access</p>
                </div>
              </button>

              <button
                onClick={() => updateRole({ id: selectedUser._id, role: "tutor" })}
                disabled={isPending}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedUser.role === 'tutor' 
                    ? 'border-secondary bg-secondary/10 text-secondary' 
                    : 'border-base-300 hover:border-secondary/50'
                }`}
              >
                <div className="p-2 bg-base-100 rounded-lg"><FiBookOpen /></div>
                <div className="text-left">
                    <p className="font-bold text-sm">Tutor</p>
                    <p className="text-xs opacity-70">Can accept tuitions</p>
                </div>
              </button>

              <button
                onClick={() => updateRole({ id: selectedUser._id, role: "admin" })}
                disabled={isPending}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedUser.role === 'admin' 
                    ? 'border-error bg-error/10 text-error' 
                    : 'border-base-300 hover:border-error/50'
                }`}
              >
                <div className="p-2 bg-base-100 rounded-lg"><FiShield /></div>
                <div className="text-left">
                    <p className="font-bold text-sm">Admin</p>
                    <p className="text-xs opacity-70">Full system access</p>
                </div>
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;