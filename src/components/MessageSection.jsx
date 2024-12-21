import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MessageSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations of children
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-blue-600 text-white py-12 px-6"
    >
      <motion.div
        variants={item}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold">Have a Question?</h2>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-4 max-w-xl mx-auto text-lg text-center"
      >
        <p>Reach out to us anytime. We're here to help you with all your needs.</p>
      </motion.div>

      <motion.div
        variants={item}
        className="flex justify-center mt-6"
      >
        <Link to="/contact">
          <motion.div
            whileHover={{ scale: 1.1 }} // Hover effect
            whileTap={{ scale: 0.95 }} // Tap effect
          >
            <Button className="bg-white text-blue-600 px-6 py-2 rounded-md shadow-md hover:bg-gray-200">
              Contact Us
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MessageSection;
