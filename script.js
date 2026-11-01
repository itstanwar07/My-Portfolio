// ── data ──
const PROJECTS = [
  {
    id: 1,
    title: "Diwali Sales Prediction ",
    category: "Machine Learning / Python",
    year: "2026",
    desc: "In this project, I developed a machine learning model to predict sales during the Diwali festival. Using historical sales data and various features such as marketing spend, product categories, and seasonal trends, I trained a regression model to forecast future sales. The model achieved high accuracy and provided valuable insights for inventory management and marketing strategies.",
    accent: "#7c3aed",
    tags: ["Python", "Scikit-learn", "Pandas"],
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&h=480&fit=crop&auto=format",
    website: "https://github.com/itstanwar07/Diwali_Sales_Analysis",
  },
  {
    id: 2,
    title: "Car Price Predictor",
    category: "Machine Learning / Python",
    year: "2026",
    desc: "Conversational AI assistant built using the Claude API with dynamic prompt engineering techniques. Supports context-aware multi-turn dialogue and customisable personas.",
    accent: "#06b6d4",
    tags: ["Claude API", "Python", "Prompt Engineering"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&h=480&fit=crop&auto=format",
    website: "https://github.com/itstanwar07/car_price_prediction-ml",
  },
  {
    id: 3,
    title: "GoWithPlan - Planner Website",
    category: "Full-Stack / Web",
    year: "2026",
    desc: "In this project, I developed a comprehensive web-based planner application that allows users to organize their tasks, set reminders, and track their progress. The application features a user-friendly interface, real-time updates, and integration for seamless scheduling.",
    accent: "#f59e0b",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=700&h=480&fit=crop&auto=format",
    website: "",
  },
  {
    id: 4,
    title: "MedDoc Hub - Medical Document Management System",
    category: "Algorithms / Java",
    year: "2026",
    desc: "MedDoc Hub is a medical documentation management system which allows all type of user like Students, Professors, and other to Store their medical documents and student can share their research papers with other students and professors. It also allows users to search for medical documents and research papers based on keywords, categories, and tags.",
    accent: "#ec4899",
    tags: ["Java", "DSA", "Problem Solving"],
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&h=480&fit=crop&auto=format",
    website: "https://meddoc-hub-project.vercel.app",
  },
  {
    id: 5,
    title: "DSA Problem Solver",
    category: "Algorithms / Java",
    year: "2026",
    desc: "Collection of 100+ solved Data Structures & Algorithms problems covering arrays, trees, graphs, and dynamic programming — focused on optimised, production-quality solutions.",
    accent: "#48ecde",
    tags: ["Java", "DSA", "Problem Solving"],
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&h=480&fit=crop&auto=format",
    website: "https://leetcode.com/u/tanwar04/",
  },
];

const SKILLS = [
  { name: "Python", pct: 90 },
  { name: "Java", pct: 82 },
  { name: "Machine Learning", pct: 78 },
  { name: "Generative AI / LLMs", pct: 85 },
  { name: "C Programming", pct: 75 },
  { name: "APIs & Prompt Engineering", pct: 88 },
];

const STACK = ["Python", "Java", "C", "Claude API", "Scikit-learn", "Pandas", "NumPy", "SQL", "Git", "VS Code"];

const STATS = [
  { num: "2+", label: "Years Coding" },
  { num: "3+", label: "Projects Built" },
  { num: "5+", label: "Certifications" },
];

const ARROW_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>';

// ── render projects ──
function renderProjects() {
  const grid = document.getElementById("projects-grid");

  grid.innerHTML = PROJECTS.map(function (p) {
    var tagsHtml = p.tags.map(function (t) {
      return '<span class="project-tag" style="background:' + p.accent + '20;color:' + p.accent + ';border:1px solid ' + p.accent + '44;">' + t + '</span>';
    }).join("");

    return (
      '<div class="project-card" data-accent="' + p.accent + '" data-website="' + (p.website || "") + '">' +
        '<div class="project-media">' +
          '<img src="' + p.img + '" alt="' + p.title + '" />' +
          '<div class="project-media-overlay" style="background: linear-gradient(to bottom, transparent 40%, ' + p.accent + '1a 100%);"></div>' +
          '<div class="project-tags">' + tagsHtml + '</div>' +
        '</div>' +
        '<div class="project-body" style="border-top:1px solid ' + p.accent + '20;">' +
          '<div class="project-body-top">' +
            '<div>' +
              '<p class="project-meta" style="color:' + p.accent + ';">' + p.category + ' · ' + p.year + '</p>' +
              '<h3 class="project-title">' + p.title + '</h3>' +
            '</div>' +
            '<div class="project-arrow" data-arrow style="background:' + p.accent + '18;border:1px solid ' + p.accent + '44;color:' + p.accent + ';">' +
              ARROW_SVG +
            '</div>' +
          '</div>' +
          '<p class="project-desc">' + p.desc + '</p>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  // hover + click behaviour
  var cards = grid.querySelectorAll(".project-card");
  cards.forEach(function (card) {
    var accent = card.dataset.accent;
    var website = card.dataset.website;
    var arrow = card.querySelector("[data-arrow]");

    if (website) {
      card.style.cursor = "pointer";

      card.addEventListener("click", function () {
        window.open(website, "_blank", "noopener,noreferrer");
      });

      arrow.addEventListener("click", function (e) {
        e.stopPropagation();
        window.open(website, "_blank", "noopener,noreferrer");
      });
    }

    card.addEventListener("mouseenter", function () {
      arrow.style.background = accent;
      arrow.style.color = "#07080f";
    });

    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "perspective(900px) rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 14) + "deg) translateZ(18px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
      arrow.style.background = accent + "18";
      arrow.style.color = accent;
    });
  });
}

// ── render skills ──
function renderSkills() {
  var rows = document.getElementById("skill-rows");
  rows.innerHTML = SKILLS.map(function (sk) {
    return (
      '<div>' +
        '<div class="skill-row-top">' +
          '<span class="skill-name">' + sk.name + '</span>' +
          '<span class="skill-pct">' + sk.pct + '%</span>' +
        '</div>' +
        '<div class="skill-track">' +
          '<div class="skill-fill" style="width:' + sk.pct + '%;"></div>' +
        '</div>' +
      '</div>'
    );
  }).join("");
}

// ── render stack ──
function renderStack() {
  var tags = document.getElementById("stack-tags");
  tags.innerHTML = STACK.map(function (tool) {
    return '<span class="stack-tag">' + tool + '</span>';
  }).join("");
}

// ── render stats ──
function renderStats() {
  var grid = document.getElementById("stats-grid");
  grid.innerHTML = STATS.map(function (s) {
    return (
      '<div>' +
        '<div class="stat-num">' + s.num + '</div>' +
        '<div class="stat-label">' + s.label + '</div>' +
      '</div>'
    );
  }).join("");
}

// ── nav scroll + active section ──
function setupNav() {
  var nav = document.getElementById("nav");
  var navLinks = document.querySelectorAll(".nav-link, .nav-logo");
  var sections = ["home", "projects", "skills", "about", "contact"];

  navLinks.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.dataset.scroll;
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 50);

    var current = "home";
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i]);
      if (el && window.scrollY >= el.offsetTop - window.innerHeight / 2) {
        current = sections[i];
      }
    }
    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.classList.toggle("active", link.dataset.scroll === current);
    });
  });
}

// ── contact form ──
function setupForm() {
  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    success.style.display = "block";
  });
}

// ── init ──
renderProjects();
renderSkills();
renderStack();
renderStats();
setupNav();
setupForm();