import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Calendar, 
  MessageCircle, 
  Clock, 
  Star,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

// Students List Component
const StudentsListDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Students');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Ahmed Said",
      avatar: "AS",
      subjects: ["Mathematics", "Physics"],
      totalSessions: 12,
      lastSession: "3 days ago",
      studentSince: "Feb 2025",
      rating: 4.8,
      status: "Active",
      sessionType: "Last session 3 minutes",
      bgColor: "bg-purple-500"
    },
    {
      id: 2,
      name: "Lina Mansouri",
      avatar: "LM",
      subjects: ["Chemistry"],
      totalSessions: 8,
      lastSession: "1 week ago",
      studentSince: "Jan 2025",
      rating: 4.9,
      status: "Active",
      sessionType: "Last session 1 week ago",
      bgColor: "bg-pink-500"
    },
    {
      id: 3,
      name: "Sara Denali",
      avatar: "SD",
      subjects: ["Biology"],
      totalSessions: 5,
      lastSession: "3 weeks ago",
      studentSince: "Mar 2025",
      rating: 4.7,
      status: "Inactive",
      sessionType: "Last session 3 weeks ago",
      bgColor: "bg-blue-500"
    },
    {
      id: 4,
      name: "Karim Ziani",
      avatar: "KZ",
      subjects: ["Mathematics", "Computer Science"],
      totalSessions: 25,
      lastSession: "Yesterday",
      studentSince: "Dec 2024",
      rating: 4.9,
      status: "Active",
      sessionType: "Session in 2 hours",
      bgColor: "bg-indigo-500"
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subjects.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const stats = {
    totalStudents: 24,
    activeThisWeek: 8,
    totalSessions: 156,
    avgRating: 4.8
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students List</h1>
        <p className="text-gray-600">Manage and track your student relationships</p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalStudents}</div>
            <div className="text-sm text-gray-500">Total Students</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeThisWeek}</div>
            <div className="text-sm text-gray-500">Active This Week</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalSessions}</div>
            <div className="text-sm text-gray-500">Total Sessions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.avgRating}</div>
            <div className="text-sm text-gray-500">Avg Rating</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>All Students</option>
                  <option>Active Students</option>
                  <option>Inactive Students</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <select 
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Computer Science</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="flex border border-gray-200 rounded-lg">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 rounded-l-lg hover:bg-gray-100">
                  Cards
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-lg">
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Student Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${student.bgColor} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                    {student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.sessionType}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-600 mb-2">SUBJECTS</div>
                <div className="flex flex-wrap gap-2">
                  {student.subjects.map((subject, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total Sessions</div>
                  <div className="text-2xl font-bold text-gray-900">{student.totalSessions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Last Session</div>
                  <div className="text-sm text-gray-700">{student.lastSession}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Student Since</div>
                  <div className="text-sm text-gray-700">{student.studentSince}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Rating</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{student.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Contact
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find students.</p>
          </div>
        )}
    </div>
  );
};

export default StudentsListDashboard;