import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
// import { Accordion, Avatar, Badge, Card, Input, List, ListItem } from '../../components/';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "../../components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
// import { Accordion } from '../../components/ui/accordion';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
const activities = [
  { id: 1, type: 'Energy Update', title: 'Energy usage exceeded 500kWh', timestamp: 'Today at 4:30 PM', status: 'unread', icon: '/alert-icon.png' },
  { id: 2, type: 'User Action', title: 'User John Doe logged in', timestamp: 'Yesterday at 10:00 AM', status: 'resolved', icon: '/user-icon.png' },
  { id: 3, type: 'Emissions Alert', title: 'High emissions detected', timestamp: '1 hour ago', status: 'unread', icon: '/alert-icon.png' },
  // Add more activities...
];

const ActivityFeedPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filteredActivities, setFilteredActivities] = useState(activities);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredActivities(
      activities.filter(activity =>
        activity.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

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
         <BreadcrumbPage>Activities</BreadcrumbPage>
       </BreadcrumbItem>
     </BreadcrumbList>
   </Breadcrumb>
  
 </div>
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          icon={<SearchIcon size={16} />}
          placeholder="Search activities..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {/* <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion> */}
       <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="filter">
          <AccordionTrigger>Filters</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-4">
             
              <div>
                <label className="block text-sm font-medium">Date Range</label>
                <input type="date" className="mt-2 p-2 border rounded" />
              </div>

             
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="all">All Categories</option>
                  <option value="energy">Energy Updates</option>
                  <option value="user">User Actions</option>
                  <option value="emissions">Emissions Alerts</option>
                </select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

     
      <div className="mt-6">
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id}>
              <Card className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <Avatar src="/alert-icon.png" />
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <Badge variant={activity.status === 'unread' ? 'destructive' : 'success'}>
                    {activity.status === 'unread' ? 'Critical' : 'Resolved'}
                  </Badge>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>

     
      {/* Pagination Section */}
    
    </div>
    </>
  );
};

export default ActivityFeedPage;
