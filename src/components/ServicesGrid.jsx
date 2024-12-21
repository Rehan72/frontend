import { motion } from "framer-motion";
import { Code, LineChart, Paintbrush } from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServicesGrid = () => {
  const services = [
    { id: 1, title: "Web Development", description: "Build modern web applications.", Icon: Code },
    { id: 2, title: "UI/UX Design", description: "Design user-friendly interfaces.", Icon: Paintbrush },
    { id: 3, title: "Digital Marketing", description: "Promote your brand online.", Icon: LineChart },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: { opacity: 1, y: 0 }, // Animate into view
  };

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }} // Slightly enlarge on hover
    whileTap={{ scale: 0.95 }} // Shrink slightly on tap
    initial={{ opacity: 0, y: 20 }} // Start off-screen
    animate={{ opacity: 1, y: 0 }} // Animate into place
    transition={{ duration: 0.5, ease: "easeOut" }} 
        >
          <ServiceCard {...service} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServicesGrid;
