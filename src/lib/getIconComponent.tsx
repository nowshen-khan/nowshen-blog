import * as LucideIcons from "lucide-react";
import React from "react";

type IconName = keyof typeof LucideIcons;
type IconProps = React.ComponentProps<(typeof LucideIcons)[IconName]>;

export const getIconComponent = (
	iconName: IconName,
	props?: IconProps
): React.ReactNode => {
	const Icon = LucideIcons[iconName] as
		| React.ComponentType<IconProps>
		| undefined;
	if (!Icon) return null; // fallback
	return <Icon {...props} />;
};
