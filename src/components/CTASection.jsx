import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: { opacity: 1, y: 0 }, // Slide into place
  };

  return (
    <motion.div
      className="bg-blue-600 text-white py-8 px-6 text-center"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Ready to Get Started?
      </motion.h2>
      <motion.p
        className="mt-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Contact us today to learn more about how we can help you.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link to="">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-gray-200">
            Get in Touch
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CTASection;
