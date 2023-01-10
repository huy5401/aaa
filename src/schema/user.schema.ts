import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required'
        }),
        password: string({
            required_error: 'Password id required',
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: 'password confirm is required'
        }),
    }).refine((data) => data.password == data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;