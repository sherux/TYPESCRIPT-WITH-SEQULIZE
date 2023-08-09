import { ZodError, z } from "zod";
const mimeTypes = require('mime-types');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;


export const userSchema = z.object({
    name: z.string().nonempty("Name is required").min(4, { message: 'Name must have a minimum length of 4 characters' }),
    email: z.string().email('Invalid email address'),
    password: z.string().refine((password) => {
        return passwordRegex.test(password);
    }, {
        message: "Password must contain at least 1 alphabet, 1 special character, and be at least 6 characters long.",
    }),
    mobile_no: z.string().min(6, { message: 'Mobile number must have a minimum length of 6 characters' }).max(15, { message: 'Mobile number must have a maximum length of 15 characters' }),
    city: z.string().min(2, { message: 'City must have a minimum length of 2 characters' }),
    // image: z.string().url().refine((profile) => {
    //     const mimeType = mimeTypes.lookup(profile);
    //     return mimeType === 'image/jpeg' || mimeType === 'image/png';
    // }, {
    //     message: 'Invalid image URL: Only JPG/PNG files are supported',
    // }),
    // image: z.string().url(),
    role_id: z.string().nonempty('Role ID is required'),
    token: z.string().optional(),
});





import { Response } from 'express';

export function handleZodValidationError(zodError: ZodError<any>, res: Response) {
    const errors: Record<string, string> = {};

    for (const error of zodError.errors) {
        const { path, message } = error;
        const key = path.join('.');
        errors[key] = message;
    }

    return res.status(422).json({
        status: 422,
        message: 'Please validate your inserted data',
        fields: errors,
    });
}
