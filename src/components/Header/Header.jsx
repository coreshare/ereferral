import React from "react";
import NHSLogoWhite from "../../Images/NHSLogoWhite.png";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const details = useSelector((state) => state.details);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Split the date string into day, month, year (assuming dd/mm/yyyy)
    const [day, month, year] = dateString.split('/');

    // Create a new Date object with the correct order
    const date = new Date(`${year}-${month}-${day}`);

    // Check if the date is valid
    if (!isNaN(date)) {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
    return "";
  };

  // Construct the display text based on available data
  const firstNameSurname = details?.FirstName && details?.Surname
    ? `${details.FirstName} ${details.Surname}`
    : null;

  const formattedDate = details?.DateofBirth ? formatDate(details.DateofBirth) : null;

  return (
    <div className="header">
      <div>
        <img src={NHSLogoWhite} alt="NHS Logo" />
      </div>
      <div>Patient Referral Portal&nbsp;</div>
      <div>
        {firstNameSurname && ` - ${firstNameSurname}`}
        {formattedDate && ` - ${formattedDate}`}
        {formattedDate && " (DOB)"}
      </div>
    </div>
  );
};

export default Header;
