// components/LinkedInNewsCard.js

import React from "react";

const LinkedInNewsCard = () => {
  const newsItems = [
    { title: "E-retailer retag health drinks", time: "4h ago", readers: 345 },
    {
      title: "Lets transport raises $22 million",
      time: "4h ago",
      readers: 323,
    },
    { title: "Casual wear is in at India Inc", time: "4h ago", readers: 234 },
    { title: "Smaller cities go on loans", time: "4h ago", readers: 112 },
  ];

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">LinkedIn News</h2>
        <i className="fas fa-info-circle text-gray-500"></i>
      </div>
      {newsItems.map((item, index) => (
        <div key={index} className="mb-3">
          <h3 className="text-sm text-blue-600">{item.title}</h3>
          <p className="text-xs text-gray-500">
            {item.time} - {item.readers} readers
          </p>
        </div>
      ))}
    </div>
  );
};

export default LinkedInNewsCard;
