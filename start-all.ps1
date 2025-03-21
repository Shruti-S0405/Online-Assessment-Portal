# Start Service Registry
Write-Host "Starting Service Registry..."
Start-Process "C:\Program Files\Java\jdk-21\bin\java.exe" -ArgumentList "@C:\Users\shrut\AppData\Local\Temp\cp_3bkscfxcd9bv7w5o58bj8tubw.argfile com.zephyra.service_registry.ServiceRegistryApplication" -WindowStyle Minimized
Start-Sleep -Seconds 5

# Start API Gateway
Write-Host "Starting API Gateway..."
Start-Process "C:\Program Files\Java\jdk-21\bin\java.exe" -ArgumentList "@C:\Users\shrut\AppData\Local\Temp\cp_a5cyu5yss2qb96vzzwx5wyeek.argfile com.zephyra.api_gateway.ApiGatewayApplication" -WindowStyle Minimized
Start-Sleep -Seconds 5

# Start Question Service
Write-Host "Starting Question Service..."
Start-Process "C:\Program Files\Java\jdk-21\bin\java.exe" -ArgumentList "@C:\Users\shrut\AppData\Local\Temp\cp_dzwq5fj4lrqefbyoyzwdhl5j3.argfile com.zephyra.question_service.QuestionServiceApplication" -WindowStyle Minimized
Start-Sleep -Seconds 5

# Start Quiz Service
Write-Host "Starting Quiz Service..."
Start-Process "C:\Program Files\Java\jdk-21\bin\java.exe" -ArgumentList "@C:\Users\shrut\AppData\Local\Temp\cp_4lc47kct4rq30ujipk6qxgpwf.argfile com.zephyra.quiz_service.QuizServiceApplication" -WindowStyle Minimized
Start-Sleep -Seconds 5

# Navigate to frontend and start it
Write-Host "Starting Frontend..."
cd .\client
npm install
Start-Process "npm" -ArgumentList "run", "dev"

Write-Host "✅ All services and the frontend are running! Press Enter to exit..."
Read-Host
