// Principal / Head of School View Module
const PrincipalView = {
  render(container) {
    const school = window.store.getCurrentSchool();
    const notices = window.store.data.notices;
    const roster = window.store.getAttendanceRoster();
    const assignments = window.store.getAssignments();

    const presentCount = roster.filter(r => r.status === 'present').length;
    const attendancePct = ((presentCount / roster.length) * 100).toFixed(1);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Banner -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                <span>🏫</span> Campus Director & Executive Oversight
              </div>
              <h2 class="text-2xl font-black tracking-tight">${school.name} &bull; Principal Console</h2>
              <p class="text-sm text-slate-300 mt-1">Lead faculty, audit academic integrity, track campus attendance, and broadcast official circulars.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="PrincipalView.openNoticeModal()" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-1.5">
                <span>📢</span> Publish Official Notice
              </button>
            </div>
          </div>
        </div>

        <!-- Executive KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Attendance</div>
            <div class="text-2xl font-black text-emerald-600 mt-1">${attendancePct}%</div>
            <div class="text-xs text-slate-500 font-medium mt-1">${presentCount} of ${roster.length} present in sample class</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Pass Rate</div>
            <div class="text-2xl font-black text-blue-600 mt-1">98.4%</div>
            <div class="text-xs text-slate-500 font-medium mt-1">Term 1 Assessment</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Faculty</div>
            <div class="text-2xl font-black text-slate-800 mt-1">${school.stats.teachers} Teachers</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">100% Present Today</div>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignments Audited</div>
            <div class="text-2xl font-black text-purple-600 mt-1">${assignments.length} Courseworks</div>
            <div class="text-xs text-slate-500 font-medium mt-1">Class 8-A Curriculum Pacing: On Schedule</div>
          </div>
        </div>

        <!-- Main Content: Teacher Allocation & Campus Notices -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Faculty & Class Oversight (7 cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-bold text-slate-900 text-base">Faculty Roster & Class Allocations</h3>
                <p class="text-xs text-slate-500">Monitor teacher subject duties and class performance metrics.</p>
              </div>
              <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                8 Academic Departments
              </span>
            </div>

            <div class="space-y-3">
              <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg font-bold">
                    👨‍🏫
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Mrs. Sarah Jenkins</div>
                    <div class="text-xs text-slate-500">Department Head &bull; STEM (Math & Science)</div>
                    <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">Assigned: Class 8-A (Class Teacher) &bull; Class 9-B</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-slate-800">Class Avg: 91.2%</span>
                  <div class="text-[10px] text-slate-400">Attendance: 96%</div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                    👨‍🏫
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Mr. David Thorne</div>
                    <div class="text-xs text-slate-500">Humanities & Languages &bull; English Literature</div>
                    <div class="text-[11px] text-blue-600 font-semibold mt-0.5">Assigned: Class 8-A &bull; Class 10-A</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-slate-800">Class Avg: 88.5%</span>
                  <div class="text-[10px] text-slate-400">Attendance: 94%</div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg font-bold">
                    👨‍🏫
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Mr. Mark Vance</div>
                    <div class="text-xs text-slate-500">Computer Science & Robotics</div>
                    <div class="text-[11px] text-purple-600 font-semibold mt-0.5">Assigned: Class 8-A &bull; STEM Innovation Lab</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-slate-800">Class Avg: 96.0%</span>
                  <div class="text-[10px] text-slate-400">Attendance: 98%</div>
                </div>
              </div>
            </div>

            <!-- School Executive Reports Generator -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-slate-800">Executive School Report Card</span>
                <p class="text-slate-500 text-[11px]">Generate accredited performance summary for board members and parents.</p>
              </div>
              <button onclick="window.print()" class="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700">
                📄 Print Executive Summary
              </button>
            </div>
          </div>

          <!-- Official School Notices & Circulars (5 cols) -->
          <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-lg">📢</span>
                <h3 class="font-bold text-slate-900 text-base">Published Notices & Circulars</h3>
              </div>
              <span class="text-xs font-semibold text-slate-500">${notices.length} Total</span>
            </div>

            <div class="space-y-3">
              ${notices.map(n => `
                <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      n.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                      n.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }">${n.priority} &bull; ${n.category}</span>
                    <span class="text-[11px] text-slate-400">${n.date}</span>
                  </div>
                  <div class="font-bold text-slate-900 text-xs">${n.title}</div>
                  <p class="text-xs text-slate-600 line-clamp-2">${n.content}</p>
                  <div class="text-[10px] text-slate-400 font-medium">By: ${n.author}</div>
                </div>
              `).join('')}
            </div>

            <!-- New Notice Form Inline Trigger -->
            <div class="pt-2 border-t border-slate-100">
              <button onclick="PrincipalView.openNoticeModal()" class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition">
                + Create & Broadcast New Circular
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  openNoticeModal() {
    const title = prompt("Enter Circular / Notice Title:", "Winter Examination Schedule & Admit Card Issuance");
    if (!title) return;
    const content = prompt("Enter Notice Content / Details:", "Mid-term examinations will commence next Monday. Please download revised syllabus guidelines.");
    if (!content) return;

    window.store.publishNotice({
      title: title,
      category: "Official Circular",
      author: "Dr. Robert Sterling (Principal)",
      priority: "Urgent",
      content: content
    });

    alert("Notice successfully broadcasted to Teachers, Students, and Parents!");
  }
};
