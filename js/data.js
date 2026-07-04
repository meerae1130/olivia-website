const PERSONAL_INFO = {
  name: "Olivia Ahn",
  title: "Computer Engineer",
  email: "ahnmeerae@gmail.com",
  linkedin: "https://www.linkedin.com/in/meeraeahn",
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
    image: "assets/battery/cover.png",
    images: ["assets/battery/desc1.png", "assets/battery/desc2.png", "assets/battery/desc3.png", "assets/battery/desc4.png", "assets/battery/desc5.png"],
    links: [
      { icon: "bng", label: "bng", url: "https://blueandgold.skule.ca" },
    ],
  },
  {
    id: 2,
    title: "Dual Mode Robot Car",
    subtitle: "Robotics",
    date: "SUMMER 2026",
    description:
      `Developed a dual mode robot car capable of both autonomous and manual operation.

      AUTO MODE:
      Utilized an Arduino microcontroller and five IR sensors to detect surface reflectivity and navigate the track.

      MANUAL MODE:
      Allowed remote control via a Bluetooth module and a mobile application.

      HARDWARE:
      The chassis was inspired by the Tesla Cybertruck and was designed, 3D modeled, and printed from scratch (using Fusion 360 and OnShape).
      The interior conceals a breadboard with custom circuitry.

      At the competition, the robot car won first place for the fastest average time in both autonomous and manual modes.`,
    image: "assets/car/carcard.png",
    images: ["assets/car/car1.png", "assets/car/car2.png", "assets/car/car3.png", "assets/car/car4.png",],
    links: [
    ],
  },
];

// Expose globally
window.PERSONAL_INFO = PERSONAL_INFO;
window.PROJECTS = PROJECTS;
