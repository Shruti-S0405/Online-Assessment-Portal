## 📚 **Online Assessment Portal**

A microservices-based online assessment portal with a secure and scalable architecture using Java Spring Boot for the backend and Next.js for the frontend. Designed for conducting and managing assessments seamlessly.

---

## 🛠️ **Project Structure**
```
Online-Assessment-Portal/
│── portal-frontend/       # Next.js frontend for the assessment portal
│── server/                # Backend microservices (Java, Spring Boot)
│── start-all.ps1          # Script to start all services and the frontend
```

---

## 🚀 **Technologies Used**

### **Frontend:** 
- Next.js (React-based framework)

### **Backend:**
- Java (JDK 21)
- Spring Boot (Microservices architecture)
- Spring Cloud Gateway for API routing
- Eureka Service Registry for service discovery

### **Others:**
- PowerShell scripting for batch startup

---

## 🔧 **Prerequisites**
- Java JDK 21 installed and added to system PATH
- Node.js and npm installed
- Visual Studio Code or IntelliJ IDEA for development

---

## 📁 **Setup Instructions**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/Online-Assessment-Portal.git
   cd Online-Assessment-Portal
   ```

2. **Backend Setup:**
   - Open the `server` directory in your IDE.
   - Build each microservice (`service-registry`, `api-gateway`, `question-service`, `assessment-service`).
   - Ensure each service has a `target` directory with a valid `.argfile`.

3. **Frontend Setup:**
   - Navigate to the `portal-frontend` folder:
     ```bash
     cd portal-frontend
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
- Start each backend microservice with slight delays for initialization
- Launch the frontend in development mode

---

## 🌐 **Accessing the Portal**
- The frontend runs at **http://localhost:3000**
- Ensure all backend services are up and registered with the service registry

---

## 📂 **Folder Structure**
```
server/
│── service-registry/       # Eureka service registry
│── api-gateway/            # API gateway for routing requests
│── question-service/       # Handles assessment questions
│── assessment-service/     # Manages assessment sessions and submissions

portal-frontend/
│── pages/                  # Next.js routing pages
│── components/             # UI components (e.g., forms, timers)
│── public/                 # Static assets
│── styles/                 # Global stylesheets
```

---

## 🛡️ **Troubleshooting**
- Ensure Java and npm are properly installed and configured
- Check `.argfile` references in the PowerShell script if a service doesn’t launch
- Increase delay in `start-all.ps1` if services require more time to initialize
- Make sure port **3000** is free before starting the frontend

---
