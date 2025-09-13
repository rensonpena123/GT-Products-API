import express from 'express';
import dotenv from 'dotenv';
import v1PostRoutes from './src/api/v1/routes/post_routes.js';
import v2PostRoutes from './src/api/v2/routes/post_routes.js';
import errorHandler from './src/middleware/errorHandle.js';
import deprecationWarning from './src/middleware/deprecation.js';  
import commentRoutes from './src/api/v1/routes/comments_routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//post routes
app.use('/api/v1/posts',deprecationWarning, v1PostRoutes); 
app.use('/api/v2/posts', v2PostRoutes); 
app.use('/comments', commentRoutes);
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})