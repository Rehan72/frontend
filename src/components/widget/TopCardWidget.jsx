import { motion } from "framer-motion";

function TopWidgetCard({ icon: Icon, title, value, description }) {
  // Define a parent animation for stagger effect
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2, // Add delay between child animations
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-light-card dark:bg-dark-card rounded-lg p-4 flex items-center"
      style={{
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px 2px rgb(0 0 0 / 0.1)",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Animated Icon */}
      <motion.div
        className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
        variants={itemVariants}
        transition={{ duration: 0.6 }}
      >
        <Icon size={24} />
      </motion.div>

      {/* Content Section */}
      <div className="ml-4">
        {/* Animated Title */}
        <motion.h4
          className="text-lg font-semibold text-light-text dark:text-dark-text"
          variants={itemVariants}
        >
          {title}
        </motion.h4>

        {/* Animated Value */}
        <motion.p
          className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          {value}
        </motion.p>

        {/* Animated Description */}
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default TopWidgetCard;
