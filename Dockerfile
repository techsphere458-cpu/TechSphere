# ====== Stage 1: Build Frontend ======
FROM node:20-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ====== Stage 2: Build Backend ======
FROM maven:3.9.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/ .
COPY --from=frontend-builder /frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# ====== Stage 3: Run ======
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
