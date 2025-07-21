# 🌟 Luca Mimmo - Portfolio

> Modern and elegant portfolio website showcasing my web development skills and projects.

## 🚀 Live Demo

[Visit Portfolio](https://portfolio-9zab.vercel.app)

## 📖 About

This is my personal portfolio website built with modern web technologies. It features a clean, responsive design with smooth animations and interactive elements that highlight my skills as a web developer.

### 👨‍💻 About Me

Hi, I'm **Luca Mimmo** — A passionate Junior Web Developer who loves building websites, designing clean interfaces, and learning new technologies every day. Always working on cool side projects and exploring the latest trends in web development.

## ✨ Features

-   **🎨 Modern Design**: Clean and professional UI with custom CSS modules
-   **📱 Fully Responsive**: Optimized for all device sizes
-   **🎭 Smooth Animations**: Engaging entrance animations using Intersection Observer
-   **🎯 Interactive Elements**: Hover effects and dynamic components
-   **📧 Contact Integration**: Copy email functionality and social media links
-   **🎨 Custom Scrollbar**: Elegant scrollbar design matching the theme
-   **⚡ Fast Performance**: Built with Vite for optimal performance

## 🛠️ Tech Stack

### Frontend

-   **React** - UI library
-   **CSS Modules** - Scoped styling
-   **Vite** - Build tool and dev server
-   **JavaScript (ES6+)** - Programming language

### Tools & Libraries

-   **Intersection Observer API** - Scroll-triggered animations
-   **Custom Hooks** - Reusable logic
-   **ESLint** - Code linting
-   **pnpm** - Package manager

### Design

-   **Poppins Font** - Typography
-   **Custom Color Palette** - Brand consistency
-   **SVG Icons** - Scalable graphics
-   **CSS Grid & Flexbox** - Layout systems

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection/         # Landing section with animations
│   │   ├── AboutSection/        # About me and skills
│   │   ├── ProjectsSection/     # Portfolio projects
│   │   ├── ContactSection/      # Contact information
│   │   └── Footer/              # Footer with email copy
│   ├── navbar/                  # Navigation component
│   ├── carousel/                # Skills carousel
│   ├── overlay/                 # Background overlays
│   └── burgerMenu/              # Mobile navigation
├── hooks/
│   ├── useIntersectionObserver.js  # Scroll animations
│   └── useIsMobile.js               # Mobile detection
└── assets/                      # Images and icons
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   pnpm (recommended) or npm

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/LucaMimmo05/portfolio.git
    cd portfolio
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    # or
    npm install
    ```

3. **Start development server**

    ```bash
    pnpm dev
    # or
    npm run dev
    ```

4. **Build for production**
    ```bash
    pnpm build
    # or
    npm run build
    ```

## 🎨 Customization

### Colors

The color scheme can be customized in `src/index.css`:

```css
:root {
    --primary-color: #8b2d30; /* Main brand color */
    --white: #fefefe; /* Text color */
    --background-color: #050404; /* Background */
}
```

### Animations

Scroll animations are controlled via the `useIntersectionObserver` hook and can be customized in individual section CSS files.

## 📞 Contact

-   **Email**: [lucamimmo2005@outlook.it](mailto:lucamimmo2005@outlook.it)
-   **LinkedIn**: [Luca Mimmo](https://www.linkedin.com/in/lucamimmo/)
-   **GitHub**: [@LucaMimmo05](https://github.com/LucaMimmo05)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
