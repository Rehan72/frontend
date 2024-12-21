import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: { opacity: 1, y: 0 }, // Slide into place
  };

  return (
    <motion.div
      className="bg-blue-600 text-white py-16 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-extrabold"
        variants={itemVariants}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-gray-200"
        variants={itemVariants}
        transition={{ duration: 1 }}
      >
        Explore the wide range of services we offer to help you succeed.
      </motion.p>
    </motion.div>
  );
};

export default HeroSection;
