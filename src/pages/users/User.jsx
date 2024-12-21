import {
   CirclePlus,
   Edit,
   Eye,
   MoreHorizontal,
   ToggleLeft,
   Upload,
   Users
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BulkFileUploader from "../../components/BulkFileUploader";
import DataTable from "../../components/payments/DataTable";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import TopWidgetCard from "../../components/widget/TopCardWidget";
import { setSelectedUser } from "../../features/userSlice";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUploader, setShowUploader] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
   const [userStatusPopUp,setUserStatusPopUp]=useState(false)
  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    console.log("Uploaded Files:", files);
  };
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily White",
      email: "emily.white@example.com",
      role: "User",
      status: "Active",
    },
  ];
  const columns = [
    {
      id: "email", // Ensure 'id' matches what the filter references
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => (
        <a href={`mailto:${row.getValue("email")}`}>{row.getValue("email")}</a>
      ),
    },
    {
      header: "ID",
      accessorKey: "id", // Field name in the data
      cell: ({ row }) => <span>{row.getValue("id")}</span>, // Optional custom cell
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    // {
    //   header: "Email",
    //   accessor: "email",
    //   render: ({ row }) => <a href={`mailto:${row.getValue("email")}`}>{row.getValue("email")}</a>,
    // },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => <span>{row.getValue("role")}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded ${
            row.getValue("status") === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status")}
        </span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => {
        

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleEditUser(row)}
                className="flex items-center space-x-2 hover:bg-gray-100"
              >
                <Edit className="w-5 h-5 text-blue-500" />
                <span>Edit User</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleViewUser(row)}
                className="flex items-center space-x-2 hover:bg-gray-100"
              >
                <Eye className="w-5 h-5 text-green-500" />
                <span>View User</span>
              </DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => handleUserStatus(row)}
               className="flex items-center space-x-2 hover:bg-gray-100">
                <ToggleLeft className="w-5 h-5 text-yellow-500" />
                <span>Change Status</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditUser = (data) => {
    dispatch(setSelectedUser(data));
    navigate("/edit-user");
  };

  const handleViewUser = (data) => {
    dispatch(setSelectedUser(data));
    navigate("/view-user");
  };

  const handleUserStatus =(data)=>{
   dispatch(setSelectedUser(data));
   setUserStatusPopUp(true)
  }

  return (
    <div className="p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-6">
         <Button className="lg:grid-cols-4" onClick={() => setShowUploader(true)}> <Upload className="w-5 h-5" size={20} />  Bulk-Upload</Button>
        
      </div>
      </div>

      <div className="flex items-center justify-between">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TopWidgetCard
          icon={Users}
          title="Active Users"
          value="12,345"
          description="Active users this month"
        />
        <TopWidgetCard
          icon={Users}
          title="Inactive Users"
          value="345"
          description="Inactive users this month"
        />
      </div>
      
      <Link to="/user/add-user">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add user</span>
          </Button>
        </Link>
      </div>
      <div className="container mx-auto py-10">
  <div className="overflow-x-auto">
    <DataTable columns={columns} data={data} />
  </div>
</div>

      <BulkFileUploader
        onFilesChange={handleFilesChange}
        showDialog={showUploader}
        setShowDialog={setShowUploader}
      />

{
      userStatusPopUp ?
      <Dialog open={userStatusPopUp} onOpenChange={setUserStatusPopUp}>
        <DialogContent className="p-6 flex justify-center items-center">
        <DialogHeader>
          <DialogTitle>User status change</DialogTitle>
        </DialogHeader>
        
        </DialogContent>
      </Dialog>:''

    }
    </div>
    
  );
}

export default User;
