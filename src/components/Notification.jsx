import { motion } from 'framer-motion';
import { Bell } from 'lucide-react'; // Import the Bell icon from lucide-react
import { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useTheme } from '../context/Theme-Provider';


const NotificationBell = () => {
   const { theme, setTheme } = useTheme();
   const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New comment on your post', read: false },
    { id: 2, message: 'You have a new follower', read: true },
    { id: 3, message: 'Your order has been shipped', read: false },
    {di:4,message: 'New user added',read:false}
  ]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2 rounded-full">
        <Bell size={24} className={isDark? 'h-6 w-6 text-yellow-500 rotate-0 transition-all':"h-6 w-6 text-blue-500 rotate-0 transition-all"} /> {/* Using the Bell icon from lucide-react */}
        <div className='bg-white'>
        {notifications.some((notification) => !notification.read) && (
          <Badge variant="filled" color="red" className="absolute top-[4px] right-[4px] p-1 rounded-full text-black"
          style={{
              backgroundColor: isDark ? '#ffffff' : '#000000',
              fontSize: '10px', // Adjust font size to make the badge smaller
              width: '16px', // Set width and height for a small badge
              height: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: isDark ? '#000000' : '#ffffff'
            }}
          >
            {notifications.filter((notification) => !notification.read).length}
          </Badge>
        )}
        </div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg"
        >
          <div className="max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 mb-2 ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-center">
                  <div>{notification.message}</div>
                  {!notification.read && (
                    <Badge variant="outlined" color="red">
                      Unread
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationBell;
