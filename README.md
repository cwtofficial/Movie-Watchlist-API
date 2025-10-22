# 🎬 Movie Watchlist API - Complete Backend Tutorial

![CWT Banner](https://img.shields.io/badge/Code_With_Ty-Tutorial-purple?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

> **From JavaScript Basics to AI-Powered APIs** - A comprehensive tutorial series by [CWT](https://codewithty.dev)

## 📖 About This Tutorial

Welcome to the most comprehensive backend API tutorial you'll find in 2025! This isn't just another CRUD tutorial - we're building a **production-ready Movie Watchlist API** with **AI-powered recommendations** using OpenAI's latest Responses API.

**Perfect for:** JavaScript developers ready to level up their backend skills and add AI integration to their portfolio.

**No backend experience required** - just basic JavaScript knowledge!

---

## 🎯 What You'll Build

A complete Movie/Series Watchlist API featuring:

- ✅ **User Authentication** - Secure JWT-based auth system
- ✅ **Personal Watchlists** - Add, update, and track movies/series
- ✅ **Ratings & Reviews** - Rate and review content
- ✅ **Smart Search** - Search by title, genre, actors
- ✅ **AI Recommendations** - Personalized movie suggestions powered by OpenAI
- ✅ **Production-Ready** - Error handling, validation, security best practices

---

## 📚 Tutorial Structure

### **Part 1: Node.js Fundamentals**

- Understanding Node.js and its role in backend development
- Working with the built-in `http` module
- Creating a basic server from scratch
- Handling HTTP methods (GET, POST, PUT, DELETE)
- URL parsing and routing without frameworks
- JSON data parsing

### **Part 2: Express Framework**

- Why Express makes development easier
- Setting up an Express server
- Middleware concepts and implementation
- Route parameters and query strings
- Request body parsing
- Error handling middleware
- Environment variables with dotenv

### **Part 3: Building Core API Endpoints**

- `GET /movies` - List all movies/series
- `GET /movies/:id` - Get specific movie details
- `POST /movies` - Add new movie to watchlist
- `PUT /movies/:id` - Update movie details/status
- `DELETE /movies/:id` - Remove from watchlist

### **Part 4: Database Integration**

- Setting up MongoDB
- Database schema design for movies/series
- CRUD operations with database
- Data validation and error handling
- Working with Mongoose ODM

### **Part 5: Authentication & Authorization**

- **Security Demo:** Understanding vulnerable endpoints
- Implementing JWT authentication
- User registration and login endpoints
- Protecting routes with middleware
- User-specific watchlist access
- Password hashing with bcrypt

### **Part 6: Advanced Features**

- Advanced search functionality (title, genre, actors)
- Movie rating and review system
- File upload for movie posters
- API rate limiting
- Input sanitization and validation
- Query optimization

### **Part 7: 🤖 AI Integration**

The game-changer! Learn to integrate cutting-edge AI:

- **Smart Movie Recommendations** - AI analyzes viewing habits
- **OpenAI Responses API Integration** - Latest 2025 API
- **Structured JSON Outputs** - Using JSON schemas
- **Prompt Engineering** - Crafting effective AI prompts
- **User Preference Analysis** - Building intelligent features
- **Cost Management** - Responsible AI practices

---

## 🛠️ Tech Stack

| Technology     | Purpose                         |
| -------------- | ------------------------------- |
| **Node.js**    | JavaScript runtime environment  |
| **Express.js** | Web application framework       |
| **MongoDB**    | NoSQL database                  |
| **Mongoose**   | MongoDB object modeling         |
| **JWT**        | Authentication tokens           |
| **bcrypt**     | Password hashing                |
| **OpenAI API** | AI-powered recommendations      |
| **dotenv**     | Environment variable management |
| **Postman**    | API testing                     |

---

## 📋 Prerequisites

Before starting this tutorial, you should have:

- ✅ Basic JavaScript knowledge (variables, functions, arrays, objects)
- ✅ Understanding of async/await or Promises
- ✅ Node.js installed on your machine (v18+ recommended)
- ✅ A code editor (VS Code recommended)
- ✅ Postman installed for API testing
- ✅ Basic understanding of REST APIs (helpful but not required)

**No backend experience needed!** We'll teach you everything from scratch.

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/codewithty/movie-watchlist-api.git
cd movie-watchlist-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

4. **Run the development server**

```bash
node app
```

The API will be running at `http://localhost:3000`

---

## 📁 Project Structure

```
movie-watchlist-api/
├── controllers/
│   ├── useejs      # Authentication logic
│   ├── movies.js     # Movie CRUD operations
│   └── ai.js        # AI recommendation logic
├── models/
│   ├── UserSchema.js                # User schema
│   └── MovieSchema.js               # Movie schema
├── middleware/
│   ├── authorization.js             # JWT
│   └── notFound.js                  # Not Found
├── routes/
│   ├── user.js                      # Auth endpoints
│   ├── movies.js                    # Movie endpoints
│   └── aiRoutes.js                  # AI endpoints
├── db/
│   └──connect.js                  # Database configuration
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── app.js                   # Entry point
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/user/register      # Register new user
POST   /api/user/login         # Login user
(protected)
```

### Movies

```
GET    /movies             # Get all movies (protected)
GET    /movies/:id         # Get single movie (protected)
POST   /movies             # Add new movie (protected)
PUT    /movies/:id         # Update movie (protected)
DELETE /movies/:id         # Delete movie (protected)
GET    /movies/search?q=   # Search movies (protected)
```

### AI Recommendations

```
GET    /ai/recommendation # Get AI-powered movie recommendations (protected)
```

---

## 🤖 AI Features Deep Dive

### How AI Recommendations Work

1. **User Data Analysis**

   - Fetches user's complete watch history
   - Identifies highly-rated movies (4+ stars)
   - Analyzes genre preferences

2. **Prompt Engineering**

   - Constructs intelligent prompts with user context
   - Sends structured requests to OpenAI Responses API

3. **Structured Output**
   - Uses JSON schemas for consistent responses
   - Validates AI output format
   - Returns confidence scores for each recommendation

### Example AI Response

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "title": "Inception",
        "year": 2010,
        "genre": "Sci-Fi Thriller"
      }
    ]
  }
}
```

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt encryption
- **CORS Configuration** - Cross-origin resource sharing
- **Environment Variables** - Sensitive data protection

---

## 📊 Database Schema

### User Model

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Movie Model

```javascript
{
  user: ObjectId (ref: 'User'),
  title: String (required),
  year: Number,
  genre: String,
  status: String (enum: ['pending', 'ongoing', 'completed']),
  rating: Number (1-10),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 💡 Learning Outcomes

By the end of this tutorial, you will be able to:

✅ Build production-ready REST APIs from scratch  
✅ Implement secure authentication and authorization  
✅ Design and work with NoSQL databases  
✅ Integrate AI/ML services into your applications  
✅ Handle errors and validate data properly  
✅ Structure scalable Node.js applications  
✅ Test APIs using Postman  
✅ Deploy backend applications  
✅ Work with environment variables and configuration  
✅ Implement advanced features like search and file uploads

---

## 🎓 Who Is This For?

### Perfect For:

- Frontend developers wanting to learn backend
- JavaScript developers expanding their skill set
- Developers wanting to add AI to their portfolio
- Anyone building their first production API
- Career switchers entering web development

### Not For:

- Complete programming beginners (learn JavaScript first)
- Experienced backend developers (might be too basic)

---

## 🔗 Resources & Links

- **Tutorial Website:** [codewithty.dev](https://codewithty.dev)
- **YouTube Channel:** [Code With Ty](https://youtube.com/@codewithty)
- **Documentation:**
  - [Node.js Docs](https://nodejs.org/docs)
  - [Express.js Docs](https://expressjs.com)
  - [MongoDB Docs](https://docs.mongodb.com)
  - [OpenAI API Docs](https://platform.openai.com/docs)

---

## 🤝 Contributing

We welcome contributions! If you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the CWT License

---

## 💬 Community & Support

- **Questions?** Open an issue on GitHub
- **Feedback?** Join our [Discord community](#)
- **Follow us:** [@codewithty](#) on all platforms

---

## 🌟 What Makes This Tutorial Different?

### ❌ What This ISN'T:

- Another basic todo app tutorial
- Shallow coverage of topics
- Copy-paste code without explanation
- Outdated 2020 practices

### ✅ What This IS:

- **Production-ready** code you can actually deploy
- **2025 best practices** including AI integration
- **Deep explanations** of WHY, not just HOW
- **Portfolio-worthy** project that impresses recruiters
- **Beginner-friendly** yet comprehensive
- **Real-world features** companies actually need

---

## 🎬 Ready to Build?

Stop overthinking. Start building. Your journey from JavaScript developer to full-stack engineer with AI skills starts here.

**[Get Started Now →](https://codewithty.dev)**

---

## 🙏 Acknowledgments

- OpenAI for providing the Responses API
- The Node.js and Express communities
- All our students and followers who make CWT possible

---

<div align="center">

**Built with ❤️ by [CodeWithTy](https://codewithty.dev)**

_See you at the Other End of Backend Development!_ 🚀

[![Follow on Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/codewithty)
[![Subscribe on YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@codewithty)
[![Follow on TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@codewithty_)

</div>

---
