export const columns = [
   {
      accessorKey: "id",
      // header: () => <div className="text-right font-medium">ID</div>,
      
    },
   {
     accessorKey: "amount",
     header: () => <div className="text-right">Amount</div>,
     cell: ({ row }) => {
       const amount = parseFloat(row.getValue("amount"))
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(amount)
 
       return <div className="text-right font-medium">{formatted}</div>
     },
   },
   {
      accessorKey: "status",
      // header: () => <div className="text-right font-medium">Status</div>,
      
    },
    {
      accessorKey: "email",
      // header: () => <div className="text-right font-medium">Email</div>,
      
    },
 ]
 