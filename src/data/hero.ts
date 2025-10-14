import React from "react";

const hero = {
	startYear: 2024,
	welcomeText: "Welcome to My Digital Space",
	title: "Hi, I'm Nowshen",
	subtitle: "Web Developer & Blogger",
	description:
		"I write about web development, programming tips, and share my journey in tech...",
	expertise: ["JavaScript", "React", "Next.js", "TypeScript", "Node.js"],
	buttons: [
		{
			label: "Read My Blog",
			href: "/blog",
			order: 1,
		},
		{
			label: "My Journey",
			href: "/about",
			order: 2,
		},
	],
	stats: [
		{
			icon: "FileText",
			number: "5+",
			label: "Blogs Written",
		},
		{
			icon: "Briefcase",
			number: "1+",
			label: "Years Experience",
		},
		{
			icon: "Clock",
			number: "Weekly",
			label: "New Content",
		},
	],
};
export default hero;
