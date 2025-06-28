import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const events = [
    {
      id: 1,
      date: '2024-01-16',
      time: '14:00',
      type: 'viewing',
      title: 'Property Viewing',
      property: 'Riad Saʿāda',
      client: 'Ahmed Benali',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '10:30',
      type: 'viewing',
      title: 'Property Viewing',
      property: 'Villa Atlas View',
      client: 'Sarah Johnson',
      status: 'pending'
    },
    {
      id: 3,
      date: '2024-01-20',
      time: '16:00',
      type: 'checkout',
      title: 'Guest Checkout',
      property: 'Apartment Anfa',
      client: 'Mohammed Alami',
      status: 'confirmed'
    },
    {
      id: 4,
      date: '2024-01-22',
      time: '11:00',
      type: 'checkin',
      title: 'Guest Check-in',
      property: 'Riad Saʿāda',
      client: 'Elena Rodriguez',
      status: 'confirmed'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'viewing':
        return 'bg-primary';
      case 'checkin':
        return 'bg-success';
      case 'checkout':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'viewing':
        return 'Eye';
      case 'checkin':
        return 'LogIn';
      case 'checkout':
        return 'LogOut';
      default:
        return 'Calendar';
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Calendar</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigateMonth(-1)}
              className="w-8 h-8 p-0"
              iconName="ChevronLeft"
              iconSize={16}
            />
            <span className="text-lg font-medium text-text-primary min-w-[140px] text-center">
              {formatMonthYear(currentDate)}
            </span>
            <Button
              variant="ghost"
              onClick={() => navigateMonth(1)}
              className="w-8 h-8 p-0"
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            return (
              <div
                key={index}
                className={`relative h-10 flex items-center justify-center text-sm cursor-pointer rounded transition-colors duration-200 ${
                  day ? 'hover:bg-surface' : ''
                } ${
                  isToday(day) ? 'bg-primary text-white' : 'text-text-primary'
                } ${
                  selectedDate === day ? 'ring-2 ring-primary ring-opacity-50' : ''
                }`}
                onClick={() => day && setSelectedDate(selectedDate === day ? null : day)}
              >
                {day && (
                  <>
                    <span>{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {dayEvents.slice(0, 2).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-text-primary mb-3">Upcoming Events</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-surface rounded-lg transition-colors duration-200">
              <div className={`w-8 h-8 ${getEventTypeColor(event.type)} rounded-lg flex items-center justify-center`}>
                <Icon name={getEventTypeIcon(event.type)} size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text-primary truncate">{event.title}</p>
                  <span className="text-xs text-text-secondary">{event.time}</span>
                </div>
                <p className="text-xs text-text-secondary truncate">{event.property} • {event.client}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" fullWidth className="mt-4" iconName="Calendar">
          View Full Calendar
        </Button>
      </div>
    </div>
  );
};

export default CalendarWidget;