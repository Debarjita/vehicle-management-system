# vehicle-management-system
## Introduction
Welcome to the More Torque API documentation. This system is designed to manage vehicle and organization data for the More Torque taxi service company, which provides cars for organizations (referred to as orgs) for taxi services. The system tracks vehicles, organizations, policies, and enforces rules such as fuel reimbursement and speed limits.

This API provides a set of endpoints to manage vehicles and organizations, handle policies, and ensure data consistency across parent-child relationships between organizations.
## Table of Contents
- Documentation
- Technologies Used
- project structure
- API Endpoints
- GET /vehicles/decode/
- POST /vehicles
- GET /vehicles/
- POST /Orgs
- PATCH /orgs
- GET /orgs
- Authentication
- Rate Limiting
- Caching
- Running the Application
- Tests
- License

## Documentation
- Full description with functionalities and features , bonus areas and diagramatic representation of inheritance and overriding concepts provided in the pdf format
- `https://github.com/Debarjita/vehicle-management-system/blob/main/DocumentationDetails.pdf`
## Technologies Used
- Node.js and Express.js for backend development
- MongoDB for data storage
- Memcached for caching
- JWT (JSON Web Tokens) for authentication
- NHTSA API (National Highway Traffic Safety Administration) for VIN decoding

# Project Structure
```go
MTQ/
├── controllers/
│   ├── authController.js     (Generate JWT tokens upon user login or registration for clients)
│   ├── orgController.js      (Contains logic for organization-related endpoints:)
│   ├── vehicleController.js  (Contains logic for vehicle-related endpoints)
├── middleware/
│   ├── auth.js             (Validates JWT for protected routes)
│   ├── rateLimiter.js      (Limits API requests using express-rate-limit to prevent too many requests.)
│   ├── validateVin.js      (A middleware function that checks if the VIN format is valid.)
├── models/
│   ├── organisation.js     (Defines the Organization schema)
│   ├── vehicle.js          (Defines the Vehicle schema)
├── routes/
│   ├── orgRoutes.js        (Routes define API endpoints and map them to their respective organisation controllers.)
│   ├── vehicleRoutes.js   (Routes define API endpoints and map them to their respective vehicle controllers.)
├── utils/
│   ├── cache.js            (cached function defined)
│   ├── updateChildOrgPolicies.js  ( override and inheritance policies of organisation defined)
├── .env                    ( keep configuration data out of your codebase, improving security)
├── app.js                  (The main app configuration, loading the environment, routes, and database connection.)
├── server.js               (Starts the server on the specified port.)
├── package.json
├── package-lock.json
├──DocumentationDetails.pdf

```

# API Endpoints
## GET /vehicles/decode/
- **Description**: Decodes a vehicle’s VIN (Vehicle Identification Number) using NHTSA’s DecodeVin API and returns vehicle details such as manufacturer, model, year of release, and horsepower.
   - **Parameters**:
        - vin (string): The 17-character VIN of the vehicle to decode.
        - **Response**:
           - **200 OK**: Returns the decoded vehicle details.
           - **429 Too Many Requests**: If more than 5 NHTSA calls are made in a minute.
             
**Example Request:**
```bash
GET /vehicles/decode/1HGCM82633A123456
```
**Example Response:**
```json
{
  "manufacturer": "Honda",
  "model": "Civic",
  "year": 2003,
  "horsepower": 150
}
```
## POST /vehicles
- **Description**: Adds a vehicle to the system and associates it with an organization. The VIN is decoded before storing the vehicle.
  
**Request Body:**
```json
{
  "vin": "xxxxxxxxxxxxxxxxx",
  "org": "org_id"
}
```
- **Validations:**
    - **vin**: Should be a valid 17-digit alphanumeric string.
    - **org**: Must be an existing organization in the system.
- **Response:**
    - **201 Created:** The vehicle was successfully created.
    - **400 Bad Request:** Invalid VIN or organization ID.
      
**Example Request:**
```json
POST /vehicles
{
  "vin": "1HGCM82633A123456",
  "org": "org_1"
}
```
**Example Response:**

```json

{
  "vin": "1HGCM82633A123456",
  "org": "org_1",
  "manufacturer": "Honda",
  "model": "Civic",
  "year": 2003,
  "horsepower": 150
}
```
## GET /vehicles/
- **Description:** Fetches a vehicle by its VIN and returns its details.
    - **Parameters:**
       - **vin (string)**: The 17-character VIN of the vehicle.
    - **Response:**
        - **200 OK:** Returns the vehicle details.
        - **404 Not Found:** If the vehicle does not exist.
        - **400 Bad Request:** If the VIN is invalid.
## POST /Orgs
- **Description:** Creates a new organization with details such as name, account, website, and policies related to fuel reimbursement and speed limits.

**Request Body:**
```json
{
  "name": "Org1",
  "account": "acc1",
  "website": "www.org1.com",
  "fuelReimbursementPolicy": "policy1",
  "speedLimitPolicy": "policy2"
}
```
**Response:**
  - **201 Created:** The organization was successfully created.
  - **400 Bad Request:** Invalid request data.
## PATCH /orgs
- **Description:** Updates an existing organization's details, including policies for fuel reimbursement and speed limits.

**Request Body:**
```json
Copy code
{
  "account": "acc1",
  "website": "www.org1.com",
  "fuelReimbursementPolicy": "policy1",
  "speedLimitPolicy": "policy2"
}
```
**Response:**
    - **200 OK:** The organization was successfully updated.
    - **400 Bad Request:** Invalid request data.
    
## GET /orgs
- **Description:** Fetches a list of all organizations with their details, including inherited policies from parent organizations.

**Response:**
    - **200 OK:** Returns the list of organizations.
    - **400 Bad Request:** If the request is invalid.
    
## Authentication

All endpoints require JWT authentication. You must provide a valid token in the Authorization header for protected routes.

**Example:**
```
bash

Authorization: Bearer <your_jwt_token>
```
## Rate Limiting
- **NHTSA API calls** are limited to 5 requests per minute.
- **Global API rate limiting:** All endpoints are rate-limited to prevent abuse.

## Caching
- *Memcached** is used to cache decoded VIN data to reduce unnecessary calls to the NHTSA API.
- Cached responses are stored for a TTL (Time-to-Live) of 1 minute.

## Running the Application
**Prerequisites:**
- Node.js v14 or above
- MongoDB (local or cloud instance)
- Memcached (optional, for caching)

**Steps:**
Clone the repository:
```
bash

git clone https://github.com/Debarjita/vehicle-management-system.git
cd vehicle-management-system
```
Install dependencies:
````
bash
npm install express mongoose jsonwebtoken axios memcached helmet express-rate-limit joi dotenv
````
Start the server:
```
bash
npm app.js
```
The API should be running at http://localhost:3000.
## License
This project is licensed under the MIT License. See the `LICENSE file` for details.

**Feel free to adapt the details as necessary! Let me know if you want further customization.**

