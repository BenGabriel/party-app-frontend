import React, { useContext } from "react";
import GuestContext from "../../context/guestContext/GuestContext";

import { FaCheckSquare, FaPhoneAlt, FaTrash, FaUserEdit } from "react-icons/fa";

const Guest = ({ guest }) => {
  const { removeGuest, updateGuest, editGuest } = useContext(GuestContext);
  const { _id, name, phone, dietary, isConfirmed } = guest;

  const handleRemove = () => {
    removeGuest(_id);
  };

  const handleConfirmed = () => {
    updateGuest({ ...guest, isConfirmed: !isConfirmed });
  };
  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={`${isConfirmed && "confirm"}`}>
            Confirmed
            <i className={`${isConfirmed && "confirm"}`}>
              <FaCheckSquare />
            </i>
            <input type="checkbox" onChange={handleConfirmed} />
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i>
              <FaUserEdit />
            </i>
          </button>
          <button onClick={handleRemove}>
            <i className="remove">
              <FaTrash />
            </i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span
          className={
            "badge " +
            (dietary === "Non-Veg"
              ? "red"
              : dietary === "Vegan"
              ? "green"
              : "seaGreen")
          }
        >
          {dietary}
        </span>
        <div className="contact">
          <i>
            <FaPhoneAlt />
          </i>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Guest;
