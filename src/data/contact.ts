import { Mail, Phone, MapPin, Clock } from "lucide-react";

const seo = {
	title: "Contact Us - Nowshen Blog",
	description:
		"Get in touch with Nowshen Blog team for web development, design services, or any inquiries, support, or feedback. We're here to help bring your ideas to life.",
	keywords: [
		"Contact",
		"Nowshen Blog",
		"Support",
		"Inquiries",
		"Feedback",
		"contact",
		"web development",
		"design",
		"inquiry",
		"get in touch",
		"contact form",
		"customer support",
		"technical support",
	],
};

const contactInfo = [
	{
		icon: Mail,
		title: "Email Us",
		description: "Send us an email anytime",
		value: "contact@nowshen.com",
		link: "mailto:contact@nowshen.com",
	},
	{
		icon: Phone,
		title: "Call Us",
		description: "Mon to Fri from 9am to 6pm",
		value: "+88 (013) 1043-3970",
		link: "tel:+8801310433970",
	},
	{
		icon: MapPin,
		title: "Visit Us",
		description: "Come say hello at our office",
		value: "Gazipur, Dhaka, Bangladesh",
		link: "https://maps.google.com",
	},
	{
		icon: Clock,
		title: "Working Hours",
		description: "Our support team is available",
		value: "Mon - Fri: 9:00 - 18:00",
		link: "#",
	},
];

const socialLinks = [
	{ name: "GitHub", url: "https://github.com" },
	{ name: "LinkedIn", url: "https://linkedin.com" },
	{ name: "Twitter", url: "https://twitter.com" },
];

const faqs = [
	{
		question: "How long does a typical project take?",
		answer:
			"Project timelines vary based on complexity, but most websites take 4-8 weeks from start to finish.",
	},
	{
		question: "Do you provide ongoing support?",
		answer:
			"Yes, we offer various support packages to help maintain and update your website after launch.",
	},
	{
		question: "What technologies do you work with?",
		answer:
			"We specialize in modern technologies including Next.js, React, Node.js, MongoDB, and Tailwind CSS, WordPress, and more.",
	},
	{
		question: "Can you work with existing designs?",
		answer:
			"Absolutely! We can work with your existing designs or create new ones based on your requirements.",
	},
];

const services = [
	{ value: "", label: "Select a service" },
	{ value: "web-development", label: "Web Development" },
	{ value: "maintenance", label: "Maintenance & Support" },
	{ value: "consulting", label: "Consulting Services" },
	{ value: "other", label: "Other" },
];
export { seo, faqs, socialLinks, services };
export default contactInfo;
