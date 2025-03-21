## 📚 **Quiz-App**

A microservices-based quiz application with a secure and scalable architecture using Java Spring Boot for the backend and Next.js for the frontend.

---

## 🛠️ **Project Structure**
```
Quiz-App/
│── quiz-frontend/       # Next.js frontend for the quiz application
│── server/              # Backend microservices (Java, Spring Boot)
│── start-all.ps1        # Script to start all services and the frontend
```

---

## 🚀 **Technologies Used**
### **Frontend:** 
- Next.js (React-based framework)
  
### **Backend:**
- Java (JDK 21)
- Spring Boot (Microservices)
- API Gateway for routing
- Service Registry for service discovery

### **Others:**
- PowerShell for batch service startup

---

## 🔧 **Prerequisites**
- Java JDK 21 installed and added to system PATH.
- Node.js and npm installed.
- Visual Studio Code or IntelliJ IDEA for development.

---

## 📁 **Setup Instructions**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/Quiz-App.git
   cd Quiz-App
   ```

2. **Backend Setup:**
   - Open the `server` directory in your preferred IDE.
   - Build each microservice (`service-registry`, `api-gateway`, `question-service`, `quiz-service`).
   - Ensure the `target` directories with `.argfile` exist for each service.

3. **Frontend Setup:**
   - Navigate to the `quiz-frontend` folder:
     ```bash
     cd quiz-frontend
     npm install
     ```
   - Run the Next.js development server:
     ```bash
     npm run dev
     ```

---

## ▶️ **Running the Application**
To start all services and the frontend simultaneously, use the PowerShell script:

```powershell
.\start-all.ps1
```
This will:
- Start each backend microservice with a slight delay.
- Start the Next.js frontend in development mode.

---

## 🌐 **Accessing the Application**
- The Next.js application runs on **http://localhost:3000**.
- Ensure all backend services are running smoothly.

---

## 📂 **Folder Structure**
```
server/
│── service-registry/       # Eureka service registry
│── api-gateway/            # Spring Cloud Gateway
│── question-service/       # Question microservice
│── quiz-service/           # Quiz microservice

quiz-frontend/
│── pages/                  # Next.js pages for routing
│── components/             # UI components
│── public/                 # Static files
│── styles/                 # Global styles
```

---

## 🛡️ **Troubleshooting**
- If any service fails to start, check your Java and npm installations.
- Verify the `.argfile` paths in the PowerShell script.
- Adjust sleep durations in `start-all.ps1` if services need more time to initialize.
- If Next.js doesn't start, make sure the port `3000` is not occupied.

