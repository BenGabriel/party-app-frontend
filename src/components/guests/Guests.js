import React, { useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/GuestContext";
import AuthContext from "../../context/authContext/AuthContext";
import Guest from "./Guest";

const Guests = () => {
  const { guests, filterGuest, search, getGuest } = useContext(GuestContext);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    getGuest();
    //eslint-disable-next-line
  }, []);
  if (guests === null || guests.length === 0) {
    return (
      <h3 className="no-guest">
        {loading ? "loading guests" : "Please add guest"}
      </h3>
    );
  }
  const guestStuff = (
    <div className="guests">
      {search !== null
        ? search.map((guest) => <Guest key={guest._id} guest={guest} />)
        : guests
            .filter((guest) => !filterGuest || guest.isConfirmed)
            .map((guest) => <Guest key={guest._id} guest={guest} />)}
    </div>
  );
  return <>{guests === [] ? "Please add guests" : guestStuff}</>;
};

export default Guests;
