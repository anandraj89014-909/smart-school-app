// Future Roadmap Features Module (Fee Management, Live Bus GPS Tracking, AI Tutor)
const RoadmapView = {
  renderFees(container) {
    const feeData = window.store.data.fees;
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase">
              <span>💰</span> Core Module Preview &bull; Fee Management
            </div>
            <h3 class="font-bold text-slate-900 text-lg mt-1">Student Fee Portal & Online Payments</h3>
            <p class="text-xs text-slate-500">Aarav Sharma &bull; Class 8-A &bull; Automated Invoicing & Online Gateway</p>
          </div>
          <span class="text-xs font-bold px-3 py-1 rounded-full ${feeData.totalDue === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
            Status: ${feeData.status}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold uppercase">Term 2 Tuition</span>
            <div class="text-xl font-black text-slate-900 mt-1">₹${feeData.tuitionFee}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Includes digital curriculum & lab license</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold uppercase">Lab & Sports Fee</span>
            <div class="text-xl font-black text-slate-900 mt-1">₹${feeData.labFee}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">STEM equipment & sports uniform</div>
          </div>
          <div class="p-4 rounded-xl ${feeData.totalDue === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'} border">
            <span class="${feeData.totalDue === 0 ? 'text-emerald-700' : 'text-rose-700'} font-bold uppercase">Total Balance Due</span>
            <div class="text-2xl font-black ${feeData.totalDue === 0 ? 'text-emerald-800' : 'text-rose-800'} mt-1">₹${feeData.totalDue}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">${feeData.totalDue === 0 ? 'All fees settled' : 'Due date: Oct 01, 2026'}</div>
          </div>
        </div>

        <!-- Invoice Records -->
        <div class="space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-600">Billing History & Invoices</h4>
          <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            ${feeData.invoices.map(inv => `
              <div class="p-3.5 bg-white flex items-center justify-between text-xs hover:bg-slate-50 transition">
                <div>
                  <div class="font-bold text-slate-900">${inv.description}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${inv.id} &bull; Generated on ${inv.date}</div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="font-black text-slate-800">${inv.amount}</span>
                  ${inv.status === 'Paid' ? `
                    <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PAID ✓</span>
                  ` : `
                    <button onclick="RoadmapView.simulatePayFee('${inv.id}')" class="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs transition">
                      Pay Now (Card / UPI)
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  simulatePayFee(invoiceId) {
    if (confirm("Proceed to pay ₹1,120 via Mock Secure Payment Gateway (Stripe/UPI)?")) {
      window.store.payFee(invoiceId);
      alert("Payment Successful! Digital invoice receipt generated.");
      const container = document.getElementById('view-container');
      if (container) RoadmapView.renderFees(container);
    }
  },

  renderTransport(container) {
    const t = window.store.data.transport;
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md uppercase">
              <span>🚌</span> Core Module Preview &bull; Transport & GPS
            </div>
            <h3 class="font-bold text-slate-900 text-lg mt-1">Live Campus Bus GPS Tracking</h3>
            <p class="text-xs text-slate-500">${t.busNumber} &bull; Driver: ${t.driverName} (${t.driverPhone})</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="text-xs font-bold text-emerald-700 font-mono">LIVE GPS CONNECTED</span>
          </div>
        </div>

        <!-- Telemetry Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Bus Status</span>
            <div class="text-base font-black text-slate-900 mt-0.5">${t.status}</div>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Current Velocity</span>
            <div class="text-base font-black text-blue-600 mt-0.5">${t.speed}</div>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Next Stop</span>
            <div class="text-base font-black text-emerald-700 mt-0.5">Maple St.</div>
          </div>
          <div class="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200">
            <span class="text-cyan-800 font-bold uppercase text-[10px]">Estimated Arrival</span>
            <div class="text-base font-black text-cyan-900 mt-0.5">${t.etaToStop}</div>
          </div>
        </div>

        <!-- Visual Route Simulator -->
        <div class="p-4 rounded-xl bg-slate-900 text-white space-y-4">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-cyan-300 uppercase tracking-wider">Bus Route Progress</span>
            <span class="text-slate-400 font-mono text-[11px]">Bus Pin Location: ${t.currentLocation}</span>
          </div>

          <div class="relative py-4">
            <!-- Line -->
            <div class="h-2 bg-slate-700 rounded-full w-full relative">
              <div class="h-2 bg-cyan-400 rounded-full" style="width: 45%;"></div>
              <!-- Moving Bus Icon -->
              <div class="absolute -top-3.5 left-[43%] bg-amber-400 text-slate-950 p-1 rounded-full shadow-lg text-xs font-black">
                🚌
              </div>
            </div>

            <!-- Stops -->
            <div class="grid grid-cols-4 gap-2 text-center mt-4 text-xs">
              ${t.stops.map(s => `
                <div class="space-y-1">
                  <div class="w-3 h-3 mx-auto rounded-full ${s.status === 'Passed' ? 'bg-emerald-400' : s.status.includes('Next') ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}"></div>
                  <div class="font-bold text-slate-200 text-[11px] truncate">${s.name}</div>
                  <div class="text-[10px] text-cyan-300 font-mono">${s.time}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderAI(container) {
    const aiData = window.store.data.aiTutor;
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md uppercase">
              <span>🤖</span> Core Module Preview &bull; AI Features
            </div>
            <h3 class="font-bold text-slate-900 text-lg mt-1">Smart AI Tutor & Homework Assistant</h3>
            <p class="text-xs text-slate-500">Natural language tutoring for mathematics, science formulas, and essay drafting.</p>
          </div>
          <span class="text-xs font-mono bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg font-bold">
            Gemini Flash STEM Engine
          </span>
        </div>

        <!-- Chat Stream -->
        <div id="ai-chat-stream" class="h-64 overflow-y-auto p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div class="flex justify-start">
            <div class="max-w-xl p-3.5 rounded-2xl text-xs bg-white border border-slate-200 shadow-2xs space-y-1">
              <div class="font-bold text-purple-700 text-[10px]">🤖 Smart School AI Assistant</div>
              <p class="text-slate-700">Hello! I am your 24/7 AI tutor. You can ask me to explain algebra equations, biology cell structures, or give feedback on essay drafts!</p>
            </div>
          </div>

          ${aiData.map(item => `
            <div class="flex justify-end">
              <div class="max-w-md p-3 rounded-2xl text-xs bg-purple-600 text-white">
                <p>${item.q}</p>
              </div>
            </div>
            <div class="flex justify-start">
              <div class="max-w-xl p-3.5 rounded-2xl text-xs bg-white border border-slate-200 shadow-2xs space-y-1">
                <div class="font-bold text-purple-700 text-[10px]">🤖 Smart School AI Assistant</div>
                <p class="text-slate-700 leading-relaxed">${item.a}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Prompt Input -->
        <form onsubmit="RoadmapView.askAI(event)" class="flex items-center gap-2">
          <input id="ai-user-prompt" type="text" placeholder="Ask anything: e.g. What is photosynthesis? or Explain Newton's 2nd Law..." class="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500" required>
          <button type="submit" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5">
            <span>✨</span> Ask AI
          </button>
        </form>
      </div>
    `;
  },

  askAI(e) {
    e.preventDefault();
    const input = document.getElementById('ai-user-prompt');
    if (!input || !input.value.trim()) return;
    const query = input.value.trim();

    let reply = "That's a fantastic academic inquiry! In core school curriculum, this concept relates directly to fundamental scientific principles and problem-solving methodologies.";
    if (query.toLowerCase().includes("photosynthesis")) {
      reply = "Photosynthesis is the biochemical process by which green plants transform light energy into chemical energy: 6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂. It takes place within the chloroplasts containing chlorophyll!";
    } else if (query.toLowerCase().includes("newton")) {
      reply = "Newton's 2nd Law states that Force equals mass times acceleration (F = m × a). This means the heavier an object is, the more force is required to accelerate it!";
    } else if (query.toLowerCase().includes("algebra") || query.toLowerCase().includes("math")) {
      reply = "In algebra, remember the golden rule: whatever mathematical operation you apply to one side of the equation, you must always apply to the other side to keep balance!";
    }

    window.store.data.aiTutor.push({ q: query, a: reply });
    input.value = '';
    const container = document.getElementById('view-container');
    if (container) RoadmapView.renderAI(container);
    setTimeout(() => {
      const stream = document.getElementById('ai-chat-stream');
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }
};
