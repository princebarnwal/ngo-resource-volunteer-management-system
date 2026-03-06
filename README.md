<div align="center">

# 🤝 NGOConnect

### Connecting Communities with NGOs

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)

[View Design](https://www.figma.com/design/jafQxb6JkbMaoyihLpiV6r/NGOConnect-System-Design-Blueprint) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 📋 Overview

NGOConnect is a comprehensive platform designed to bridge the gap between NGOs and communities. Built with modern web technologies, it provides a seamless experience for connecting volunteers, donors, and organizations working towards social impact.

## ✨ Features

- 🔐 **Secure Authentication** - User and NGO authentication system
- 👥 **User Management** - Comprehensive user profile and management
- 🏢 **NGO Portal** - Dedicated portal for NGO registration and management
- 🎨 **Modern UI** - Built with Material-UI and Radix UI components
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🌙 **Theme Support** - Light and dark mode capabilities
- 📊 **Data Visualization** - Interactive charts with Recharts
- 🔄 **Real-time Updates** - Dynamic content management

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite 6.4
- **Styling:** Tailwind CSS 4.1, Emotion
- **UI Components:** Material-UI, Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React, Material Icons

### Backend
- **Framework:** Python Flask/FastAPI
- **Database:** PostgreSQL/MongoDB
- **Authentication:** JWT-based auth system

## 🚀 Getting Started

### Quick Start

**1. Start Backend:**
```bash
cd backend
python app.py
```

**2. Start Frontend (new terminal):**
```bash
npm install
npm run dev
```

**3. Open:** `http://localhost:5173`

**4. Login with test account:**
- Email: `barnwalprince99@gmail.com`
- Password: `qwertyuiop`

📖 **Helpful Guides:**
- [DATABASE_STATUS.md](DATABASE_STATUS.md) - Your MongoDB is working! ✅
- [QUICKSTART.md](QUICKSTART.md) - Visual quick reference
- [RUN.md](RUN.md) - Detailed running instructions  
- [MONGODB_SETUP.md](MONGODB_SETUP.md) - MongoDB setup guide

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Python 3.x (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "NGOConnect System Design Blueprint"
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running the Application

**Frontend Development Server:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Backend Server:**
```bash
cd backend
python app.py
```

**Build for Production:**
```bash
npm run build
```

## 📁 Project Structure

```
NGOConnect/
├── src/                    # Frontend source code
│   ├── app/               # React components
│   └── styles/            # CSS and theme files
├── backend/               # Backend API
│   ├── controllers/       # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── config/           # Configuration files
├── guidelines/           # Development guidelines
└── public/              # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is part of the NGOConnect System Design Blueprint.

## 🙏 Acknowledgments

- Design system based on [Figma Blueprint](https://www.figma.com/design/jafQxb6JkbMaoyihLpiV6r/NGOConnect-System-Design-Blueprint)
- UI components from Material-UI and Radix UI
- See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full credits

---

<div align="center">

Made with ❤️ for social impact

</div>