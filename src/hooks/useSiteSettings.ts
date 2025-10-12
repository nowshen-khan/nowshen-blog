// hooks/useSiteSettings.ts
"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSiteSettings() {
	const { data, error, isLoading, mutate } = useSWR(
		"/api/site-settings",
		fetcher
	);

	return {
		settings: data,
		isLoading,
		isError: error,
		refresh: mutate,
	};
}

// import { useState, useEffect } from "react";

// export function useSiteSettings() {
// 	const [settings, setSettings] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		fetchSiteSettings();
// 	}, []);

// 	const fetchSiteSettings = async () => {
// 		try {
// 			const response = await fetch("/api/site-settings");
// 			const data = await response.json();
// 			setSettings(data);
// 		} catch (err) {
// 			setError(err.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const updateSettings = async (newSettings: any) => {
// 		try {
// 			const response = await fetch("/api/site-settings", {
// 				method: "PUT",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify(newSettings),
// 			});
// 			const data = await response.json();
// 			setSettings(data);
// 			return data;
// 		} catch (err) {
// 			setError(err.message);
// 			throw err;
// 		}
// 	};

// 	return {
// 		settings,
// 		loading,
// 		error,
// 		updateSettings,
// 		refetch: fetchSiteSettings,
// 	};
// }
