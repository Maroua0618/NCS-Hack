import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Star, 
  DollarSign, 
  Search, 
  Bell, 
  Settings,
  Clock,
  Play,
  Phone,
  FileText,
  Check,
  X
} from 'lucide-react';

const TutoringDashboard = () => {
  // Mock data - in real app this would come from your database
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalStudents: 24,
      sessionsToday: 8,
      averageRating: 4.9,
      monthlyEarnings: 2640
    },
    todaysSessions: [
      {
        id: 1,
        time: '09:00',
        studentName: 'Ahmed Said',
        subject: 'Advanced Calculus',
        duration: '1 hour',
        status: 'upcoming'
      },
      {
        id: 2,
        time: '11:30',
        studentName: 'Lina Mansouri',
        subject: 'Linear Algebra',
        duration: '1.5 hours',
        status: 'upcoming'
      },
      {
        id: 3,
        time: '15:00',
        studentName: 'Karim Ziani',
        subject: 'Statistics',
        duration: '1 hour',
        status: 'upcoming'
      },
      {
        id: 4,
        time: '17:30',
        studentName: 'Sara Benali',
        subject: 'Geometry',
        duration: '1 hour',
        status: 'upcoming'
      }
    ],
    pendingRequests: [
      {
        id: 1,
        studentName: 'Youssef Ben Ali',
        subject: 'Trigonometry',
        time: 'more 2 PM',
        avatar: 'YB'
      },
      {
        id: 2,
        studentName: 'Nadia Mahi',
        subject: 'Calculus',
        time: 'Friday 10 AM',
        avatar: 'NM'
      },
      {
        id: 3,
        studentName: 'Omar Messaoud',
        subject: 'Algebra',
        time: 'Saturday 4 PM',
        avatar: 'OM'
      }
    ],
    weeklyOverview: [
      { day: 'WED', date: 'Jul 3', sessions: 7 },
      { day: 'THU', date: 'Jul 4', sessions: 5 },
      { day: 'FRI', date: 'Jul 5', sessions: 3 },
      { day: 'SAT', date: 'Jul 6', sessions: 2 },
      { day: 'SUN', date: 'Jul 7', sessions: 1 }
    ]
  });

  // Simulate data fetching
  useEffect(() => {
    // In a real app, you'd fetch data from your API here
    // fetchDashboardData().then(setDashboardData);
  }, []);

  const handleAcceptRequest = (requestId) => {
    setDashboardData(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter(req => req.id !== requestId)
    }));
  };

  const handleDeclineRequest = (requestId) => {
    setDashboardData(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter(req => req.id !== requestId)
    }));
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, change, bgColor, iconBg }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        {change && (
          <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block">
            {change}
          </p>
        )}
      </div>
    </div>
  );

  const SessionCard = ({ session }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
          {session.time}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{session.studentName}</h4>
          <p className="text-sm text-gray-600">{session.subject} • {session.duration}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-1">
          <Play className="w-4 h-4" />
          <span>Start</span>
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          Reschedule
        </button>
      </div>
    </div>
  );

  const RequestCard = ({ request }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          {request.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{request.studentName}</h4>
          <p className="text-sm text-gray-600">{request.subject} • {request.time}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => handleAcceptRequest(request.id)}
          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center space-x-1"
        >
          <Check className="w-4 h-4" />
          <span>Accept</span>
        </button>
        <button 
          onClick={() => handleDeclineRequest(request.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Decline</span>
        </button>
      </div>
    </div>
  );

  return (
<div>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Students"
            value={dashboardData.stats.totalStudents}
            change="+3 this month"
            iconBg="bg-purple-500"
          />
          <StatCard
            icon={Calendar}
            title="Sessions Today"
            value={dashboardData.stats.sessionsToday}
            change="+2 from yesterday"
            iconBg="bg-blue-500"
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={dashboardData.stats.averageRating}
            change="+0.1 this week"
            iconBg="bg-green-500"
          />
          <StatCard
            icon={DollarSign}
            title="This Month"
            value={`$${dashboardData.stats.monthlyEarnings.toLocaleString()}`}
            change="+15% from last month"
            iconBg="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Sessions</h2>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.todaysSessions.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.pendingRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">This Week's Overview</h2>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
              View Calendar
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {dashboardData.weeklyOverview.map((day, index) => (
              <div key={day.day} className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
                <p className="text-xs text-gray-500 mb-3">{day.date}</p>
                <div className="bg-purple-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">{day.sessions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringDashboard;