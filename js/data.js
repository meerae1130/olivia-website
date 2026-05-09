// ============================================================
// data.js — Edit this file to update your projects & personal info
// ============================================================

const PERSONAL_INFO = {
  name: "Olivia Ahn",
  title: "Software Engineer",
  email: "olivia@email.com",         // ← replace with your email
  linkedin: "https://linkedin.com/in/oliviaahn",  // ← replace
  github: "https://github.com/oliviaahn",         // ← replace
  instagram: "https://instagram.com/oliviaahn",   // ← replace
};

// ============================================================
// PROJECTS — Add/remove objects here to update the portfolio
// Each project appears as a "product" on the main page.
// ============================================================
const PROJECTS = [
  {
    id: 1,
    title: "Project Alpha",
    subtitle: "Full-Stack Web App",
    date: "03/15/2024",
    description:
      "A full-stack web application built with React and Node.js that allows users to collaboratively manage tasks in real time using WebSocket technology. Designed with accessibility in mind and deployed on AWS with CI/CD pipelines.",
    image: null, // replace null with a path like: "assets/project1.jpg"
    links: [
      { icon: "github", label: "GitHub", url: "https://github.com/oliviaahn/project-alpha" },
    ],
  },
  {
    id: 2,
    title: "ML Pipeline",
    subtitle: "Machine Learning",
    date: "11/02/2023",
    description:
      "An end-to-end machine learning pipeline for sentiment analysis on social media data. Trained a transformer-based model achieving 94% accuracy, with a FastAPI backend serving predictions at scale.",
    image: null,
    links: [
      { icon: "github", label: "GitHub", url: "https://github.com/oliviaahn/ml-pipeline" },
      { icon: "external", label: "Live Demo", url: "https://demo.example.com" },
    ],
  },
  {
    id: 3,
    title: "iOS Application",
    subtitle: "Mobile Development",
    date: "06/20/2023",
    description:
      "A SwiftUI iOS application that integrates CoreML and Vision frameworks to provide real-time plant identification from camera input. Published on the App Store with over 2,000 downloads.",
    image: null,
    links: [
      { icon: "github", label: "GitHub", url: "https://github.com/oliviaahn/plant-app" },
    ],
  },
  {
    id: 4,
    title: "Design System",
    subtitle: "UI/UX Engineering",
    date: "01/10/2024",
    description:
      "Designed and documented a component library for a team of 12 engineers. Built in React with Storybook, covering 40+ components, dark/light modes, and WCAG 2.1 AA compliance.",
    image: null,
    links: [],
  },
];

// Expose globally
window.PERSONAL_INFO = PERSONAL_INFO;
window.PROJECTS = PROJECTS;
