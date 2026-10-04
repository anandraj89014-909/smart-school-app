// Parent View Module
const ParentView = {
  activeTab: 'summary', // 'summary', 'attendance', 'homework', 'grades', 'chat'

  render(container) {
    const school = window.store.getCurrentSchool();
    const roster = window.store.getAttendanceRoster();
    const assignments = window.store.getAssignments();
    const submissions = window.store.data.studentSubmissions;
    const marks = window.store.data.marksReport;
    const notices = window.store.data.notices;
    const messages = window.store.data.chatMessages;

    // Real-time presence of child
    const childRoster = roster.find(r => r.name.includes("Aarav")) || { status: "present" };

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Parent Banner -->
        <div class="bg-gradient-to-r from-rose-900 via-pink-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-rose-800">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl shadow-md border-2 border-rose-400/40">
                👨‍👩‍👧
              </div>
              <div>
                <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-1">
                  Parent Guardian Portal &bull; ${school.name}
                </div>
                <h2 class="text-2xl font-black tracking-tight">Rajesh Sharma &bull; Guardian of Aarav Sharma</h2>
                <p class="text-xs text-rose-200">Class 8-A &bull; Real-time visibility into your child's daily presence, homework, and educator chat.</p>
              </div>
            </div>

            <!-- Child Status Live Card -->
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/20 text-center flex md:flex-col items-center justify-between gap-2">
              <span class="text-[10px] uppercase font-bold text-rose-200 tracking-wider">Aarav's Status Today</span>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${
                  childRoster.status === 'present' ? 'bg-emerald-400 animate-pulse' :
                  childRoster.status === 'late' ? 'bg-amber-400' : 'bg-rose-500'
                }"></span>
                <span class="text-xs font-black uppercase text-white">
                  ${childRoster.status.toUpperCase()} AT CAMPUS
                </span>
              </div>
              <span class="text-[10px] text-slate-300">Checked in at 08:22 AM</span>
            </div>
          </div>
        </div>

        <!-- Navigation Subtabs -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button onclick="ParentView.setTab('summary')" class="px-4 py-2 rounded-xl transition ${ParentView.activeTab === 'summary' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            👨‍👩‍👧 Child Overview
          </button>
          <button onclick="ParentView.setTab('attendance')" class="px-4 py-2 rounded-xl transition ${ParentView.activeTab === 'attendance' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📅 Attendance Tracking
          </button>
          <button onclick="ParentView.setTab('homework')" class="px-4 py-2 rounded-xl transition ${ParentView.activeTab === 'homework' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📝 Homework & Tasks (${assignments.length})
          </button>
          <button onclick="ParentView.setTab('grades')" class="px-4 py-2 rounded-xl transition ${ParentView.activeTab === 'grades' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            📈 Academic Scorecard
          </button>
          <button onclick="ParentView.setTab('chat')" class="px-4 py-2 rounded-xl transition ${ParentView.activeTab === 'chat' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
            💬 Message Teacher
          </button>
        </div>

        <!-- Subtab Body -->
        <div id="parent-tab-content">
          ${ParentView.renderActiveTab(childRoster, assignments, submissions, marks, notices, messages)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    ParentView.activeTab = tab;
    const container = document.getElementById('view-container');
    if (container) ParentView.render(container);
  },

  renderActiveTab(childRoster, assignments, submissions, marks, notices, messages) {
    switch (ParentView.activeTab) {
      case 'summary':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left 8 cols: Quick Stats & Homework -->
            <div class="lg:col-span-8 space-y-6">
              
              <!-- Metrics Cards -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Monthly Attendance</div>
                  <div class="text-2xl font-black text-emerald-600 mt-1">96.8%</div>
                  <div class="text-[10px] text-slate-500 font-medium mt-0.5">24 present / 1 absent</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Current Term GPA</div>
                  <div class="text-2xl font-black text-rose-600 mt-1">A+ (92.2%)</div>
                  <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Rank 2 of 34 in batch</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-400 uppercase">Pending Dues</div>
                  <div class="text-2xl font-black text-slate-800 mt-1">₹0</div>
                  <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Fees Cleared</div>
                </div>
              </div>

              <!-- Child's Active Tasks -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 class="font-bold text-slate-900 text-sm">Aarav's Homework & Assignment Progress</h3>
                  <button onclick="ParentView.setTab('homework')" class="text-xs text-rose-600 font-bold hover:underline">View All &rarr;</button>
                </div>

                <div class="space-y-3">
                  ${assignments.map(a => {
                    const sub = submissions.find(s => s.assignmentId === a.id);
                    return `
                      <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">${a.subject}</span>
                            <span class="text-xs font-bold text-slate-800">${a.title}</span>
                          </div>
                          <div class="text-[11px] text-slate-500 mt-1">Teacher: ${a.assignedBy} &bull; Deadline: ${a.dueDate}</div>
                        </div>
                        <div>
                          ${sub ? `
                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                              ✓ Submitted
                            </span>
                          ` : `
                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800">
                              ⏳ In Progress
                            </span>
                          `}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

            </div>

            <!-- Right 4 cols: Teacher Profile & School Notices -->
            <div class="lg:col-span-4 space-y-6">
              <!-- Class Teacher Card -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Class Teacher</div>
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 text-sm">Mrs. Sarah Jenkins</h4>
                    <div class="text-xs text-slate-500">STEM Department &bull; Class 8-A</div>
                    <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">● Available for chat</div>
                  </div>
                </div>
                <button onclick="ParentView.setTab('chat')" class="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition">
                  💬 Chat with Mrs. Jenkins
                </button>
              </div>

              <!-- Notices Feed -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 class="font-bold text-slate-900 text-sm">School Circulars</h3>
                  <span class="text-xs text-slate-400">Notice Board</span>
                </div>
                <div class="space-y-2.5">
                  ${notices.slice(0, 2).map(n => `
                    <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                      <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">${n.category}</span>
                      <div class="font-bold text-slate-900">${n.title}</div>
                      <p class="text-[11px] text-slate-500">${n.content}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>
        `;

      case 'attendance':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Aarav's Daily Attendance Log</h3>
                <p class="text-xs text-slate-500">Synced in real-time when the class teacher marks roll call.</p>
              </div>
              <span class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Present Today ✓
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] text-slate-400 font-bold uppercase">Working Days</div>
                <div class="text-xl font-black text-slate-800 mt-0.5">25 Days</div>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div class="text-[10px] text-emerald-700 font-bold uppercase">Days Present</div>
                <div class="text-xl font-black text-emerald-800 mt-0.5">24 Days</div>
              </div>
              <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <div class="text-[10px] text-rose-700 font-bold uppercase">Days Absent</div>
                <div class="text-xl font-black text-rose-800 mt-0.5">1 Day (Excused)</div>
              </div>
              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div class="text-[10px] text-amber-700 font-bold uppercase">Times Late</div>
                <div class="text-xl font-black text-amber-800 mt-0.5">0</div>
              </div>
            </div>

            <p class="text-xs text-slate-600 italic">
              Parents receive immediate automated SMS & push notification if an unexcused absence occurs before 09:30 AM.
            </p>
          </div>
        `;

      case 'homework':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Child's Assigned Homework & Verification</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${assignments.map(a => {
                const sub = submissions.find(s => s.assignmentId === a.id);
                return `
                  <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">${a.subject}</span>
                      <span class="text-xs font-semibold text-slate-500">Due: ${a.dueDate}</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-sm">${a.title}</h4>
                    <p class="text-xs text-slate-600">${a.description}</p>
                    <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span class="text-[11px] text-slate-500 font-medium">Assigned by: ${a.assignedBy}</span>
                      ${sub ? `
                        <span class="font-bold text-emerald-700 text-xs">✓ Submitted (${sub.status})</span>
                      ` : `
                        <span class="font-bold text-amber-700 text-xs">⏳ Incomplete</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

      case 'grades':
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Aarav Sharma &bull; Official Academic Transcript</h3>
                <p class="text-xs text-slate-500">Verified by Principal & Subject Teachers.</p>
              </div>
              <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700">
                📄 Print Report Card
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th class="py-2.5 px-3">Subject</th>
                    <th class="py-2.5 px-3 text-center">Score</th>
                    <th class="py-2.5 px-3 text-center">Grade</th>
                    <th class="py-2.5 px-3">Educator Comments</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  ${marks.map(m => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 px-3 font-bold text-slate-800">${m.subject}</td>
                      <td class="py-3 px-3 font-mono font-bold text-slate-900 text-center">${m.score} / ${m.max}</td>
                      <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">${m.grade}</span></td>
                      <td class="py-3 px-3 text-slate-600">${m.remarks}</td>
                    </tr>
                  `).join('')}
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
                <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg">
                  👨‍🏫
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 text-base">Direct Chat with Mrs. Sarah Jenkins (STEM Teacher)</h3>
                  <p class="text-xs text-slate-500">Official two-way communication channel &bull; Monitored for school governance</p>
                </div>
              </div>
            </div>

            <!-- Chat Stream -->
            <div id="parent-chat-stream" class="h-64 overflow-y-auto p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              ${messages.map(m => `
                <div class="flex ${m.senderRole === 'parent' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-md p-3 rounded-2xl text-xs ${m.senderRole === 'parent' ? 'bg-rose-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'}">
                    <div class="text-[10px] font-bold ${m.senderRole === 'parent' ? 'text-rose-200' : 'text-slate-400'} mb-1">
                      ${m.senderName} &bull; ${m.timestamp}
                    </div>
                    <p>${m.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Send Input -->
            <form onsubmit="ParentView.sendMessage(event)" class="flex items-center gap-2">
              <input id="parent-msg-input" type="text" placeholder="Write a message to Mrs. Jenkins..." class="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500" required>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition">
                Send Message
              </button>
            </form>
          </div>
        `;
    }
  },

  sendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('parent-msg-input');
    if (!input || !input.value.trim()) return;
    window.store.sendMessage(input.value.trim(), 'parent');
    input.value = '';
    const container = document.getElementById('view-container');
    if (container) ParentView.render(container);
    setTimeout(() => {
      const stream = document.getElementById('parent-chat-stream');
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }
};
