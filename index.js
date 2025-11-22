import dotenv from 'dotenv';
dotenv.config();

// for the security and middlewares
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// import routes
import express from 'express';
import postRoutes from './src/routes/post_routes.js'; 
import userRoutes from './src/routes/user_routes.js';
// import v2PostRoutes from './src/api/v2/routes/post_routes.js';
// import errorHandler from './src/middleware/errorHandle.js';
// import deprecationWarning from './src/middleware/deprecation.js';  
import commentRoutes from './src/routes/comments_routes.js';
import { testConnection } from './src/config/db.js'; // utilities for the database connection
import { errorHandler } from './src/middlewares/errorHandler_middleware.js'; // utilities for error handling
import authRoutes from './src/routes/auth_routes.js';
import photoRoutes from './src/routes/photo_routes.js';


const app = express();
const port = 3000;

//SECURITY MIDDLEWARES (helmet, cors, rate limiting)
//helps to secure the express
app.use(helmet());

// allow the frontend to access the API
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API Documentation',
            version: '1.0.0',
            description: 'A RESTful API for a blog platform with authentication, posts, comments, and photo uploads.',
            contact: {
                name: 'API Support',
                email: 'support@blogapi.com'
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js'], // Path of the route files with JSDoc comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//post routes
//app.use('/posts', postRoutes); 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentRoutes);
//app.use('/api/v2/posts', v2PostRoutes); 
app.use('/api/v1/photos', photoRoutes);

// health check route
app.get('/', (req, res) => {
    res.json({
        message: 'Blog API is running',
        version: '1.0.0',
        documentation: `http://localhost:${port}/api-docs`
    });
});

// prevent abuse by limiting requests for a single IP address
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(globalLimiter);
app.use(errorHandler); 

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    testConnection(); //test
})
