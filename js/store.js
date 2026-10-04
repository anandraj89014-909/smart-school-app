// State Management & Reactive Data Store with LocalStorage Persistence
const STORAGE_KEY = "SMART_SCHOOL_DATA_V1";

class SchoolStore {
  constructor() {
    this.data = this.loadData();
    this.currentSchoolId = localStorage.getItem("SMART_SCHOOL_ACTIVE_ID") || "school_abc";
    this.currentRole = localStorage.getItem("SMART_SCHOOL_ACTIVE_ROLE") || "admin";
    this.viewportMode = localStorage.getItem("SMART_SCHOOL_VIEWPORT") || "desktop"; // 'desktop' or 'mobile'
    this.listeners = [];
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse stored school data", e);
    }
    // Deep clone initial database
    return JSON.parse(JSON.stringify(initialDatabase));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Storage save failed", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  // School Selection
  getCurrentSchool() {
    return this.data.schools.find(s => s.id === this.currentSchoolId) || this.data.schools[0];
  }

  setCurrentSchool(schoolId) {
    this.currentSchoolId = schoolId;
    localStorage.setItem("SMART_SCHOOL_ACTIVE_ID", schoolId);
    this.notify();
  }

  // Role Management
  getCurrentRole() {
    return this.currentRole;
  }

  setCurrentRole(role) {
    this.currentRole = role;
    localStorage.setItem("SMART_SCHOOL_ACTIVE_ROLE", role);
    this.notify();
  }

  // Viewport Simulator
  getViewportMode() {
    return this.viewportMode;
  }

  setViewportMode(mode) {
    this.viewportMode = mode;
    localStorage.setItem("SMART_SCHOOL_VIEWPORT", mode);
    this.notify();
  }

  // Attendance
  getAttendanceRoster() {
    return this.data.classRoster;
  }

  markStudentAttendance(studentId, newStatus) {
    const student = this.data.classRoster.find(s => s.id === studentId);
    if (student) {
      student.status = newStatus;
      this.saveData();
    }
  }

  markAllAttendance(status) {
    this.data.classRoster.forEach(s => s.status = status);
    this.saveData();
  }

  // Assignments
  getAssignments() {
    return this.data.assignments;
  }

  createAssignment(payload) {
    const newAsg = {
      id: "asg_" + Date.now(),
      schoolId: this.currentSchoolId,
      class: payload.class || "Class 8-A",
      subject: payload.subject,
      title: payload.title,
      dueDate: payload.dueDate || "Next Class",
      assignedBy: "Mrs. Sarah Jenkins",
      points: payload.points || 100,
      description: payload.description,
      submissionsCount: 0,
      totalStudents: this.data.classRoster.length,
      status: "Active"
    };
    this.data.assignments.unshift(newAsg);
    this.saveData();
    return newAsg;
  }

  submitAssignment(asgId, fileName) {
    const existing = this.data.studentSubmissions.find(s => s.assignmentId === asgId && s.studentId === "usr_student_aarav");
    if (existing) {
      existing.fileName = fileName;
      existing.submittedAt = "Just now";
      existing.status = "Resubmitted";
    } else {
      this.data.studentSubmissions.push({
        id: "sub_" + Date.now(),
        assignmentId: asgId,
        studentId: "usr_student_aarav",
        submittedAt: "Just now",
        fileName: fileName,
        status: "Submitted (Pending Review)",
        grade: null
      });
    }
    // Update assignment counter
    const asg = this.data.assignments.find(a => a.id === asgId);
    if (asg) asg.submissionsCount = Math.min(asg.totalStudents, (asg.submissionsCount || 0) + 1);
    this.saveData();
  }

  // Study Materials
  uploadStudyMaterial(payload) {
    const newMat = {
      id: "mat_" + Date.now(),
      schoolId: this.currentSchoolId,
      subject: payload.subject,
      title: payload.title,
      fileType: payload.fileType || "PDF",
      size: payload.size || "1.8 MB",
      uploadedBy: "Mrs. Sarah Jenkins",
      date: "Today",
      downloads: 0
    };
    this.data.studyMaterials.unshift(newMat);
    this.saveData();
    return newMat;
  }

  // Notices
  publishNotice(payload) {
    const newNotice = {
      id: "not_" + Date.now(),
      schoolId: this.currentSchoolId,
      title: payload.title,
      category: payload.category || "General",
      date: "Today",
      author: payload.author || "School Administration",
      priority: payload.priority || "Standard",
      content: payload.content
    };
    this.data.notices.unshift(newNotice);
    this.saveData();
    return newNotice;
  }

  // Chat / Messages
  sendMessage(text, senderRole) {
    const sender = this.data.users.find(u => u.role === senderRole) || { name: senderRole, id: "usr_guest" };
    const newMsg = {
      id: "msg_" + Date.now(),
      senderId: sender.id,
      senderName: sender.name,
      senderRole: senderRole,
      recipientId: senderRole === "parent" ? "usr_teacher_sarah" : "usr_parent_rajesh",
      timestamp: "Just now",
      text: text
    };
    this.data.chatMessages.push(newMsg);
    this.saveData();
    return newMsg;
  }

  // White Label & School Management
  updateSchoolBranding(schoolId, brandData) {
    const school = this.data.schools.find(s => s.id === schoolId);
    if (school) {
      if (brandData.name) school.name = brandData.name;
      if (brandData.motto) school.motto = brandData.motto;
      if (brandData.primary) school.colors.primary = brandData.primary;
      if (brandData.secondary) school.colors.secondary = brandData.secondary;
      this.saveData();
    }
  }

  addNewSchool(schoolData) {
    const newSchool = {
      id: "school_" + Date.now(),
      name: schoolData.name,
      shortName: schoolData.name.split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase(),
      code: schoolData.code || "SCH-" + Math.floor(100 + Math.random() * 900),
      motto: schoolData.motto || "Dedicated to Student Achievement",
      colors: {
        primary: schoolData.primary || "#4f46e5",
        dark: "#3730a3",
        light: "#e0e7ff",
        secondary: schoolData.secondary || "#06b6d4"
      },
      plan: schoolData.plan || "Standard Campus",
      annualFee: "₹2,800 / yr",
      status: "Active",
      stats: {
        students: 250,
        teachers: 18,
        classes: 10,
        attendanceToday: 95.0
      }
    };
    this.data.schools.push(newSchool);
    this.saveData();
    return newSchool;
  }

  // Fees Payment Simulation
  payFee(invoiceId) {
    const inv = this.data.fees.invoices.find(i => i.id === invoiceId);
    if (inv) {
      inv.status = "Paid";
      this.data.fees.status = "All Dues Cleared";
      this.data.fees.totalDue = 0;
      this.saveData();
    }
  }

  // Factory Reset
  resetDatabase() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = JSON.parse(JSON.stringify(initialDatabase));
    this.saveData();
  }
}

// Global Store Singleton
window.store = new SchoolStore();
