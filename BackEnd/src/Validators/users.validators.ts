import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().min(2).optional(),
    specialization_area: joi.string().min(3).required()
})