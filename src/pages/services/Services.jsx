import CTASection from "../../components/CTASection"
import CustomerReviews from "../../components/CustomerReview"
import HeroSection from "../../components/HeroSection"
import MessageSection from "../../components/MessageSection"
import ServicesGrid from "../../components/ServicesGrid"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
function Services() {
  return (
<>
<div className="flex items-center justify-between">
   <Breadcrumb>
     <BreadcrumbList>
       <BreadcrumbItem>
         <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
         <BreadcrumbPage>Services</BreadcrumbPage>
       </BreadcrumbItem>
     </BreadcrumbList>
   </Breadcrumb>
  
  
 </div>
 <div>
    <HeroSection />
    <ServicesGrid />
    <CTASection />
    <CustomerReviews/>
    <MessageSection/>
  </div>
</>
  )
}

export default Services