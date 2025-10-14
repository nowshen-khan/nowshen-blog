import { Schema, model, models } from "mongoose";

const NewsletterSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+\@.+\..+/, "Invalid email address"],
		},
	},
	{ timestamps: true }
);

export default models.Newsletter || model("Newsletter", NewsletterSchema);
