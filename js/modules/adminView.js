// Admin / Operator View Module with Direct Add Buttons for Principal, Teacher, Student & Parent
const AdminView = {
  selectedSchoolId: 'school_abc',
  selectedTeacherId: 'usr_teacher_sarah',

  render(container) {
    const schools = window.store.data.schools;
    const users = window.store.data.users;
    const currentSchool = schools.find(s => s.id === this.selectedSchoolId) || schools[0];

    // Get Principal of selected school
    const principal = users.find(u => u.schoolId === currentSchool.id && u.role === 'principal') || {
      name: "Dr. Robert Sterling", userId: "principal_abc", password: "princ@123"
    };

    // Get Teachers in selected school
    const teachers = users.filter(u => u.schoolId === currentSchool.id && u.role === 'teacher');

    // Get Students under selected teacher
    const students = users.filter(u => u.role === 'student' && (u.assignedTeacherId === this.selectedTeacherId || u.schoolId === currentSchool.id));

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Banner -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-blue-800">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
                <span>🔐</span> Access & Hierarchy Governance
              </div>
              <h2 class="text-2xl font-black tracking-tight">Institutional Drill-Down & Account Control</h2>
              <p class="text-sm text-slate-300 mt-1">
                Tap on any School &rarr; View Principal. Tap on Teachers &rarr; View Students. Inspect User IDs & Passwords.
              </p>
            </div>
          </div>
        </div>

        <!-- 3-TIER DRILL-DOWN HIERARCHY -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <!-- LEVEL 1: SCHOOLS & PRINCIPALS (4 cols) -->
          <div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 class="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">1. School (Principal ID)</h3>
                <span class="text-[10px] text-slate-400">${schools.length} Campuses</span>
              </div>
              <button onclick="AdminView.addPrincipal()" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow-xs">
                + Add Principal
              </button>
            </div>

            <div class="space-y-2.5">
              ${schools.map(s => {
                const sPrincipal = users.find(u => u.schoolId === s.id && u.role === 'principal') || { name: 'Principal Office', userId: 'principal_' + s.shortName.toLowerCase(), password: 'pass@' + s.shortName.toLowerCase() };
                const isSelected = s.id === this.selectedSchoolId;
                return `
                  <div onclick="AdminView.selectSchool('${s.id}')" class="p-3.5 rounded-xl border cursor-pointer transition ${isSelected ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-400' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
                    <div class="flex items-center justify-between">
                      <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="w-6 h-6 rounded-lg text-white font-bold text-[10px] flex items-center justify-center" style="background:${s.colors.primary}">${s.shortName}</span>
                        <span>${s.name}</span>
                      </div>
                      ${isSelected ? '<span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Selected &rarr;</span>' : ''}
                    </div>

                    <!-- Principal Credential Box -->
                    <div class="mt-2.5 p-2 rounded-lg bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                      <div class="flex items-center justify-between text-slate-500 dark:text-slate-400">
                        <span class="font-bold text-slate-700 dark:text-slate-200">🏫 ${sPrincipal.name}</span>
                        <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">Principal ID</span>
                      </div>
                      <div class="font-mono text-[10px] text-slate-600 dark:text-slate-300">
                        <span>ID: <strong class="text-indigo-600 dark:text-indigo-400">${sPrincipal.userId}</strong></span> &bull; 
                        <span>Pass: <strong class="text-rose-600 dark:text-rose-400">${sPrincipal.password}</strong></span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- LEVEL 2: TEACHERS IN SELECTED SCHOOL (4 cols) -->
          <div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 class="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">2. Teachers in School</h3>
                <span class="text-[10px] text-slate-400">${teachers.length} Active</span>
              </div>
              <button onclick="AdminView.addTeacher()" class="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition shadow-xs">
                + Add Teacher
              </button>
            </div>

            <div class="space-y-2.5">
              ${teachers.length === 0 ? '<p class="text-xs text-slate-400 italic">No teachers found in this school.</p>' : teachers.map(t => {
                const isSelected = t.id === this.selectedTeacherId;
                const studentCount = users.filter(u => u.role === 'student' && (u.assignedTeacherId === t.id || u.class === t.classAssigned)).length;
                return `
                  <div onclick="AdminView.selectTeacher('${t.id}')" class="p-3.5 rounded-xl border cursor-pointer transition ${isSelected ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-400' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'}">
                    <div class="flex items-center justify-between">
                      <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="text-sm">👨‍🏫</span>
                        <span>${t.name}</span>
                      </div>
                      <span class="text-[10px] font-bold text-slate-500">${t.classAssigned || 'Faculty'}</span>
                    </div>

                    <!-- Teacher Credential Box -->
                    <div class="mt-2.5 p-2 rounded-lg bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                      <div class="flex items-center justify-between text-slate-500 dark:text-slate-400">
                        <span>Students: <strong class="text-emerald-600 dark:text-emerald-400">${studentCount} Enrolled</strong></span>
                        ${isSelected ? '<span class="text-[9px] font-bold text-amber-600 dark:text-amber-400">Viewing Students &rarr;</span>' : ''}
                      </div>
                      <div class="font-mono text-[10px] text-slate-600 dark:text-slate-300">
                        <span>ID: <strong class="text-indigo-600 dark:text-indigo-400">${t.userId}</strong></span> &bull; 
                        <span>Pass: <strong class="text-rose-600 dark:text-rose-400">${t.password}</strong></span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- LEVEL 3: STUDENTS & PARENTS UNDER TEACHER (4 cols) -->
          <div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 class="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">3. Students & Parents</h3>
                <span class="text-[10px] text-slate-400">${students.length} Enrolled</span>
              </div>
              <button onclick="AdminView.addStudentAndParent()" class="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition shadow-xs">
                + Add Student & Parent
              </button>
            </div>

            <div class="space-y-2.5">
              ${students.length === 0 ? '<p class="text-xs text-slate-400 italic">No students assigned to this teacher yet. Click "+ Add Student & Parent" above!</p>' : students.map(st => {
                const parent = users.find(u => u.id === st.parentId || (u.role === 'parent' && u.childId === st.id)) || {
                  name: "Parent of " + st.name.split(' ')[0], userId: "parent_" + st.name.split(' ')[0].toLowerCase(), password: "parent@123"
                };
                return `
                  <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="text-sm">${st.avatar || '👨‍🎓'}</span>
                        <span>${st.name}</span>
                      </div>
                      <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold">${st.rollNo || st.class}</span>
                    </div>

                    <!-- Student Credentials -->
                    <div class="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between">
                      <span>Student ID: <strong class="text-indigo-600 dark:text-indigo-400">${st.userId}</strong></span>
                      <span>Pass: <strong class="text-rose-600 dark:text-rose-400">${st.password}</strong></span>
                    </div>

                    <!-- Linked Parent Credentials -->
                    <div class="p-1.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-[10px] font-mono text-slate-600 dark:text-slate-300 space-y-0.5">
                      <div class="flex items-center justify-between text-rose-700 dark:text-rose-400 font-bold">
                        <span>👨‍👩‍👧 Parent: ${parent.name}</span>
                        <span class="text-[9px] bg-rose-100 dark:bg-rose-950 px-1 rounded">Linked</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span>Parent ID: <strong class="text-indigo-600 dark:text-indigo-400">${parent.userId}</strong></span>
                        <span>Pass: <strong class="text-rose-600 dark:text-rose-400">${parent.password}</strong></span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  selectSchool(schoolId) {
    this.selectedSchoolId = schoolId;
    const teachers = window.store.data.users.filter(u => u.schoolId === schoolId && u.role === 'teacher');
    this.selectedTeacherId = teachers.length > 0 ? teachers[0].id : null;
    this.render(document.getElementById('view-container') || document.getElementById('mobile-view-container'));
  },

  selectTeacher(teacherId) {
    this.selectedTeacherId = teacherId;
    this.render(document.getElementById('view-container') || document.getElementById('mobile-view-container'));
  },

  // 1. Add Principal
  addPrincipal() {
    const name = prompt("Enter Principal Full Name:", "Dr. Arthur King");
    if (!name) return;
    const userId = prompt("Create Principal User ID:", "principal_" + name.split(' ')[1]?.toLowerCase() || "principal_new");
    const password = prompt("Create Principal Password:", "princ@123");

    const newPrincipal = {
      id: "usr_" + Date.now(),
      userId: userId || "principal_" + Date.now(),
      password: password || "princ@123",
      role: "principal",
      schoolId: this.selectedSchoolId,
      name: name,
      email: `${userId}@smartschool.edu`,
      avatar: "🏫",
      badge: "School Principal"
    };

    window.store.data.users.push(newPrincipal);
    window.store.saveData();
    alert(`Principal Account Created!\nUser ID: ${newPrincipal.userId}\nPassword: ${newPrincipal.password}`);
    this.render(document.getElementById('view-container') || document.getElementById('mobile-view-container'));
  },

  // 2. Add Teacher
  addTeacher() {
    const name = prompt("Enter Teacher Full Name:", "Ms. Clara Oswald");
    if (!name) return;
    const subject = prompt("Enter Subject / Class (e.g., Mathematics - Class 8-A):", "Science - Class 8-A");
    const userId = prompt("Create Teacher User ID:", "teacher_" + name.split(' ')[1]?.toLowerCase() || "teacher_new");
    const password = prompt("Create Teacher Password:", "teach@123");

    const newTeacher = {
      id: "usr_" + Date.now(),
      userId: userId || "teacher_" + Date.now(),
      password: password || "teach@123",
      role: "teacher",
      schoolId: this.selectedSchoolId,
      name: name,
      subject: subject,
      classAssigned: subject.split('-')[1]?.trim() || "Class 8-A",
      email: `${userId}@smartschool.edu`,
      avatar: "👨‍🏫",
      badge: "Faculty"
    };

    window.store.data.users.push(newTeacher);
    this.selectedTeacherId = newTeacher.id;
    window.store.saveData();
    alert(`Teacher Account Created!\nUser ID: ${newTeacher.userId}\nPassword: ${newTeacher.password}`);
    this.render(document.getElementById('view-container') || document.getElementById('mobile-view-container'));
  },

  // 3. Add Student & Linked Parent (Both created together!)
  addStudentAndParent() {
    const studentName = prompt("Enter Student Full Name:", "Rohan Gupta");
    if (!studentName) return;

    const rollNo = prompt("Enter Student Roll No / Class:", "8A-15");
    const studentUserId = prompt("Create Student User ID:", "student_" + studentName.split(' ')[0].toLowerCase());
    const studentPass = prompt("Create Student Password:", "stud@123");

    const parentName = prompt("Enter Parent / Guardian Full Name:", "Vikram Gupta");
    const parentPhone = prompt("Enter Parent Phone Number:", "+91 98765 43210");
    const parentUserId = prompt("Create Parent User ID:", "parent_" + studentName.split(' ')[0].toLowerCase());
    const parentPass = prompt("Create Parent Password:", "parent@123");

    const studentId = "usr_" + Date.now();
    const parentId = "usr_" + (Date.now() + 1);

    // Create Student
    const newStudent = {
      id: studentId,
      userId: studentUserId || "student_" + Date.now(),
      password: studentPass || "stud@123",
      role: "student",
      schoolId: this.selectedSchoolId,
      assignedTeacherId: this.selectedTeacherId,
      name: studentName,
      class: rollNo.split('-')[0] ? "Class " + rollNo.split('-')[0] : "Class 8-A",
      rollNo: rollNo,
      parentId: parentId,
      email: `${studentUserId}@student.edu`,
      avatar: "👨‍🎓",
      badge: "Student"
    };

    // Create Linked Parent
    const newParent = {
      id: parentId,
      userId: parentUserId || "parent_" + Date.now(),
      password: parentPass || "parent@123",
      role: "parent",
      schoolId: this.selectedSchoolId,
      name: parentName || "Parent of " + studentName,
      phone: parentPhone,
      childId: studentId,
      childName: studentName,
      childClass: newStudent.class,
      email: `${parentUserId}@gmail.com`,
      avatar: "👨‍👩‍👧",
      badge: "Parent Guardian"
    };

    window.store.data.users.push(newStudent);
    window.store.data.users.push(newParent);

    // Also add to class roster for teacher attendance
    window.store.data.classRoster.push({
      id: "s_" + Date.now(),
      name: studentName,
      rollNo: rollNo,
      status: "present",
      performance: "90%"
    });

    window.store.saveData();

    alert(
      `🎉 Student & Parent Accounts Created Successfully!\n\n` +
      `🎓 STUDENT:\nName: ${studentName}\nUser ID: ${newStudent.userId}\nPassword: ${newStudent.password}\n\n` +
      `👨‍👩‍👧 LINKED PARENT:\nName: ${newParent.name}\nUser ID: ${newParent.userId}\nPassword: ${newParent.password}`
    );

    this.render(document.getElementById('view-container') || document.getElementById('mobile-view-container'));
  }
};