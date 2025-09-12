import express from 'express';
import v1PostRoutes from './src/api/v1/routes/post_routes.js';
import errorHandler from './src/middleware/errorHandle.js';
import commentRoutes from './src/api/v1/routes/comments_routes.js';

const app = express();
const port = 3000;

app.use(express.json());

//post routes
app.use('/api/v1/posts', v1PostRoutes); 
app.use('/comments', commentRoutes);
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})