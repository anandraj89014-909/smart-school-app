// White-Label Customization Engine
const WhiteLabel = {
  applySchoolTheme() {
    const school = window.store.getCurrentSchool();
    if (!school) return;

    // Apply CSS Variables dynamically to root
    const root = document.documentElement;
    root.style.setProperty('--primary-color', school.colors.primary);
    root.style.setProperty('--primary-dark', school.colors.dark || school.colors.primary);
    root.style.setProperty('--primary-light', school.colors.light || '#f1f5f9');
    root.style.setProperty('--secondary-color', school.colors.secondary);
    root.style.setProperty('--school-name', `"${school.name}"`);

    // Update document title and brand badges
    document.title = `${school.name} — Smart School Platform`;

    // Update branding header components
    const brandNameEls = document.querySelectorAll('.school-brand-name');
    brandNameEls.forEach(el => el.textContent = school.name);

    // Update Logo (shows image if uploaded, or text badge if no image)
    const brandLogoEls = document.querySelectorAll('.school-brand-logo');
    brandLogoEls.forEach(el => {
      if (school.logo) {
        el.innerHTML = `<img src="${school.logo}" class="w-full h-full object-contain rounded-xl p-0.5" alt="Logo">`;
        el.style.backgroundColor = 'transparent';
      } else {
        el.innerHTML = school.shortName;
        el.style.backgroundColor = school.colors.primary;
      }
    });

    const brandMottoEls = document.querySelectorAll('.school-brand-motto');
    brandMottoEls.forEach(el => el.textContent = school.motto);

    const brandAccents = document.querySelectorAll('.school-brand-bg');
    brandAccents.forEach(el => el.style.backgroundColor = school.colors.primary);
  },

  switchSchool(schoolId) {
    window.store.setCurrentSchool(schoolId);
    this.applySchoolTheme();
    if (window.App) window.App.render();
  }
};