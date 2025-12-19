import React from "react";
import { FiGrid, FiPlusSquare, FiUsers, FiDollarSign } from "react-icons/fi";
import MenuItem from "./MenuItem";

const StudentMenu = () => {
  return (
    <>
      <MenuItem label="My Tuitions" address="/dashboard/my-tuitions" icon={FiGrid} />
      <MenuItem label="Post New Tuition" address="/dashboard/post-tuition" icon={FiPlusSquare} />
      <MenuItem label="Applied Tutors" address="/dashboard/applied-tutors" icon={FiUsers} />
      <MenuItem label="Payments" address="/dashboard/payments" icon={FiDollarSign} />
    </>
  );
};

export default StudentMenu;