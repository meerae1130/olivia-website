const PERSONAL_INFO = {
  name: "Olivia Ahn",
  title: "Computer Engineer",
  email: "ahnmeerae@gmail.com",
  linkedin: "www.linkedin.com/in/meeraeahn",
  github: "https://github.com/meerae1130",
  instagram: "https://www.instagram.com/meer_ae?igsh=YzNsMjY5Y3A0dmp1&utm_source=qr",
};

// ============================================================
// PROJECTS add and remove this section in the future to edit products sec. 
// ============================================================
const PROJECTS = [
  {
    id: 1,
    title: "Battery Organization Project",
    subtitle: "ESP Design Project",
    date: "01/2025 - 04/2026",
    description:
      "Designed and implemented a battery organization system with five other engineering students for the University of Toronto's Blue and Gold Committee.\
      Using Blender, SolidWorks, and 3D printing, the team created a modular, stackable design via dovetail joints, maximizing storage efficiency and durability.\
      As the project manager, I coordinated weekly meetings, delegated tasks, and ensured timely completion of milestones by creating and frequently updating the Gantt Chart.\
      The final product was presented at the 2026 ESP Design Expo, receiving positive feedback for its innovative design and practical application, by the committee members and professional engineers in attendance.",
    image: "assets/battery/desc1.png",
    image: "assets/battery/desc2.png",
    image: "assets/battery/desc3.png",
    image: "assets/battery/desc4.png",  
    image: "assets/battery/desc5.png",
    images: ["assets/battery/desc1.png", "assets/battery/desc2.png", "assets/battery/desc3.png", "assets/battery/desc4.png", "assets/battery/desc5.png"],
    links: [
      { icon: "bng", label: "bng", url: "https://blueandgold.skule.ca" },
    ],
  },
  // {
  //   id: 2,
  //   title: "ML Pipeline",
  //   subtitle: "Machine Learning",
  //   date: "11/02/2023",
  //   description:
  //     "An end-to-end machine learning pipeline for sentiment analysis on social media data. Trained a transformer-based model achieving 94% accuracy, with a FastAPI backend serving predictions at scale.",
  //   image: null,
  //   links: [
  //     { icon: "github", label: "GitHub", url: "https://github.com/oliviaahn/ml-pipeline" },
  //     { icon: "external", label: "Live Demo", url: "https://demo.example.com" },
  //   ],
  // },
];

// Expose globally
window.PERSONAL_INFO = PERSONAL_INFO;
window.PROJECTS = PROJECTS;
