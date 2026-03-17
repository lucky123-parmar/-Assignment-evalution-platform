
# API Routing Documentation – Assignment Evaluator

**Base URL:** `http://localhost:<PORT>/api`

---

## User Routes (`/users`)

| Method | Endpoint    | Description                              | Access                  |
| ------ | ----------- | ---------------------------------------- | ----------------------- |
| POST   | `/register` | Register a new user (student or teacher) | Public                  |
| POST   | `/login`    | Login and receive auth token             | Public                  |
| GET    | `/me`       | Get logged-in user's profile             | Private                 |
| GET    | `/:id`      | Get user by ID                           | Private (Admin/Teacher) |
| GET    | `/students` | Get all students                         | Private (Teacher/Admin) |
| GET    | `/teachers` | Get all teachers                         | Private (Admin)         |
| PATCH  | `/:id`      | Update user profile                      | Private                 |
| DELETE | `/:id`      | Delete user                              | Private (Admin)         |

---

## Assignment Routes (`/assignments`)

| Method | Endpoint              | Description                | Access        |
| ------ | --------------------- | -------------------------- | ------------- |
| POST   | `/create`             | Create a new assignment    | Teacher       |
| GET    | `/`                   | Get all assignments        | Authenticated |
| GET    | `/:id`                | Get assignment by ID       | Authenticated |
| GET    | `/teacher/:teacherId` | Get assignments by teacher | Teacher       |
| PATCH  | `/:id`                | Update assignment          | Teacher       |
| DELETE | `/:id`                | Delete assignment          | Teacher       |

---

## Submission Routes (`/submissions`)

| Method | Endpoint                    | Description                           | Access        |
| ------ | --------------------------- | ------------------------------------- | ------------- |
| POST   | `/submit`                   | Submit an assignment                  | Student       |
| GET    | `/`                         | Get all submissions                   | Teacher/Admin |
| GET    | `/:id`                      | Get submission by ID                  | Authenticated |
| GET    | `/assignment/:assignmentId` | Get all submissions for an assignment | Teacher       |
| GET    | `/student/:studentId`       | Get all submissions by a student      | Authenticated |
| PATCH  | `/:id`                      | Update submission (repo/comment)      | Student       |
| DELETE | `/:id`                      | Delete submission                     | Student       |

---

## Evaluation Routes (`/evaluations`)

| Method | Endpoint                    | Description                              | Access          |
| ------ | --------------------------- | ---------------------------------------- | --------------- |
| POST   | `/evaluate`                 | Evaluate a submission (by teacher or AI) | Teacher/AI      |
| GET    | `/`                         | Get all evaluations                      | Teacher/Admin   |
| GET    | `/:id`                      | Get evaluation by ID                     | Authenticated   |
| GET    | `/submission/:submissionId` | Get evaluations by submission            | Authenticated   |
| GET    | `/student/:studentId`       | Get all evaluations for a student        | Teacher/Student |
| PATCH  | `/:id`                      | Update feedback or score                 | Teacher         |
| DELETE | `/:id`                      | Delete evaluation                        | Admin           |

---

## Utility & Auth Routes (`/auth`)

| Method | Endpoint        | Description                      | Access  |
| ------ | --------------- | -------------------------------- | ------- |
| POST   | `/verify-token` | Verify and decode user JWT token | Private |
| GET    | `/whoami`       | Get role and ID of current user  | Private |

---

## Folder Structure Recommendation (Optional but Ideal)

```
project-root/
├── controllers/
│   ├── userController.js
│   ├── assignmentController.js
│   ├── submissionController.js
│   └── evaluationController.js
├── routes/
│   ├── userRoutes.js
│   ├── assignmentRoutes.js
│   ├── submissionRoutes.js
│   └── evaluationRoutes.js
├── Schema/
│   ├── user.js
│   ├── assignment.js
│   ├── submission.js
│   └── evaluation.js
├── middleware/
│   └── auth.js
├── config/
│   └── db.js
├── server.js
└── .env
```

---

## Middleware Suggestions

* `auth.js`: Token verification, role-based access
* `validate.js`: Input validation middleware
* `errorHandler.js`: Centralized error response

