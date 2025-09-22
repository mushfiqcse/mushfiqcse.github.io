// Responsive nav toggle for mobile
function toggleNav() {
	const navLinks = document.querySelector('.nav-links');
	navLinks.classList.toggle('open');
}
// Highlight nav link based on scroll position
const sectionIds = ["skills", "workplace", "education", "training", "membership","research", "gallery", "contact"];
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

function onScrollHighlightNav() {
	let scrollPos = window.scrollY || window.pageYOffset;
	let offset = 80; // adjust if navbar height changes
	let found = false;
	for (let i = sectionIds.length - 1; i >= 0; i--) {
		const section = document.getElementById(sectionIds[i]);
		if (section) {
			const sectionTop = section.offsetTop - offset;
			if (scrollPos >= sectionTop) {
				navLinks.forEach(link => link.classList.remove('active'));
				const activeLink = navLinks.find(link => link.getAttribute('href') === `#${sectionIds[i]}`);
				if (activeLink) activeLink.classList.add('active');
				found = true;
				break;
			}
		}
	}
	if (!found) navLinks.forEach(link => link.classList.remove('active'));
}
window.addEventListener('scroll', onScrollHighlightNav);
window.addEventListener('DOMContentLoaded', onScrollHighlightNav);
// Highlight navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
	if (window.scrollY > 10) {
		navbar && navbar.classList.add('scrolled');
	} else {
		navbar && navbar.classList.remove('scrolled');
	}
});
// Dark mode toggle logic
const darkModeToggle = document.getElementById('darkModeToggle');
const darkIcon = '<i class="fas fa-moon"></i>';
const lightIcon = '<i class="fas fa-sun"></i>';
function setDarkMode(isDark) {
		if (isDark) {
			document.body.classList.remove('light-mode');
			darkModeToggle.innerHTML = darkIcon;
			localStorage.setItem('theme', 'dark');
		} else {
			document.body.classList.add('light-mode');
			darkModeToggle.innerHTML = lightIcon;
			localStorage.setItem('theme', 'light');
		}
		// Force reflow for CSS variable update in some browsers
		void document.body.offsetWidth;
}
if (darkModeToggle) {
	// Initial state from localStorage or system
	const userPref = localStorage.getItem('theme');
	const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
	setDarkMode(userPref === 'dark' || (!userPref && systemPref));
	darkModeToggle.addEventListener('click', () => {
		setDarkMode(!document.body.classList.contains('light-mode'));
	});
}
// Scroll to Top Button Logic
const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
	scrollBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
	// Show button when scrolled down
	window.addEventListener('scroll', () => {
		if (window.scrollY > 200) {
			scrollBtn.style.display = 'flex';
		} else {
			scrollBtn.style.display = 'none';
		}
	});
	// Initial state
	scrollBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
}


// Smooth scroll for navigation menu with transition effect
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', function(e) {
		// Add transition effect
		link.classList.add('active-animate');
		setTimeout(() => link.classList.remove('active-animate'), 400);
		// Smooth scroll
		const href = this.getAttribute('href');
		if (href && href.startsWith('#')) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
});

// Date and Time in Footer
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function updateFooterDateTime() {
	const now = new Date();
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let hour = now.getHours();
	const ampm = hour >= 12 ? 'PM' : 'AM';
	hour = hour % 12;
	if (hour === 0) hour = 12;
	const hh = String(hour).padStart(2, '0');
	const mm = String(now.getMinutes()).padStart(2, '0');
	const ss = String(now.getSeconds()).padStart(2, '0');
	const dayName = days[now.getDay()];
	const dayNum = getOrdinal(now.getDate());
	const month = months[now.getMonth()];
	const year = now.getFullYear();
	const formatted = `${hh}:${mm}:${ss} ${ampm} || ${dayName}, ${dayNum} ${month}, ${year}`;
	const el = document.getElementById('datetime-footer');
	if (el) el.textContent = formatted;
}
setInterval(updateFooterDateTime, 1000);
window.addEventListener('DOMContentLoaded', updateFooterDateTime);

// Animate skill bars on scroll into view
function animateSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
	const percent = bar.getAttribute('data-percent');
	if (bar.getBoundingClientRect().top < window.innerHeight - 40) {
	  bar.style.width = percent + '%';
	}
  });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);
