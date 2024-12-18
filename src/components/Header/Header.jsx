import React from "react";
import NHSLogoWhite from "../../Images/NHSLogoWhite.png";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const details = useSelector((state) => state.details);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [day, month, year] = dateString.split('/');

    const date = new Date(`${year}-${month}-${day}`);

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
  const nhsNumber = details?.NHSNumber ? details.NHSNumber : null;

  return (
    <div className="header">
      <div>
        <img src={NHSLogoWhite} alt="NHS Logo" />
      </div>
      <div>Patient Referral Portal&nbsp;</div>
      <div>
        {/* Corrected conditional rendering for firstNameSurname */}
        {firstNameSurname && (
          <>
            <span style={{fontWeight:"normal"}}>- Name:</span> <b>{firstNameSurname}</b>
          </>
        )}
        {/* Corrected conditional rendering for formattedDate */}
        {formattedDate && (
          <>
            <span style={{fontWeight:"normal"}}> - DOB: </span> <b>{formattedDate}</b>
          </>
        )}
        {nhsNumber && (
          <>
            <span style={{fontWeight:"normal"}}> - NHS Number: </span> <b>{nhsNumber}</b>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
