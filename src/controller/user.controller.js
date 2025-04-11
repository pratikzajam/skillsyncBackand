import { user } from '../model/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
dotenv.config()

export let signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body || {};

        if (!name || !email || !password | !confirmpassword) {
            return res.status(404).json({
                status: false,
                message: "All the fields are required",
                data: null
            })
        }

        // let isEmailExists = user.find({ email: email });

        // if (isEmailExists) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "Email allready exists in the system",
        //         data: null
        //     })
        // }

        let sanitedPassword = password.trim();
        let sanitedConfirmPassword = confirmpassword.trim();

        if (sanitedPassword != sanitedConfirmPassword) {
            return res.status(404).json({
                status: false,
                message: "password and confirm password does not match",
                data: null
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(sanitedPassword, salt);

        try {

            let UserData = await user.insertOne({
                name: name,
                email: email,
                password: hashedpassword
            })

            return res.status(200).json({
                status: true,
                message: "Signup up sucessfully",
                data: {
                    userId: UserData._id

                }
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                data: null
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }

}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: null
            });
        }


        const userDetails = await user.findOne({ email });
        if (!userDetails) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: null
            });
        }


        const isPasswordMatch = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: null
            });
        }


        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment");
        }


        const payload = {
            id: userDetails._id,
            email: userDetails.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: true,
            message: "Logged in successfully",
            data: {
                token
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
            data: null
        });
    }
};



export const addProfile = async (req, res) => {

    try {


        const { id } = req.params
        const { fullName, dateOfBirth, phoneNo, address, gender, skills, candidateType, yearOfExperience, githubLink, linkDinLink } = req.body || {};


        if (!fullName || !dateOfBirth || !phoneNo || !address || !gender || !skills || !candidateType || !yearOfExperience || !githubLink || !linkDinLink) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: null
            });
        }

        if (phoneNo.length != 10) {
            return res.status(400).json({
                status: false,
                message: "Mobile phone number must be exactly 10 digits long.",
                data: null
            });
        }


        const utcDate = new Date(Date.UTC(...dateOfBirth.split("-").map((v, i) => i === 1 ? +v - 1 : +v)));

        let sanitedDate = utcDate.toUTCString();

        const updateData = {
            fullName,
            dateOfBirth: sanitedDate,
            phoneNo,
            address,
            gender,
            skills,
            candidateType,
            yearOfExperience,
            githubLink,
            linkDinLink
        };

        const result = await user.updateOne(
            { _id: id },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: false,
                message: "Profile update failed or no changes made",
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            data: updateData
        });


    } catch (error) {
        return res.status(500).json({
            status: true,
            message: "Something went wrong",
            data: null
        });
    }



}


