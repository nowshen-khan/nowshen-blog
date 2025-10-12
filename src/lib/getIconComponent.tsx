import * as LucideIcons from "lucide-react";
import React from "react";

export const getIconComponent = (
	iconName: string,
	props?: any
): React.ReactNode => {
	const Icon = (LucideIcons as any)[iconName];
	if (!Icon) return null; // fallback
	return <Icon {...props} />;
};
