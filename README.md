# Smart School Management Web & Mobile Application

A modern, production-grade **Smart School Management Web & Mobile Platform** implementing the full concept architecture:
- **Central Multi-Tenant Platform**: Web App + Mobile App Simulator + Mock Central Database.
- **Five Dedicated Role Portals**:
  1. 👨‍💻 **Admin / Operator**: School tenant onboarding, user account management, SaaS billing & subscriptions, and real-time white-label branding customizer.
  2. 🏫 **Principal**: Campus executive KPI dashboard, teacher & class oversight, school-wide attendance auditing, academic performance tracking, and circular broadcasting.
  3. 👨‍🏫 **Teacher**: 1-tap student attendance roll call, assignment creation, study material uploads, gradebook marks entry, and direct parent messaging.
  4. 👨‍🎓 **Student**: Attendance streak, assignment review & digital submission, study materials e-library, examination report card, and weekly period timetable.
  5. 👨‍👩‍👧 **Parent**: Live child presence status at campus, homework verification, academic progress tracking, school notices, and direct two-way chat with the class teacher.
- **Core School Features**:
  - 📊 Dashboard, 📅 Attendance, 📝 Assignments, 📚 Study Materials, 📈 Marks & Results, 📢 Notices & Announcements, 🗓️ Timetable, 💬 Communication, 📊 Reports & Analytics, 🔔 Notifications.
- **Future Roadmap Prototypes**:
  - 💰 **Fee Management & Online Payments**: Fee ledger, invoice generator, and simulated credit card/UPI checkout.
  - 🚌 **Transport / Bus GPS Tracking**: Live telemetry (speed, status, next stop ETA) and animated route progress bar.
  - 🤖 **AI Tutor**: Natural language academic assistant for solving homework equations, science formulas, and revision queries.
- **White-Label Customization**:
  - Switch between **ABC Public School** (Emerald/Gold) and **XYZ International School** (Blue/Cyan) or create your own custom-branded school with custom hex colors.
- **Dual Viewport Simulator**:
  - Toggle between **Desktop Web Portal** and **Mobile Phone Simulator** with phone notch, status bar, and bottom touch navigation bar.

---

## 🚀 How to Run the App

1. Simply double-click or open `index.html` in any web browser (Google Chrome, Microsoft Edge, Brave, Safari, Firefox):
   ```
   c:\Users\nitro\Downloads\smart-school-app\index.html
   ```
2. **Zero Dependencies Required**: No Node.js, Python, or server installation needed. All styles and interactive states run locally with browser `localStorage` persistence.

---

## 👥 Demo Role Accounts & Credentials

| Role | Demo User Name | Scope / Access |
| :--- | :--- | :--- |
| **Admin** | Alex Mercer | Global SaaS Operator (`admin@smartschool.io`) |
| **Principal** | Dr. Robert Sterling | Campus Director (`principal@abc.edu`) |
| **Teacher** | Mrs. Sarah Jenkins | Class 8-A Lead & STEM Faculty (`sarah.j@abc.edu`) |
| **Student** | Aarav Sharma | Class 8-A, Roll No: 8A-14 (`aarav.s@student.abc.edu`) |
| **Parent** | Rajesh Sharma | Guardian of Aarav Sharma (`rajesh.sharma@gmail.com`) |

---

## 🔄 Try the Interactive Workflows

1. **The Attendance Loop**:
   - Click **Teacher** role &rarr; Tap **Absent** for *Aarav Sharma*.
   - Click **Parent** role &rarr; Note Aarav's live status immediately shifts to **ABSENT** with an alert.
   - Switch back to **Teacher** &rarr; Tap **Present** or **Mark All Present** &rarr; Verify Parent status updates to **PRESENT AT CAMPUS**.

2. **The Assignment & Homework Loop**:
   - In **Teacher** &rarr; Click **+ New Assignment** &rarr; Title: *Trigonometry Quiz 2*.
   - Click **Student** &rarr; Find *Trigonometry Quiz 2* under assignments &rarr; Click **Submit Work**.
   - Review that it shows **✓ Submitted**.

3. **Two-Way Communication**:
   - In **Parent** &rarr; Go to **Message Teacher** &rarr; Type *"Will the exam cover Chapter 5?"* and send.
   - In **Teacher** &rarr; Open **Parent Communication** &rarr; The parent's message is instantly visible &rarr; Reply directly!

4. **White-Label Customizer**:
   - In **Admin** &rarr; Go to the **White-Label Branding Studio**.
   - Change the primary color or pick **XYZ International School** from the top dropdown.
   - Notice how all headers, logos, badges, and portals rebrand instantly in real time!
