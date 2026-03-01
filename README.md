# Acad Institute ERP 🎓

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

> A modern, secure, and scalable Enterprise Resource Planning (ERP) system designed for educational institutions.

Acad ERP is a comprehensive web-based management system for colleges and universities, built with modern technologies and security best practices. It handles student management, academic records, attendance tracking, fee management, and more.

---

## ✨ Features

### Phase 1 (MVP - In Progress)
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 👨‍🎓 **Student Portal** - View grades, attendance, fees, and announcements
- 📊 **Dashboard** - Comprehensive overview of academic performance
- 📧 **Announcements** - Institute-wide communication system
- 🔒 **Role-Based Access Control** - Fine-grained permissions (Admin, Teacher, Student, Parent)

### Planned Features
- 📝 **Attendance Management** - Digital attendance marking and tracking
- 🎯 **Grade Management** - Grade entry, GPA calculation, transcripts
- 💰 **Fee Management** - Fee structure, payment tracking, receipts
- 📅 **Timetable Management** - Class scheduling and conflict detection
- 👨‍🏫 **Teacher Portal** - Grade entry, attendance marking
- 👪 **Parent Portal** - Monitor child's academic progress
- 📈 **Analytics & Reports** - Performance insights and data exports

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Frontend: Next.js + React          │
│  UI: @knadh/oat (Lightweight)       │
└────────────────┬────────────────────┘
                 │ REST API
┌────────────────▼────────────────────┐
│  Backend: Express.js + Node.js      │
│  Auth: JWT, bcrypt                  │
│  Security: Helmet, CORS, Rate limit │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Database: PostgreSQL               │
│  ORM: node-postgres / Prisma        │
└─────────────────────────────────────┘
```

See [Architecture Diagrams](docs/ARCHITECTURE_DIAGRAMS.md) for detailed system design.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **PostgreSQL** 14+ (local or cloud)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/acad-erp.git
cd acad-erp

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Database Setup

```bash
# Create PostgreSQL database
createdb acad_erp

# Run migrations (from backend directory)
npm run db:migrate

# Seed sample data (optional)
npm run db:seed
```

### Environment Configuration

Create `.env` files in both `backend/` and `frontend/` directories:

**backend/.env**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/acad_erp

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

CORS_ORIGIN=http://localhost:3000
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Running the Application

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory, in another terminal)
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api/v1
- **API Docs:** http://localhost:3001/api-docs (Swagger)

---

## 📚 Documentation

- [Database Schema](docs/DATABASE_SCHEMA.md) - Complete database structure
- [API Architecture](docs/API_ARCHITECTURE.md) - RESTful API design
- [Architecture Diagrams](docs/ARCHITECTURE_DIAGRAMS.md) - System design visualizations
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Development Roadmap](docs/ROADMAP.md) - Future plans

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **UI Library:** @knadh/oat (lightweight, developer-friendly)
- **Styling:** Plain CSS / CSS Modules
- **State Management:** React Context API
- **HTTP Client:** Axios / Fetch API

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL 14+
- **ORM:** node-postgres / Prisma (TBD)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Joi / express-validator
- **Security:** Helmet, CORS, express-rate-limit

### DevOps
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Deployment:** Railway / Render (Backend), Vercel (Frontend)
- **Monitoring:** Sentry (Errors), Datadog (Performance)

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help is appreciated.

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Ways to Contribute
- 🐛 Report bugs via [GitHub Issues](https://github.com/YOUR_USERNAME/acad-erp/issues)
- 💡 Suggest features or improvements
- 📖 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository if you find it useful!

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage

# Run linter
npm run lint
```

---

## 📊 Project Status

- **Current Phase:** Phase 1 (MVP) - In Development
- **Version:** 0.1.0 (Pre-release)
- **Status:** Active Development

**Progress Tracker:**
- [x] Database schema design
- [x] API architecture design
- [x] System architecture diagrams
- [ ] Backend implementation (In Progress)
- [ ] Frontend implementation (Planned)
- [ ] Authentication & authorization (Planned)
- [ ] Student portal (Planned)
- [ ] Testing & deployment (Planned)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by real-world ERP systems used in educational institutions
- Built with modern web technologies and security best practices
- Community-driven and open for contributions

---

## 📞 Contact & Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/YOUR_USERNAME/acad-erp/issues)
- **Discussions:** [Join community discussions](https://github.com/YOUR_USERNAME/acad-erp/discussions)
- **Email:** your-email@example.com

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

## 💼 For Institutions

Interested in using Acad ERP for your institution? We can help with:
- Custom deployment
- Feature customization
- Training and support
- Managed hosting

Contact us for more information.

---

<div align="center">
  <strong>Built with ❤️ by the Acad ERP Team</strong>
  <br>
  <sub>Making education management systems accessible to all</sub>
</div>
