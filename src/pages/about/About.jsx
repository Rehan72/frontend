import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
function About() {
  return (
   <div className="flex items-center justify-between">
   <Breadcrumb>
     <BreadcrumbList>
       <BreadcrumbItem>
         <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
         <BreadcrumbPage>About</BreadcrumbPage>
       </BreadcrumbItem>
     </BreadcrumbList>
   </Breadcrumb>
  
 </div>
  )
}

export default About