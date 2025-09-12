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
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.')
        .isString().withMessage('Content must be a string.')
];

export const updatePostRules = [
    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.'),
    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('Content cannot be empty.')
        .isString().withMessage('Content must be a string.')
];
