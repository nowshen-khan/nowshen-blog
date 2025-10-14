"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function scrollToNewsletter(
	pathname: string,
	router: AppRouterInstance
) {
	if (pathname === "/") {
		// Smooth scroll if already on homepage
		const section = document.getElementById("newsletter");
		section?.scrollIntoView({ behavior: "smooth" });
	} else {
		// Navigate to homepage and jump to newsletter
		router.push("/#newsletter");
	}
}
