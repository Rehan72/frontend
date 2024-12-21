import { motion } from "framer-motion";

const tableData = [
  { status: "Success", payment: "Success", email: "ken99@yahoo.com", amount: "$316.00" },
  { status: "Success", payment: "Success", email: "abe45@gmail.com", amount: "$242.00" },
  { status: "Processing", payment: "Processing", email: "monserrat44@gmail.com", amount: "$837.00" },
  { status: "Failed", payment: "Failed", email: "carmella@hotmail.com", amount: "$721.00" },
];

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cellVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};

export default function MotionTable() {
  return (
    <div className=" ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }, // Stagger animations
        }}
      >
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 ">
            <thead>
              <motion.tr variants={tableRowVariants}
               initial="hidden"
    animate="visible"
    className="bg-black text-white dark:bg-gray-800 dark:text-white transition-colors duration-300"
              >
                <th className="text-left font-semibold px-4 py-2">Status</th>
                <th className="text-left font-semibold px-4 py-2">Payment</th>
                <th className="text-left font-semibold px-4 py-2">Email</th>
                <th className="text-left font-semibold px-4 py-2">Amount</th>
              </motion.tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <motion.tr
                  key={index}
                  variants={tableRowVariants}
                  className="bg-white rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <motion.td
                    variants={cellVariants}
                    className="px-4 py-2 rounded-l-lg"
                  >
                    {row.status}
                  </motion.td>
                  <motion.td variants={cellVariants} className="px-4 py-3">
                    {row.payment}
                  </motion.td>
                  <motion.td variants={cellVariants} className="px-4 py-3">
                    {row.email}
                  </motion.td>
                  <motion.td
                    variants={cellVariants}
                    className="px-4 py-2 rounded-r-lg text-right"
                  >
                    {row.amount}
                  </motion.td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </motion.div>
    </div>
  );
}
