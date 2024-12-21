import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Reusable Dynamic Button Component
const DynamicButton = ({ name, color, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick(name)} // Pass the button name on click
      className={`px-6 py-2 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${color}`}
      initial={{ opacity: 0, x: -20 }} // Start from the left
      animate={{ opacity: 1, x: 0 }} // Slide in from the left
      exit={{ opacity: 0, x: -20 }} // Slide out to the left
      transition={{ duration: 0.3 }} // Smooth transition for scaling
    >
      {name}
    </motion.button>
  );
};

const Reports = () => {
  const [isReportsVisible, setIsReportsVisible] = useState(false); // Tracks visibility of report buttons
  const [selected, setSelected] = useState("user"); // Default to "user"

  // Buttons configuration
  const buttons = [
    { name: "User", color: "bg-blue-500" },
    { name: "Home", color: "bg-green-500" },
    { name: "Activity", color: "bg-purple-500" }
  ];

  // Function to handle button clicks
  const handleButtonClick = (buttonName) => {
    setSelected(buttonName); // Update selected button
  };

  // Toggle visibility of report buttons
  const handleReportsClick = () => {
    setIsReportsVisible((prev) => !prev); // Toggle visibility of user, home, activity buttons
  };

  // Content that will change based on button click
  const renderContent = () => {
    switch (selected) {
      case "user":
        return <div>User Content</div>;
      case "home":
        return <div>Home Content</div>;
      case "activity":
        return <div>Activity Content</div>;
      default:
        return <div>Welcome to the Report Page!</div>;
    }
  };

  return (
    <div className="p-6">
      {/* Container for Reports Button and Other Buttons */}
      <div className="flex items-center space-x-4"> {/* flex to align items on the same row */}
        {/* Reports Button */}
        <motion.button
          onClick={handleReportsClick} // Toggles visibility of report buttons
          className="px-6 py-2 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex bg-black"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            Reports
          </motion.span>

          {/* Arrow icon animation */}
          <motion.div
            initial={{ rotate: 0 }}
            //animate={{ rotate: isReportsVisible ? 90 : 0 }} // Rotate right when open, left when closed
            transition={{ duration: 0.3 }}
            className="text-white ml-2"
          >
            {isReportsVisible ? (
              <ChevronRight size={16} className="mt-1 text-white" />
            ) : (
              <ChevronLeft size={16} className="mt-1 text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Display User, Home, and Activity buttons with motion in a row when Reports is clicked */}
        {isReportsVisible && (
          <div className="flex space-x-4"> {/* flex to align buttons in a row */}
            {buttons.map((button) => (
              <motion.div key={button.name}>
                <DynamicButton
                  name={button.name}
                  color={button.color}
                  onClick={handleButtonClick}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected content */}
      <motion.div
        key={selected} // Ensures the content is remounted with each selection change
        initial={{ opacity: 0 }} // Start with opacity 0 (invisible)
        animate={{ opacity: 1 }} // Animate to opacity 1 (fully visible)
        exit={{ opacity: 0 }} // Fade out when exiting
        transition={{ duration: 0.5 }} // Duration of the fade effect
        className="p-6 bg-gray-100 rounded-lg mt-6"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default Reports;
