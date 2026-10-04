// Teacher View Module
const TeacherView = {
  activeTab: 'attendance', // 'attendance', 'assignments', 'materials', 'marks', 'chat'

  render(container) {
    const school = window.store.getCurrentSchool();
    const roster = window.store.getAttendanceRoster();
    const assignments = window.store.getAssignments();
    const materials = window.store.data.studyMaterials;
    const messages = window.store.data.chatMessages;

    const presentCount = roster.filter(r => r.status === 'present').length;
    const absentCount = roster.filter(r => r.status === 'absent').length;
    const lateCount = roster.filter(r => r.status === 'late').length;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Teacher Header -->
        <div class="bg-gradient-to-r from-amber-800 via-amber-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-amber-700">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
              <!-- Clickable Teacher Photo / DP -->
              <div onclick="document.getElementById('teacher-photo-input').click()" title="Click to upload Teacher DP" class="relative group w-16 h-16 rounded-2xl overflow-hidden bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md border-2 border-amber-300/50 cursor-pointer hover:ring-4 hover:ring-amber-300/40 transition">
                ${window.store.data.teacherPhoto 
                  ? `<img src="${window.store.data.teacherPhoto}" class="w-full h-full object-cover">` 
                  : `<span>👨‍🏫</span>`}
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-bold text-white transition">
                  <span class="text-xs">📷</span>
                  <span>Add DP</span>
                </div>
              </div>
              <input type="file" id="teacher-photo-input" accept="image/*" style="display:none" onchange="TeacherView.uploadPhoto(event)">

              <div>
                <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
                  <span>👨‍🏫</span> Faculty Instruction & Evaluation Portal
                </div>
                <h2 class="text-2xl font-black tracking-tight">Mrs. Sarah Jenkins &bull; Class 8-A</h2>
                <p class="text-sm text-slate-300 mt-1">Mark attendance, publish assignments, upload study materials, input exam grades, and message parents.</p>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="flex items-center gap-2 flex-wrap">
              <button onclick="TeacherView.openAssignmentModal()" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5">
                <span>+</span> New Assignment
              </button>
              <button onclick="TeacherView.openMaterialModal()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5">
                <span>📚</span> Upload Notes
              </button>
            </div>
          </div>
        </div>

        <!-- Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button onclick="TeacherView.setTab('attendance')" class="px-4 py-2 rounded-xl transition ${TeacherView.activeTab === 'attendance' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📅 Attendance Roll Call
          </button>
          <button onclick="TeacherView.setTab('assignments')" class="px-4 py-2 rounded-xl transition ${TeacherView.activeTab === 'assignments' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📝 Assignments & Tasks (${assignments.length})
          </button>
          <button onclick="TeacherView.setTab('materials')" class="px-4 py-2 rounded-xl transition ${TeacherView.activeTab === 'materials' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📚 Study Materials (${materials.length})
          </button>
          <button onclick="TeacherView.setTab('marks')" class="px-4 py-2 rounded-xl transition ${TeacherView.activeTab === 'marks' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📈 Gradebook & Marks Entry
          </button>
          <button onclick="TeacherView.setTab('chat')" class="px-4 py-2 rounded-xl transition ${TeacherView.activeTab === 'chat' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            💬 Parent Communication
          </button>
        </div>

        <!-- Tab Content Switcher -->
        <div id="teacher-tab-content">
          ${TeacherView.renderActiveTab(roster, assignments, materials, messages, presentCount, absentCount, lateCount)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    TeacherView.activeTab = tab;
    const container = document.getElementById('view-container');
    if (container) TeacherView.render(container);
  },

  renderActiveTab(roster, assignments, materials, messages, presentCount, absentCount, lateCount) {
    switch (TeacherView.activeTab) {
      case 'attendance':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Class 8-A &bull; Daily Attendance Roll Call</h3>
                <p class="text-xs text-slate-500">Tap status buttons to toggle student status in real-time. Syncs with Parent & Principal consoles.</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="TeacherView.markAll('present')" class="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition">
                  ✓ Mark All Present
                </button>
              </div>
            </div>

            <!-- Summary Chips -->
            <div class="flex items-center gap-3 text-xs">
              <span class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Present: ${presentCount}
              </span>
              <span class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200">
                Absent: ${absentCount}
              </span>
              <span class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold border border-amber-200">
                Late: ${lateCount}
              </span>
              <span class="text-slate-400">Total: ${roster.length} enrolled</span>
            </div>

            <!-- Roster Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th class="py-2.5 px-3">Roll No</th>
                    <th class="py-2.5 px-3">Student Name</th>
                    <th class="py-2.5 px-3">Academic Performance</th>
                    <th class="py-2.5 px-3 text-center">Status Toggle</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${roster.map(student => `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-bold text-slate-600">${student.rollNo}</td>
                      <td class="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <span class="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          ${student.name.split(' ').map(n=>n[0]).join('')}
                        </span>
                        <span>${student.name}</span>
                        ${student.name.includes("Aarav") ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Demo Child</span>' : ''}
                      </td>
                      <td class="py-3 px-3 text-slate-600 font-medium">${student.performance}</td>
                      <td class="py-3 px-3 text-center">
                        <div class="inline-flex items-center p-1 rounded-xl bg-slate-100 gap-1">
                          <button onclick="TeacherView.toggleStatus('${student.id}', 'present')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${student.status === 'present' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Present
                          </button>
                          <button onclick="TeacherView.toggleStatus('${student.id}', 'late')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${student.status === 'late' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Late
                          </button>
                          <button onclick="TeacherView.toggleStatus('${student.id}', 'absent')" class="px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${student.status === 'absent' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;

      case 'assignments':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Class 8-A &bull; Assigned Homework & Tasks</h3>
                <p class="text-xs text-slate-500">Create new tasks, monitor submission turn-ins, and publish deadlines.</p>
              </div>
              <button onclick="TeacherView.openAssignmentModal()" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition">
                + Create Assignment
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${assignments.map(a => `
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-900">${a.subject}</span>
                    <span class="text-xs font-semibold text-slate-500">Due: ${a.dueDate}</span>
                  </div>
                  <h4 class="font-bold text-slate-900 text-sm">${a.title}</h4>
                  <p class="text-xs text-slate-600">${a.description}</p>
                  
                  <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1.5 font-medium text-slate-700">
                      <span>📥 Submissions:</span>
                      <strong class="text-emerald-600">${a.submissionsCount} / ${a.totalStudents}</strong>
                    </div>
                    <span class="text-slate-400 font-mono text-[11px]">${a.points} Points</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'materials':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Study Materials & Digital Library</h3>
                <p class="text-xs text-slate-500">Provide revision PDFs, formulas, and reference lecture notes to students.</p>
              </div>
              <button onclick="TeacherView.openMaterialModal()" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition">
                + Upload New Resource
              </button>
            </div>

            <div class="space-y-3">
              ${materials.map(m => `
                <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center border border-indigo-200">
                      ${m.fileType}
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 text-xs">${m.title}</div>
                      <div class="text-[11px] text-slate-500">${m.subject} &bull; ${m.size} &bull; Uploaded ${m.date}</div>
                    </div>
                  </div>
                  <div class="text-right text-xs">
                    <span class="font-semibold text-slate-700">📥 ${m.downloads} downloads</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'marks':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Class 8-A &bull; Gradebook & Exam Entry</h3>
                <p class="text-xs text-slate-500">Input student scores for Mid-Term STEM evaluation. Instant GPA & Letter Grade computation.</p>
              </div>
              <button onclick="alert('Gradebook changes saved successfully!')" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs">
                Save Gradebook
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th class="py-2.5 px-3">Student</th>
                    <th class="py-2.5 px-3">Math (100)</th>
                    <th class="py-2.5 px-3">Science (100)</th>
                    <th class="py-2.5 px-3">Total / Pct</th>
                    <th class="py-2.5 px-3">Grade</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  ${roster.map((s, idx) => {
                    const mathScore = idx === 0 ? 94 : 80 + (idx * 2) % 18;
                    const sciScore = idx === 0 ? 88 : 82 + (idx * 3) % 16;
                    const avg = ((mathScore + sciScore) / 2).toFixed(0);
                    return `
                      <tr class="hover:bg-slate-50">
                        <td class="py-2.5 px-3 font-bold text-slate-800">${s.name}</td>
                        <td class="py-2.5 px-3"><input type="number" class="w-16 p-1 rounded border border-slate-300 font-mono text-center" value="${mathScore}"></td>
                        <td class="py-2.5 px-3"><input type="number" class="w-16 p-1 rounded border border-slate-300 font-mono text-center" value="${sciScore}"></td>
                        <td class="py-2.5 px-3 font-bold text-slate-700">${avg}%</td>
                        <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">${avg >= 90 ? 'A+' : 'A'}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;

      case 'chat':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center text-lg">
                  👨‍👩‍👧
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 text-base">Direct Conversation with Rajesh Sharma (Parent)</h3>
                  <p class="text-xs text-slate-500">Child: Aarav Sharma &bull; Class 8-A &bull; Secure Encrypted Thread</p>
                </div>
              </div>
            </div>

            <!-- Messages Stream -->
            <div id="teacher-chat-stream" class="h-64 overflow-y-auto p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              ${messages.map(m => `
                <div class="flex ${m.senderRole === 'teacher' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-md p-3 rounded-2xl text-xs ${m.senderRole === 'teacher' ? 'bg-amber-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'}">
                    <div class="text-[10px] font-bold ${m.senderRole === 'teacher' ? 'text-amber-200' : 'text-slate-400'} mb-1">
                      ${m.senderName} &bull; ${m.timestamp}
                    </div>
                    <p>${m.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Send Input -->
            <form onsubmit="TeacherView.sendMessage(event)" class="flex items-center gap-2">
              <input id="teacher-msg-input" type="text" placeholder="Type a message to Rajesh Sharma (Parent)..." class="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500" required>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition">
                Send Message
              </button>
            </form>
          </div>
        `;
    }
  },

  toggleStatus(studentId, newStatus) {
    window.store.markStudentAttendance(studentId, newStatus);
    const container = document.getElementById('view-container');
    if (container) TeacherView.render(container);
  },

  markAll(status) {
    window.store.markAllAttendance(status);
    const container = document.getElementById('view-container');
    if (container) TeacherView.render(container);
  },

  sendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('teacher-msg-input');
    if (!input || !input.value.trim()) return;
    window.store.sendMessage(input.value.trim(), 'teacher');
    input.value = '';
    const container = document.getElementById('view-container');
    if (container) TeacherView.render(container);
    // Scroll chat to bottom
    setTimeout(() => {
      const stream = document.getElementById('teacher-chat-stream');
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  },

  openAssignmentModal() {
    const title = prompt("Enter Assignment Title:", "Trigonometry Basics & Angle Triangles");
    if (!title) return;
    const desc = prompt("Enter Assignment Description:", "Solve problems 1 through 10 from page 42. Attach photograph or PDF.");
    window.store.createAssignment({
      subject: "Mathematics",
      title: title,
      description: desc || "Complete exercises as instructed.",
      dueDate: "Friday, 5:00 PM",
      points: 50
    });
    alert("Assignment created and pushed to student portal!");
    TeacherView.setTab('assignments');
  },

    openMaterialModal() {
    const title = prompt("Enter Resource Title:", "Physics Laws of Motion Summary Notes");
    if (!title) return;
    window.store.uploadStudyMaterial({
      subject: "Science",
      title: title,
      fileType: "PDF",
      size: "2.1 MB"
    });
    alert("Study material uploaded to digital repository!");
    TeacherView.setTab('materials');
  },

  uploadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      window.store.data.teacherPhoto = e.target.result;
      window.store.saveData();
      alert("Teacher Profile Photo (DP) updated successfully! 🎉");
      const container = document.getElementById('view-container') || document.getElementById('mobile-view-container');
      if (container) TeacherView.render(container);
    };
    reader.readAsDataURL(file);
  }
};