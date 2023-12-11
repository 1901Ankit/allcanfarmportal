import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { RiFileAddFill } from "react-icons/ri";
import { FaStreetView } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

const CollapsibleTable = ({ data, shows }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleExpandRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleEditClick = (item) => {
    // Implement your edit click logic
  };

  const addFarmModal = (user_id) => {
    // Implement your add farm modal logic
  };

  const HandleViewClick = (item) => {
    // Implement your view click logic
  };

  const addstoryModal = (user_id) => {
    // Implement your add story modal logic
  };

  const HandleViewClik = (item) => {
    // Implement your view click logic
  };

  return (
    <table className="table table-bordered mt-5">
      <thead className="bg-dark text-white">
        {/* The table header goes here */}
        {/* ... */}
      </thead>
      <tbody>
        {data &&
          data.map((item, id) => (
            <React.Fragment key={id}>
              <tr>
                <td className="" style={{ fontSize: "14px" }}>
                  {id + 1}
                </td>
                {/* Render other table cells */}
                {/* ... */}
                <td className="" style={{ fontSize: "14px" }}>
                  <a onClick={() => handleExpandRow(id)} className="icosn">
                    {expandedRows.includes(id) ? 'Collapse' : 'Expand'}
                  </a>
                </td>
              </tr>
              {expandedRows.includes(id) && (
                <tr>
                  {/* Render your expanded content here */}
                  {/* ... */}
                  <td colSpan="9">
                    {/* Expanded content */}
                    <a onClick={() => handleEditClick(item)} className="icosn">
                      <FaEdit className="" /> {/* Edit */}
                    </a>
                    {!shows && (
                      <a onClick={() => addFarmModal(item.user_id)} className="icosn">
                        <HiUserAdd className="" /> {/* Add Farm */}
                      </a>
                    )}
                    {!shows && (
                      <a onClick={() => HandleViewClick(item)} className="icosn">
                        <FaEye className="" /> {/* View Farms */}
                      </a>
                    )}
                    {!shows && (
                      <a onClick={() => addstoryModal(item.user_id)} className="icosn">
                        <RiFileAddFill /> {/* Add Story */}
                      </a>
                    )}
                    {!shows && (
                      <a onClick={() => HandleViewClik(item)} className="icosn">
                        <FaStreetView /> {/* View Story */}
                      </a>
                    )}
                    <a className="icosn">
                      <AiTwotoneDelete /> {/* Delete */}
                    </a>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};

export default CollapsibleTable;
