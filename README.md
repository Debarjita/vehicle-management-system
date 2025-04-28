# Organization Hierarchy API

This is a Spring Boot project that builds an **Organization Hierarchy Management System** — managing Departments, Sub-Departments, Teams, Positions, and Employees.

---

## 🛠️ Technologies Used

- Java 21
- Spring Boot 3.4.5
- Spring Data JPA
- Spring Security (basic config)
- H2 Database (for development)
- Maven
- Lombok
## 📂 Project Structure
```go
src/main/java/com/organization/
 ├── entity/         # JPA Entities
 ├── repository/     # Data Access Layer (JPA Repositories)
 ├── service/        # Business Logic
 ├── controller/     # API Controllers
 └── config/         # Spring Security Configuration
resources/
 ├── application.properties
```
# ⚙️ Setup Instructions

## 1. Prerequisites
- Java 21 installed
- Maven installed
- Postman (for API testing)

## 2. Clone the Repository
```bash
git clone <your-repo-url>
cd organization-hierarchy
```

## 3. Configure Database
Nothing to configure!  
Uses in-memory **H2 Database** for development.

# 🚀 Running the Application
```bash
./mvnw spring-boot:run
```
or if `mvnw` is not available:

```bash
mvn spring-boot:run
```

The app will start at: [http://localhost:8080](http://localhost:8080)
# 📮 API Endpoints (Use Postman)

| Action                | Method | Endpoint                                      |
|-----------------------|--------|-----------------------------------------------|
| Create Department     | POST   | `/api/departments`                            |
| Create Sub-Department | POST   | `/api/departments/{deptId}/subdepartments`    |
| Create Team           | POST   | `/api/subdepartments/{subDeptId}/teams`       |
| Create Position       | POST   | `/api/teams/{teamId}/positions`               |
| Assign Employee       | POST   | `/api/employees`                              |
# 📑 Sample API Request Examples

## ➡️ Create a Department
**POST** `/api/departments`

```json
{
  "name": "Engineering"
}
```

---

## ➡️ Create a Sub-Department
**POST** `/api/departments/1/subdepartments`

```json
{
  "name": "Software Development"
}
```

---

## ➡️ Create a Team
**POST** `/api/subdepartments/1/teams`

```json
{
  "name": "Backend Team"
}
```

---

## ➡️ Create a Position
**POST** `/api/teams/1/positions`

```json
{
  "title": "Backend Developer"
}
```

---

## ➡️ Assign an Employee
**POST** `/api/employees`

```json
{
  "name": "John Doe",
  "role": "Employee",
  "department": { "id": 1 },
  "subDepartment": { "id": 1 },
  "team": { "id": 1 },
  "position": { "id": 1 }
}
```
# 🔐 Security
- CSRF protection disabled for simplicity.
- All endpoints currently permit all requests without authentication.
- Can be upgraded to **JWT Authentication** later.

# 🎯 Future Enhancements
- Role-Based Access Control (Employer, Team Leader, Employee)
- Pagination and Filtering
- Swagger/OpenAPI Documentation
- Database migration from H2 to MySQL/PostgreSQL
- CI/CD pipeline setup

# 📄 License
This project is licensed under the **MIT License**.


