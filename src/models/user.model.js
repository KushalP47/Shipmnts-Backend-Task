import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"; // used to managed user-session
import bcrypt from "bcrypt"; // used to encrypt the password before storing it on db

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
		},
		userEmail: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		userPassword: {
			type: String,
			required: [true, "Password is required"],
		},
		userRole: {
			type: String,
			required: true,
			enum: ["student", "teacher"],
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true },
);

// validation runs before saving the data on the db
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.userPassword = await bcrypt.hash(this.userPassword, 10);
	next();
});

// Below implementations are some of the methods which will
// We have added some custom methods which will be called automatically whenever document will be updated

// method to check if given Password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.userPassword);
};

// method to generate Access Tokens
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			userName: this.userName,
			userEmail: this.userEmail,
			userRole: this.userRole,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		},
	);
};

// method to generate Refresh Tokens
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		},
	);
};

export const User = model("User", userSchema);
