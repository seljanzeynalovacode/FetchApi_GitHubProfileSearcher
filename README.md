# 🚀 GitHub Inspector Pro

A modern, highly responsive, and visually appealing web application built with **Vanilla JavaScript (ES6+)**, **Fetch API**, and **Bootstrap 5**. This application leverages the **GitHub REST API** to inspect any user profile, explore their public repositories, followers, and following lists in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## ✨ Features

- 🔍 **Real-time User Search:** Instantly fetch and display any valid GitHub profile details.
- 🎨 **Glassmorphism & Modern UI:** Designed with vibrant gradients, soft shadows, custom cards, and smooth CSS transitions.
- 📦 **Interactive Repository Explorer:** View the latest updated repositories along with star counts (`⭐`) and quick-access links.
- 👥 **Network Inspector:** Effortlessly toggle between **Followers** and **Following** lists with interactive profile triggers.
- 📱 **Fully Responsive:** Seamlessly optimized for Mobile, Tablet, and Desktop screens.
- ⚡ **Asynchronous Data Handling:** Clean error management, loading spinners, and robust `async/await` Fetch API integration.

---

## 🛠️ Tech Stack & Tools

- **Frontend:** HTML5, CSS3 (Custom Variables & Modern Flexbox/Grid)
- **Framework:** [Bootstrap 5](https://getbootstrap.com/)
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts)
- **API:** [GitHub REST API v3](https://docs.github.com/en/rest)

---

## 📂 Project Structure

```text
github-inspector/
├── css/
│   └── style.css       # Custom styles, glassmorphism effects & gradients
├── app.js              # Fetch API logic, DOM manipulation & state handlers
├── index.html          # Main HTML markup structure
└── README.md           # Project documentation
```
## 🚀 Getting Started Locally

No complex build step or dependency installation is required!

1. **Clone the repository:**

```bash
   git clone https://github.com/seljanzeynalovacode/FetchApi_GitHubProfileSearcher.git
```

2. **Open the application:**
   - Simply open `index.html` in your favorite web browser, or use the **Live Server** extension in Visual Studio Code.

---

## 🔌 API Endpoints Used

This project fetches data from the following public GitHub REST API endpoints:

- **User Profile:** `GET https://api.github.com/users/{username}`
- **Repositories:** `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=10`
- **Followers:** `GET https://api.github.com/users/{username}/followers?per_page=10`
- **Following:** `GET https://api.github.com/users/{username}/following?per_page=10`
---
## 🤝 Contributing

Since this is a showcase and sandbox learning project, feel free to fork it, experiment with adding new features.
