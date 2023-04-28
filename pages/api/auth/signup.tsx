import { NextApiRequest, NextApiResponse } from "next"; 
import validator  from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'POST') {
        
        const {firstName, lastName, email, city, phone, password} = req.body;
        const errors: String[] = [];
        const validationSchema = [
            {
                valid: validator.isLength(firstName, {
                    min: 1,
                    max: 20
                }),
                errorMessage: 'First name is invalid'
            },
            {
                valid: validator.isLength(lastName, {
                    min: 1,
                    max: 20
                }),
                errorMessage: 'Last name is invalid'
            },
            {
                valid: validator.isEmail(email),
                errorMessage: 'Email is invalid'
            },
            {
                valid: validator.isLength(city, {min: 1}),
                errorMessage: 'City is invalid'
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: 'Phone is invalid'
            },
            {
                valid: validator.isLength(password, {
                    min: 1,
                    max: 20
                }),
                errorMessage: 'Password is not strong enough, add capitalization, numbers and symbols'
            }
        ];
        
        validationSchema.forEach((check) => {
            if(!check.valid) {
                errors.push(check.errorMessage)
            }
        })

        if(errors.length) {
            return res.status(400).json({errorMessage: errors[0]})
        }

        const userWithEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if(userWithEmail) {
            return res.status(400).json({errorMessage: "Email is asociated with another account"})
        }

        const hashedPassword = await bcrypt.hash(password, 10) 
         const user = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                city,
                phone,
                email
            }
        })
        // HS256 to create the header
        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        // Pass a unique identifier
        const token = await new jose.SignJWT({email: user.email})
        .setProtectedHeader({alg})
        .setExpirationTime("24h")
        .sign(secret)
        
        return res.status(200).json({
            token: token
        })
    }
    return res.status(404).json("Unkown endpoint")

}