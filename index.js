import express from 'express';
import postRoutes from './src/routes/post_routes.js';  
import commentRoutes from './src/routes/comments_routes.js';

const app = express();
const port = 3000;

app.use(express.json());

//post routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})