import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
  if (!team) {
    return null;
  }

  return (
    <div className="teams-card hover:shadow-lg transition-shadow duration-200 w-[250px] m-2.5">
      <h3 className="text-xl font-semibold text-[#323130] mb-2">{team.name}</h3>
      <p className="text-sm text-[#605E5C] mb-4 break-all">ID: {team._id}</p>
      <Link 
        to={`/teams/${team._id}`} 
        className="teams-button-primary w-full text-center"
      >
        View Team
      </Link>
    </div>
  );
};

export default TeamCard;