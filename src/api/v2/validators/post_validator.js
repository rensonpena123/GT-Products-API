import { body } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement', 'scam', 'fake'];

export const createPostRules = [
    body('title')
        .trim() 
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.')
        .custom((value) => {
            const containsForbiddenWord = forbiddenWords.some(word => 
                value.includes(word)
            );
            if (containsForbiddenWord) {
                throw new Error('Title contains forbidden words.');
            }
            return true;
        })
        .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters.'),
    body('body')  
        .trim()
        .notEmpty().withMessage('Body is required.')
        .isString().withMessage('Body must be a string.'),
    body('author')  
        .optional()
        .trim()
        .isString().withMessage('Author must be a string.')
        .isLength({ min: 1, max: 50 }).withMessage('Author must be between 1 and 50 characters.')
        
];

export const updatePostRules = [
    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters.')
        .custom((value) => {
            const containsForbiddenWord = forbiddenWords.some(word => 
                value.includes(word)
            );
            if (containsForbiddenWord) {
                throw new Error('Title contains forbidden words.');
            }
            return true;
        }),
    body('body')  
        .optional()
        .trim()
        .notEmpty().withMessage('Body cannot be empty.')
        .isString().withMessage('Body must be a string.')
];