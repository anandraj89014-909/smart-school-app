// Mock Database Initial Seeds for Smart School Management Platform
const initialDatabase = {
  schools: [
    {
      id: "school_abc",
      name: "ABC Public School",
      shortName: "ABC",
      code: "ABC-001",
      motto: "Excellence in Knowledge, Integrity & Character",
      colors: {
        primary: "#059669",
        dark: "#047857",
        light: "#d1fae5",
        secondary: "#d97706"
      },
      plan: "Enterprise Campus",
      annualFee: "₹2,40,000 / yr",
      status: "Active",
      stats: {
        students: 450,
        teachers: 28,
        classes: 14,
        attendanceToday: 94.6
      }
    },
    {
      id: "school_xyz",
      name: "XYZ International School",
      shortName: "XYZ",
      code: "XYZ-102",
      motto: "Global Leadership, Critical Thinking & Innovation",
      colors: {
        primary: "#2563eb",
        dark: "#1d4ed8",
        light: "#dbeafe",
        secondary: "#0891b2"
      },
      plan: "Standard Campus",
      annualFee: "₹3,60,000 / yr",
      status: "Active",
      stats: {
        students: 820,
        teachers: 46,
        classes: 24,
        attendanceToday: 96.2
      }
    }
  ],

  users: [
    {
      id: "usr_admin",
      userId: "admin_alex",
      password: "admin@123",
      role: "admin",
      schoolId: "all",
      name: "Alex Mercer",
      email: "alex.admin@smartschool.io",
      avatar: "👨‍💻",
      badge: "Platform Superadmin"
    },
    {
      id: "usr_principal_abc",
      userId: "principal_abc",
      password: "princ@123",
      role: "principal",
      schoolId: "school_abc",
      name: "Dr. Robert Sterling",
      email: "robert.sterling@abcschool.edu",
      avatar: "🏫",
      badge: "Director & Principal"
    },
    {
      id: "usr_teacher_sarah",
      userId: "teacher_sarah",
      password: "teach@123",
      role: "teacher",
      schoolId: "school_abc",
      name: "Mrs. Sarah Jenkins",
      email: "sarah.j@abcschool.edu",
      subject: "Mathematics & Science",
      classAssigned: "Class 8-A",
      avatar: "👨‍🏫",
      badge: "Senior STEM Faculty"
    },
    {
      id: "usr_teacher_david",
      userId: "teacher_david",
      password: "teach@456",
      role: "teacher",
      schoolId: "school_abc",
      name: "Mr. David Thorne",
      email: "david.t@abcschool.edu",
      subject: "English Literature",
      classAssigned: "Class 9-A",
      avatar: "👨‍🏫",
      badge: "Humanities Lead"
    },
    {
      id: "usr_student_aarav",
      userId: "student_aarav",
      password: "stud@123",
      role: "student",
      schoolId: "school_abc",
      assignedTeacherId: "usr_teacher_sarah",
      name: "Aarav Sharma",
      rollNo: "8A-14",
      class: "Class 8-A",
      parentId: "usr_parent_rajesh",
      email: "aarav.s@student.abcschool.edu",
      avatar: "👨‍🎓",
      badge: "Class 8-A Student"
    },
    {
      id: "usr_student_emily",
      userId: "student_emily",
      password: "stud@456",
      role: "student",
      schoolId: "school_abc",
      assignedTeacherId: "usr_teacher_sarah",
      name: "Emily Watson",
      rollNo: "8A-02",
      class: "Class 8-A",
      email: "emily.w@student.abcschool.edu",
      avatar: "👩‍🎓",
      badge: "Class 8-A Student"
    },
    {
      id: "usr_parent_rajesh",
      userId: "parent_rajesh",
      password: "parent@123",
      role: "parent",
      schoolId: "school_abc",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@gmail.com",
      phone: "+1 (555) 382-9102",
      childId: "usr_student_aarav",
      childName: "Aarav Sharma",
      childClass: "Class 8-A",
      avatar: "👨‍👩‍👧",
      badge: "Parent Guardian"
    }
  ],

  // Roster of students in Class 8-A for attendance and grading
  classRoster: [
    { id: "s1", name: "Aarav Sharma", rollNo: "8A-01", status: "present", performance: "92%" },
    { id: "s2", name: "Emily Watson", rollNo: "8A-02", status: "present", performance: "95%" },
    { id: "s3", name: "Kevin Patel", rollNo: "8A-03", status: "late", performance: "84%" },
    { id: "s4", name: "Maya Chen", rollNo: "8A-04", status: "present", performance: "91%" },
    { id: "s5", name: "Liam Davis", rollNo: "8A-05", status: "absent", performance: "78%" },
    { id: "s6", name: "Sophia Rodriguez", rollNo: "8A-06", status: "present", performance: "89%" },
    { id: "s7", name: "Lucas Miller", rollNo: "8A-07", status: "present", performance: "87%" },
    { id: "s8", name: "Olivia Taylor", rollNo: "8A-08", status: "present", performance: "94%" }
  ],

  assignments: [
    {
      id: "asg_1",
      schoolId: "school_abc",
      class: "Class 8-A",
      subject: "Mathematics",
      title: "Algebra: Quadratic Equations & Graphing",
      dueDate: "Tomorrow, 5:00 PM",
      assignedBy: "Mrs. Sarah Jenkins",
      points: 50,
      description: "Complete exercises 4.1 to 4.4 from Chapter 4. Ensure graph plotting curves are clear.",
      submissionsCount: 7,
      totalStudents: 8,
      status: "Active"
    },
    {
      id: "asg_2",
      schoolId: "school_abc",
      class: "Class 8-A",
      subject: "Science",
      title: "Laboratory Report: Plant Cellular Respiration",
      dueDate: "Friday, 11:59 PM",
      assignedBy: "Mrs. Sarah Jenkins",
      points: 100,
      description: "Document the observations from Thursday's microscope session. Include labeled diagrams.",
      submissionsCount: 4,
      totalStudents: 8,
      status: "Active"
    },
    {
      id: "asg_3",
      schoolId: "school_abc",
      class: "Class 8-A",
      subject: "English Literature",
      title: "Critical Essay: Modern Communication Barriers",
      dueDate: "Completed (Graded)",
      assignedBy: "Mr. David Thorne",
      points: 50,
      description: "Write a 500-word essay evaluating psychological vs technological communication barriers.",
      submissionsCount: 8,
      totalStudents: 8,
      status: "Graded"
    }
  ],

  studentSubmissions: [
    {
      id: "sub_1",
      assignmentId: "asg_1",
      studentId: "usr_student_aarav",
      submittedAt: "Today, 10:15 AM",
      fileName: "Aarav_Math_Quadratic_Set4.pdf",
      status: "Submitted (Pending Review)",
      grade: null
    },
    {
      id: "sub_3",
      assignmentId: "asg_3",
      studentId: "usr_student_aarav",
      submittedAt: "Sep 12, 4:20 PM",
      fileName: "Aarav_English_Essay_Final.pdf",
      status: "Graded",
      grade: "48 / 50 (A+)"
    }
  ],

  studyMaterials: [
    {
      id: "mat_1",
      schoolId: "school_abc",
      subject: "Mathematics",
      title: "Class 8 Math Formula Sheet & Cheat Sheet",
      fileType: "PDF",
      size: "2.4 MB",
      uploadedBy: "Mrs. Sarah Jenkins",
      date: "Sep 10, 2026",
      downloads: 42
    },
    {
      id: "mat_2",
      schoolId: "school_abc",
      subject: "Science",
      title: "Cell Structure, Chloroplasts & Microscope Reference",
      fileType: "PDF",
      size: "4.8 MB",
      uploadedBy: "Mrs. Sarah Jenkins",
      date: "Sep 08, 2026",
      downloads: 38
    },
    {
      id: "mat_3",
      schoolId: "school_abc",
      subject: "Computer Science",
      title: "Introduction to Algorithms & Flowcharts (Lecture Notes)",
      fileType: "DOCX",
      size: "1.1 MB",
      uploadedBy: "Mr. Mark Vance",
      date: "Sep 04, 2026",
      downloads: 50
    }
  ],

  marksReport: [
    { subject: "Mathematics", score: 94, max: 100, grade: "A+", remarks: "Outstanding analytical mastery" },
    { subject: "General Science", score: 88, max: 100, grade: "A", remarks: "Great lab involvement and practicals" },
    { subject: "English Language", score: 95, max: 100, grade: "A+", remarks: "Flawless written vocabulary" },
    { subject: "Social Studies & History", score: 86, max: 100, grade: "A", remarks: "Very consistent grasp of concepts" },
    { subject: "Computer Applications", score: 98, max: 100, grade: "A+", remarks: "Top score in batch" }
  ],

  notices: [
    {
      id: "not_1",
      schoolId: "school_abc",
      title: "Annual Sports Meet & Athletic Championship 2026",
      category: "Event",
      date: "Sep 15, 2026",
      author: "Dr. Robert Sterling (Principal)",
      priority: "High",
      content: "All students, teachers, and parents are cordially invited to the Annual Sports Day on Friday, Oct 2nd. Event heats begin at 8:30 AM."
    },
    {
      id: "not_2",
      schoolId: "school_abc",
      title: "Quarterly Parent-Teacher Meeting (PTM) Schedule",
      category: "Academic",
      date: "Sep 14, 2026",
      author: "Academic Coordinator",
      priority: "Urgent",
      content: "The Term 1 PTM will take place this Saturday from 9:00 AM to 1:30 PM. Parents are encouraged to review academic scorecards beforehand."
    },
    {
      id: "not_3",
      schoolId: "school_abc",
      title: "Inter-School Science Fair & Innovation Hackathon",
      category: "Competition",
      date: "Sep 11, 2026",
      author: "STEM Department",
      priority: "Standard",
      content: "Nominations are invited for students in Grades 7 to 10 for the State STEM Olympiad. Submission deadline for project abstracts is Sept 25."
    }
  ],

  timetable: [
    { period: "Period 1 (08:30 - 09:15)", mon: "Mathematics", tue: "Science", wed: "Mathematics", thu: "English", fri: "Computer Sci" },
    { period: "Period 2 (09:15 - 10:00)", mon: "Science", tue: "English", wed: "Social Studies", thu: "Science", fri: "Mathematics" },
    { period: "Period 3 (10:15 - 11:00)", mon: "English", tue: "Mathematics", wed: "Science", thu: "Social Studies", fri: "Science Lab" },
    { period: "Period 4 (11:00 - 11:45)", mon: "Social Studies", tue: "Computer Sci", wed: "Arts / Music", thu: "Mathematics", fri: "Physical Ed" },
    { period: "Period 5 (12:30 - 01:15)", mon: "Computer Sci", tue: "Social Studies", wed: "English", thu: "Hindi / French", fri: "Library" },
    { period: "Period 6 (01:15 - 02:00)", mon: "Physical Ed", tue: "Library", wed: "Computer Lab", thu: "Club Activity", fri: "Mentorship" }
  ],

  chatMessages: [
    {
      id: "msg_1",
      senderId: "usr_teacher_sarah",
      senderName: "Mrs. Sarah Jenkins",
      senderRole: "teacher",
      recipientId: "usr_parent_rajesh",
      timestamp: "Yesterday, 3:45 PM",
      text: "Hello Mr. Sharma, Aarav did wonderful work in today's algebra session. He was helping his classmates solve quadratic formulas!"
    },
    {
      id: "msg_2",
      senderId: "usr_parent_rajesh",
      senderName: "Rajesh Sharma (Parent)",
      senderRole: "parent",
      recipientId: "usr_teacher_sarah",
      timestamp: "Yesterday, 4:10 PM",
      text: "Thank you so much Mrs. Jenkins! He has been practicing with the formula sheet you uploaded. Will the upcoming science lab require special prep?"
    },
    {
      id: "msg_3",
      senderId: "usr_teacher_sarah",
      senderName: "Mrs. Sarah Jenkins",
      senderRole: "teacher",
      recipientId: "usr_parent_rajesh",
      timestamp: "Yesterday, 4:25 PM",
      text: "Just a clean notebook and their observation pencils. All lab safety gear and microscope slides will be provided by the school lab."
    }
  ],

  fees: {
    studentName: "Aarav Sharma",
    class: "Class 8-A",
    tuitionFee: 45000,
    labFee: 8000,
    transportFee: 6000,
    status: "Due in 10 Days",
    totalDue: 59000,
    invoices: [
      { id: "INV-2026-01", description: "Term 1 Tuition & Lab Fee", amount: "₹53,000", date: "Jul 15, 2026", status: "Paid" },
      { id: "INV-2026-02", description: "Term 2 Tuition & Transport", amount: "₹59,000", date: "Oct 01, 2026", status: "Pending" }
    ]
  },

  transport: {
    busNumber: "Bus 04 — North Route",
    driverName: "John Bradley",
    driverPhone: "+1 (555) 902-3341",
    currentLocation: "Maple Street & 4th Avenue",
    status: "In Transit",
    speed: "32 km/h",
    etaToStop: "8 mins",
    stops: [
      { name: "Greenwood Suburb", time: "07:30 AM", status: "Passed" },
      { name: "Maple Street (Aarav's Stop)", time: "07:42 AM", status: "Next Stop (8 mins)" },
      { name: "Downtown Crossing", time: "07:55 AM", status: "Upcoming" },
      { name: "School Main Gate", time: "08:15 AM", status: "Upcoming" }
    ]
  },

  aiTutor: [
    {
      q: "Can you explain how to solve 2x^2 + 5x - 3 = 0 using factoring?",
      a: "Sure! To factor 2x² + 5x - 3: First, find two numbers that multiply to (2 × -3 = -6) and add to 5. Those numbers are 6 and -1. Rewrite 5x as 6x - x: 2x² + 6x - x - 3 = 0. Grouping: 2x(x + 3) - 1(x + 3) = 0. So, (2x - 1)(x + 3) = 0. The solutions are x = 1/2 and x = -3! 🎉"
    }
  ]
}; 