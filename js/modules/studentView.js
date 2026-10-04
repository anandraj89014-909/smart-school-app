// Student View Module
const StudentView = {
  activeTab: 'overview', // 'overview', 'assignments', 'materials', 'marks', 'timetable'

  render(container) {
    const school = window.store.getCurrentSchool();
    const assignments = window.store.getAssignments();
    const materials = window.store.data.studyMaterials;
    const marks = window.store.data.marksReport;
    const notices = window.store.data.notices;
    const timetable = window.store.data.timetable;
    const submissions = window.store.data.studentSubmissions;
    const roster = window.store.getAttendanceRoster();

    // Check Aarav's attendance status today
    const aaravData = roster.find(r => r.name.includes("Aarav")) || { status: "present" };

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Student Hero Banner -->
        <div class="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-purple-800">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                            <!-- Clickable Student Photo / DP -->
              <div onclick="document.getElementById('student-photo-input').click()" title="Click to upload Student DP" class="relative group w-16 h-16 rounded-2xl overflow-hidden bg-purple-600 text-white flex items-center justify-center text-3xl shadow-md border-2 border-purple-400/50 cursor-pointer hover:ring-4 hover:ring-purple-400/40 transition">
                ${window.store.data.studentPhoto 
                  ? `<img src="${window.store.data.studentPhoto}" class="w-full h-full object-cover">` 
                  : `<span>👨‍🎓</span>`}
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-bold text-white transition">
                  <span class="text-xs">📷</span>
                  <span>Add DP</span>
                </div>
              </div>
              <input type="file" id="student-photo-input" accept="image/*" style="display:none" onchange="StudentView.uploadPhoto(event)">
              <div>
                <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-1">
                  Class 8-A &bull; Roll No: 8A-14 &bull; ${school.name}
                </div>
                <h2 class="text-2xl font-black tracking-tight">Aarav Sharma</h2>
                <p class="text-xs text-purple-200">Track deadlines, submit homework, review grades, and download study notes.</p>
              </div>
            </div>

            <!-- Attendance Badge Today -->
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center flex md:flex-col items-center justify-between gap-2">
              <span class="text-[11px] uppercase tracking-wider text-purple-200 font-bold">Today's Attendance</span>
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase ${
                aaravData.status === 'present' ? 'bg-emerald-500 text-white' :
                aaravData.status === 'late' ? 'bg-amber-500 text-white' :
                'bg-rose-500 text-white'
              }">
                ● ${aaravData.status}
              </span>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button onclick="StudentView.setTab('overview')" class="px-4 py-2 rounded-xl transition ${StudentView.activeTab === 'overview' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📊 Overview
          </button>
          <button onclick="StudentView.setTab('assignments')" class="px-4 py-2 rounded-xl transition ${StudentView.activeTab === 'assignments' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📝 Assignments & Tasks (${assignments.length})
          </button>
          <button onclick="StudentView.setTab('materials')" class="px-4 py-2 rounded-xl transition ${StudentView.activeTab === 'materials' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📚 Study Materials (${materials.length})
          </button>
          <button onclick="StudentView.setTab('marks')" class="px-4 py-2 rounded-xl transition ${StudentView.activeTab === 'marks' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📈 Marks & Report Card
          </button>
          <button onclick="StudentView.setTab('timetable')" class="px-4 py-2 rounded-xl transition ${StudentView.activeTab === 'timetable' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            🗓️ Timetable
          </button>
        </div>

        <!-- Tab Body -->
        <div id="student-tab-content">
          ${StudentView.renderActiveTab(assignments, materials, marks, notices, timetable, submissions)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    StudentView.activeTab = tab;
    const container = document.getElementById('view-container');
    if (container) StudentView.render(container);
  },

  renderActiveTab(assignments, materials, marks, notices, timetable, submissions) {
    switch (StudentView.activeTab) {
      case 'overview':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Left 8 cols: Active Tasks & Progress -->
            <div class="lg:col-span-8 space-y-6">
              
              <!-- Quick Stats -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Term GPA / Avg</div>
                  <div class="text-2xl font-black text-purple-600 mt-1">92.2%</div>
                  <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Top 5% in Class 8-A</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Attendance Rate</div>
                  <div class="text-2xl font-black text-emerald-600 mt-1">96.8%</div>
                  <div class="text-[10px] text-slate-500 font-semibold mt-0.5">24 of 25 days</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Pending Tasks</div>
                  <div class="text-2xl font-black text-amber-500 mt-1">1 Task</div>
                  <div class="text-[10px] text-amber-700 font-semibold mt-0.5">Due tomorrow</div>
                </div>
              </div>

              <!-- Upcoming Assignments -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 class="font-bold text-slate-900 text-sm">Upcoming Assignments & Submissions</h3>
                  <button onclick="StudentView.setTab('assignments')" class="text-xs text-purple-600 font-bold hover:underline">View All &rarr;</button>
                </div>

                <div class="space-y-3">
                  ${assignments.map(a => {
                    const sub = submissions.find(s => s.assignmentId === a.id);
                    return `
                      <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 uppercase">${a.subject}</span>
                            <span class="text-xs font-bold text-slate-800">${a.title}</span>
                          </div>
                          <div class="text-[11px] text-slate-500 mt-1">${a.description}</div>
                          <div class="text-[10px] text-slate-400 mt-1">Due: ${a.dueDate} &bull; ${a.assignedBy}</div>
                        </div>

                        <div class="flex items-center gap-2">
                          ${sub ? `
                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                              ✓ Submitted
                            </span>
                          ` : `
                            <button onclick="StudentView.openSubmitModal('${a.id}', '${a.title}')" class="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition">
                              Submit Work
                            </button>
                          `}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Right 4 cols: Notices Feed -->
            <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 class="font-bold text-slate-900 text-sm">School Notices</h3>
                <span class="text-xs text-slate-400">Latest</span>
              </div>
              <div class="space-y-3">
                ${notices.map(n => `
                  <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                    <span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">${n.category}</span>
                    <div class="font-bold text-slate-900">${n.title}</div>
                    <p class="text-[11px] text-slate-600 line-clamp-2">${n.content}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

      case 'assignments':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">My Assignments & Submission Hub</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${assignments.map(a => {
                const sub = submissions.find(s => s.assignmentId === a.id);
                return `
                  <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 uppercase">${a.subject}</span>
                      <span class="text-xs font-semibold text-slate-500">${a.dueDate}</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-sm">${a.title}</h4>
                    <p class="text-xs text-slate-600">${a.description}</p>
                    
                    <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        ${sub ? `
                          <div class="text-[11px] text-emerald-700 font-bold">
                            ✓ ${sub.status}
                          </div>
                          ${sub.grade ? `<div class="text-[10px] font-mono text-purple-700 font-bold">Score: ${sub.grade}</div>` : ''}
                        ` : `
                          <span class="text-amber-600 font-semibold text-[11px]">Pending Submission</span>
                        `}
                      </div>

                      <button onclick="StudentView.openSubmitModal('${a.id}', '${a.title}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${sub ? 'bg-slate-200 text-slate-700' : 'bg-purple-600 text-white shadow-xs'} transition">
                        ${sub ? 'Re-upload' : 'Submit Now'}
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

      case 'materials':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Subject E-Library & Study Materials</h3>
            <div class="space-y-3">
              ${materials.map(m => `
                <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                      ${m.fileType}
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 text-xs">${m.title}</div>
                      <div class="text-[11px] text-slate-500">${m.subject} &bull; ${m.size} &bull; Shared by ${m.uploadedBy}</div>
                    </div>
                  </div>
                  <button onclick="alert('Downloading ${m.title}...')" class="px-3 py-1.5 rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 text-xs font-bold">
                    ⬇ Download
                  </button>
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
                <h3 class="font-bold text-slate-900 text-base">Term 1 Academic Gradebook & Evaluation</h3>
                <p class="text-xs text-slate-500">Official authenticated examination score report for Aarav Sharma.</p>
              </div>
              <span class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Grade: A+ (Outstanding)
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th class="py-2.5 px-3">Subject</th>
                    <th class="py-2.5 px-3 text-center">Score</th>
                    <th class="py-2.5 px-3 text-center">Max Marks</th>
                    <th class="py-2.5 px-3 text-center">Grade</th>
                    <th class="py-2.5 px-3">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${marks.map(m => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 px-3 font-bold text-slate-800">${m.subject}</td>
                      <td class="py-3 px-3 font-mono font-bold text-slate-900 text-center">${m.score}</td>
                      <td class="py-3 px-3 font-mono text-slate-500 text-center">${m.max}</td>
                      <td class="py-3 px-3 text-center">
                        <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">${m.grade}</span>
                      </td>
                      <td class="py-3 px-3 text-slate-600 font-medium">${m.remarks}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;

      case 'timetable':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Class 8-A Weekly Timetable Schedule</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th class="py-2 px-3">Period / Time</th>
                    <th class="py-2 px-3">Mon</th>
                    <th class="py-2 px-3">Tue</th>
                    <th class="py-2 px-3">Wed</th>
                    <th class="py-2 px-3">Thu</th>
                    <th class="py-2 px-3">Fri</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${timetable.map(t => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 px-3 font-mono font-semibold text-slate-700 bg-slate-50/50">${t.period}</td>
                      <td class="py-3 px-3 font-bold text-indigo-700">${t.mon}</td>
                      <td class="py-3 px-3 font-bold text-slate-800">${t.tue}</td>
                      <td class="py-3 px-3 font-bold text-indigo-700">${t.wed}</td>
                      <td class="py-3 px-3 font-bold text-slate-800">${t.thu}</td>
                      <td class="py-3 px-3 font-bold text-emerald-700">${t.fri}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
    }
  },

    openSubmitModal(asgId, title) {
    const file = prompt(`Submit solution file for "${title}":`, `Aarav_${title.split(' ')[0]}_Solution.pdf`);
    if (!file) return;
    window.store.submitAssignment(asgId, file);
    alert(`Successfully submitted "${file}" for ${title}!`);
    const container = document.getElementById('view-container');
    if (container) StudentView.render(container);
  },

  uploadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      window.store.data.studentPhoto = e.target.result;
      window.store.saveData();
      alert("Student Profile Photo (DP) updated successfully! 🎉");
      const container = document.getElementById('view-container') || document.getElementById('mobile-view-container');
      if (container) StudentView.render(container);
    };
    reader.readAsDataURL(file);
  }
};