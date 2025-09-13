import express from 'express';
import postRoutes from './src/routes/post_routes.js'; 
// import v2PostRoutes from './src/api/v2/routes/post_routes.js';
// import errorHandler from './src/middleware/errorHandle.js';
// import deprecationWarning from './src/middleware/deprecation.js';  
// import commentRoutes from './src/api/v1/routes/comments_routes.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());

//post routes
app.use('/posts', postRoutes); 
//app.use('/api/v2/posts', v2PostRoutes); 
// app.use('/comments', commentRoutes);
app.use(errorHandler); 

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); //test
})
