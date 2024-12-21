import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../components/ui/card";

const CustomerReview = ({ name, review, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }} // Slightly enlarge on hover
    whileTap={{ scale: 0.95 }} // Shrink slightly on tap
    initial={{ opacity: 0, y: 20 }} // Start off-screen
    animate={{ opacity: 1, y: 0 }} // Animate into place
    transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
  >
    <Card className="hover:shadow-lg transition-shadow rounded-lg shadow-md p-6">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-center">{name}</h3>
      <p className="mt-2 text-gray-600 text-center">{review}</p>
    </Card>
  </motion.div>
);

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "The services provided were excellent and beyond my expectations!",
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Fantastic experience. Highly recommended for everyone!",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Emily Johnson",
      review: "The team was professional, and the quality of work was great.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Michael Brown",
      review: "Truly exceptional service. I will definitely return.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Sarah Wilson",
      review: "They exceeded all my expectations. Amazing job!",
      image: "https://via.placeholder.com/150",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations for child components
      },
    },
  };

  return (
    <Card className="py-12 px-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants} // Apply container animation
      >
        <CardHeader className="text-3xl font-bold text-center mb-8">
          Customer Reviews
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <CustomerReview key={review.id} {...review} />
          ))}
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default CustomerReviews;
