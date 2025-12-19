import React from "react";
import { FiUsers, FiGrid, FiPieChart } from "react-icons/fi";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem label="User Management" address="/dashboard/users" icon={FiUsers} />
      <MenuItem label="Tuition Management" address="/dashboard/manage-tuitions" icon={FiGrid} />
      <MenuItem label="Reports & Analytics" address="/dashboard/reports" icon={FiPieChart} />
    </>
  );
};

export default AdminMenu;