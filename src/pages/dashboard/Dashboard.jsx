import {
   ChevronLeft,
   ChevronRight,
   DollarSign,
   LineChart,
   TrendingUp,
   Users,
} from "lucide-react";
import BarChartCard from "../../components/charts/BarChart";
import LineChartCard from "../../components/charts/LinChart";
import PieChart from "../../components/charts/PieChart";
// import { columns } from "../../components/payments/columns";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DataTable from "../../components/payments/DataTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "../../components/ui/breadcrumb";
import { Checkbox } from "../../components/ui/checkbox";
import TopWidgetCard from "../../components/widget/TopCardWidget";
const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "6kma53ae",
    amount: 879,
    status: "success",
    email: "Jilas22@gmail.com",
  },
  {
    id: "7hqecj4p",
    amount: 720,
    status: "failed",
    email: "Dermella@hotmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "6kma53ae",
    amount: 879,
    status: "success",
    email: "Jilas22@gmail.com",
  },
  {
    id: "7hqecj4p",
    amount: 720,
    status: "failed",
    email: "Dermella@hotmail.com",
  },
];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
    <div className="flex items-center justify-between">
   <Breadcrumb>
     <BreadcrumbList>
       {/* <BreadcrumbItem>
         <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
       </BreadcrumbItem> */}
       {/* <BreadcrumbSeparator /> */}
       <BreadcrumbItem>
         <BreadcrumbPage>Dashboard</BreadcrumbPage>
       </BreadcrumbItem>
     </BreadcrumbList>
   </Breadcrumb>
  
 </div>
      <div className="p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen">
        {/* Top Widget Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TopWidgetCard
            icon={Users}
            title="Users"
            value="12,345"
            description="Active users this month"
          />
          <TopWidgetCard
            icon={DollarSign}
            title="Revenue"
            value="$45,678"
            description="Total revenue this month"
          />
          <TopWidgetCard
            icon={LineChart}
            title="Performance"
            value="75%"
            description="Monthly performance"
          />
          <TopWidgetCard
            icon={TrendingUp}
            title="Engagement"
            value="82%"
            description="User engagement rate"
          />
        </div>

        <div className="p-4 m-4 flex items-center justify-start relative">
          {/* Filter button with rotating arrow */}
          <button
            className="flex items-center space-x-4 text-primary font-semibold cursor-pointer"
            onClick={toggleDropdown}
          >
            {/* Filter text with motion */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-primary"
            >
              Filter
            </motion.span>
            {/* Arrow icon animation */}
            <motion.div
              initial={{ rotate: 0 }}
              //animate={{ rotate: isOpen ? 30 : 0 }} // Rotate right when open, left when closed
              transition={{ duration: 0.3 }}
              className="text-primary"
            >
              {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </motion.div>
          </button>
          <AnimatePresence>
            {/* Dropdown content */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }} // Slide in from the left to right when opened
                exit={{ opacity: 0, x: -10 }} // Slide out when closed
                transition={{ duration: 0.3 }}
                className="flex space-x-4" // Added flex and space-x-4 for horizontal layout
              >
                {/* Weekly item with motion animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Start from the left
                  animate={{ opacity: 1, x: 0 }} // Slide in from the left
                  exit={{ opacity: 0, x: -20 }} // Slide out to the left
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer "
                >
                  Weekly
                </motion.div>

                {/* Monthly item with motion animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Start from the left
                  animate={{ opacity: 1, x: 0 }} // Slide in from the left
                  exit={{ opacity: 0, x: -20 }} // Slide out to the left
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Monthly
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chart Section */}
        <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* First Chart PieChart */}
          <motion.div
            className="flex justify-center items-center bg-light-card dark:bg-dark-card rounded-lg p-4"
            style={{
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px 2px rgb(0 0 0 / 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PieChart />
          </motion.div>

          {/* Placeholder for BarChartCard */}
          <motion.div
            className="flex justify-center items-center bg-light-card dark:bg-dark-card rounded-lg p-4"
            style={{
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px 2px rgb(0 0 0 / 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <BarChartCard />
          </motion.div>

          {/* Placeholder for LineChartCard */}
          <motion.div
            className="flex justify-center items-center bg-light-card dark:bg-dark-card rounded-lg p-4"
            style={{
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px 2px rgb(0 0 0 / 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <LineChartCard />
          </motion.div>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
