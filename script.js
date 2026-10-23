const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('open');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const jobDetails = {
  'IT professionals': 'Explore opportunities across software development, infrastructure, data, cybersecurity, quality engineering and technical support.',
  'Nurses': 'Find nursing opportunities across clinical settings, specialties and care teams, matched to your experience and preferences.',
  'Healthcare professionals': 'Discover roles in patient care, allied health, clinical operations and other healthcare specialties.',
  'Scientists': 'Explore opportunities in research, laboratory science, life sciences, quality and technical disciplines.',
  'Admin & clerical': 'Support effective workplaces through opportunities in administration, coordination, customer service and office operations.',
  'Human resources': 'Find people-focused roles across talent acquisition, HR operations, learning, employee relations and people strategy.',
  'Project managers': 'Explore opportunities leading teams, timelines and delivery across business, technology and operations projects.',
  'Finance & accounting': 'Discover roles in accounting, financial analysis, audit, reporting, payroll and business finance.',
  'Product managers': 'Find opportunities shaping product strategy, roadmaps and customer experiences with cross-functional teams.',
  'Analysts': 'Explore analyst roles spanning business, data, systems, finance, research and process improvement.',
  'Assembly technicians': 'Discover hands-on opportunities in assembly, production, equipment operation, inspection and manufacturing.'
};

const jobModal = document.querySelector('.job-modal');
const jobModalTitle = document.querySelector('#job-modal-title');
const jobModalContent = document.querySelector('.job-modal-content');
const jobApply = document.querySelector('.job-apply');
let lastFocusedElement;

function openJobModal(role) {
  lastFocusedElement = document.activeElement;
  if (role === 'all') {
    jobModalTitle.innerHTML = 'Find your <span class="serif-accent">next role.</span>';
    jobModalContent.innerHTML = `<p>We’re currently hiring across these specialties. Choose an area to see the kinds of opportunities you can explore.</p><div class="job-list">${Object.keys(jobDetails).map((name) => `<button type="button" data-job-choice="${name}"><span>${name}</span><span aria-hidden="true">↗</span></button>`).join('')}</div>`;
    jobApply.href = 'mailto:enquiry@cortexbleu.com?subject=Career%20opportunity';
  } else {
    jobModalTitle.textContent = role;
    jobModalContent.innerHTML = `<p>${jobDetails[role] || 'Explore current opportunities with our recruiting team.'}</p><p>Share your experience and the roles you’re interested in. Our team can help you explore a suitable next step.</p>`;
    jobApply.href = `mailto:enquiry@cortexbleu.com?subject=${encodeURIComponent(`${role} opportunities`)}`;
  }
  jobModal.classList.add('open');
  jobModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  jobModal.querySelector('.job-modal-close').focus();
}

function closeJobModal() {
  jobModal.classList.remove('open');
  jobModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-role]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openJobModal(link.dataset.role);
  });
});

jobModal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close-modal]')) closeJobModal();
  const choice = event.target.closest('[data-job-choice]');
  if (choice) openJobModal(choice.dataset.jobChoice);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && jobModal.classList.contains('open')) closeJobModal();
});
