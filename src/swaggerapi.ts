const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PlateUp Backend API",
            version: "1.0.0",
            description: "API documentation for the PlateUp backend task."
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        tags: [
            {
                name: "Authentication",
                description: "Endpoints related to user authentication"
            },
            {
                name: "Speakers",
                description: "Endpoints related to speaker profiles and interactions"
            },
            {
                name: "Booking",
                description: "Endpoints related to session bookings"
            }
        ],
        paths: {
            "/api/auth/register": {
                post: {
                    tags: ["Authentication"],
                    summary: "Sign Up",
                    description: "Register a new user by providing necessary details. An OTP will be sent to the provided email for verification, and userId will be returned. Note - userType can be either 'speaker' or 'user'.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        firstName: {
                                            type: "string",
                                            example: "Harsh"
                                        },
                                        lastName: {
                                            type: "string",
                                            example: "Gupta"
                                        },
                                        email: {
                                            type: "string",
                                            example: "guptaharsh940@gmail.com"
                                        },
                                        password: {
                                            type: "string",
                                            example: "pass@123"
                                        },
                                        userType: {
                                            type: "string",
                                            example: "user"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User successfully registered. OTP sent for email verification.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "User registered. Please verify your email with the OTP."
                                            },
                                            userId: {
                                                type: "integer",
                                                example: 6
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Email already in use.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Email already in use."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to register user.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to register user."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/auth/verify-otp": {
                post: {
                    tags: ["Authentication"],
                    summary: "Verify OTP",
                    description: "Verify the OTP sent to the user's email during registration using the userId received in the SignUp process.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type: "integer",
                                            example: 6
                                        },
                                        otp: {
                                            type: "integer",
                                            example: 954752
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Email verified successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Email verified successfully."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "User not found.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "User not found."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to verify OTP.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to verify OTP."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/auth/login": {
                post: {
                    tags: ["Authentication"],
                    summary: "Sign In",
                    description: "Login with the registered email and password. The user must have verified their email.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: {
                                            type: "string",
                                            example: "john.doe@gmail.com"
                                        },
                                        password: {
                                            type: "string",
                                            example: "pass@123"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Login successful. JWT token provided. Use this token for accessing protected APIs.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Login successful."
                                            },
                                            token: {
                                                type: "string",
                                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            description: "Invalid email or password.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Invalid email or password."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "403": {
                            description: "Email not verified.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Please verify your email before logging in."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to login user.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to login user."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/speakers/profile": {
                post: {
                    tags: ["Speakers"],
                    summary: "Create Speaker Profile",
                    description: "Allows a speaker to create their profile by providing expertise and price per session. Only users with the 'speaker' userType can create a profile.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        expertise: {
                                            type: "string",
                                            example: "tech"
                                        },
                                        pricePerSession: {
                                            type: "number",
                                            example: 100
                                        }
                                    }
                                }
                            }
                        }
                    },
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Speaker profile created successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Speaker profile created successfully."
                                            },
                                            speakerProfile: {
                                                type: "object",
                                                properties: {
                                                    id: {
                                                        type: "integer",
                                                        example: 1
                                                    },
                                                    userId: {
                                                        type: "integer",
                                                        example: 5
                                                    },
                                                    expertise: {
                                                        type: "string",
                                                        example: "tech"
                                                    },
                                                    pricePerSession: {
                                                        type: "number",
                                                        example: 100
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "403": {
                            description: "Only speakers can create profiles.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Only speakers can create profiles."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to create speaker profile.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to create speaker profile."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/speakers/": {
                get: {
                    tags: ["Speakers"],
                    summary: "Get All Speakers",
                    description: "Retrieves a list of all speaker profiles along with user details (ID, first name, last name, email).",
                    responses: {
                        "200": {
                            description: "List of all speaker profiles.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                userId: {
                                                    type: "integer",
                                                    example: 1
                                                },
                                                firstName: {
                                                    type: "string",
                                                    example: "Harsh"
                                                },
                                                lastName: {
                                                    type: "string",
                                                    example: "Gupta"
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "harshgupta@example.com"
                                                },
                                                expertise: {
                                                    type: "string",
                                                    example: "tech"
                                                },
                                                pricePerSession: {
                                                    type: "number",
                                                    example: 100
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to retrieve speakers.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to retrieve speakers."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/booking/": {
                post: {
                    tags: ["Booking"],
                    summary: "Book a Session",
                    description: "Allows a user to book a session with a speaker by specifying the speakerId and session date & time. The booking will be added to the user's calendar.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        speakerId: {
                                            type: "integer",
                                            example: 1
                                        },
                                        sessionTime: {
                                            type: "string",
                                            example: "2024-08-22T10:00:00Z"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Session booked successfully and added to the user's calendar.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Session booked successfully."
                                            },
                                            booking: {
                                                type: "object",
                                                properties: {
                                                    id: {
                                                        type: "integer",
                                                        example: 1
                                                    },
                                                    userId: {
                                                        type: "integer",
                                                        example: 1
                                                    },
                                                    speakerId: {
                                                        type: "integer",
                                                        example: 1
                                                    },
                                                    sessionTime: {
                                                        type: "string",
                                                        example: "2024-08-22T10:00:00Z"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Speaker not found.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Speaker not found."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Failed to book session.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Failed to book session."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

export default swaggerOptions;
// module.exports = swaggerOptions;
