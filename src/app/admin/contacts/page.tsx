"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
	Mail,
	CheckCircle,
	Circle,
	Reply,
	Archive,
	Loader2,
} from "lucide-react";

interface Contact {
	_id: string;
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
	status: "new" | "read" | "replied" | "closed";
	createdAt: string;
}

export default function AdminContactsPage() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loadingId, setLoadingId] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	// 🟢 Fetch all contacts
	const fetchContacts = async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/contacts");
			const data = await res.json();
			setContacts(data.data || data.contacts || []);
		} catch (err) {
			console.error("Failed to fetch contacts:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	// 🟢 Update contact status
	const updateStatus = async (id: string, status: Contact["status"]) => {
		try {
			setLoadingId(id);
			const res = await fetch(`/api/contacts/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status }),
			});
			const data = await res.json();

			if (data.success) {
				setContacts((prev) =>
					prev.map((c) => (c._id === id ? { ...c, status } : c))
				);
				toast.success(`Marked as ${status}`);
			} else {
				toast.error(data.error || "Failed to update status");
			}
		} catch (err) {
			console.error("Failed to update status:", err);
			toast.error("Something went wrong!");
		} finally {
			setLoadingId(null);
		}
	};

	// 🟢 Badge color
	const getBadgeColor = (status: Contact["status"]) => {
		const map = {
			new: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
			read: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			replied:
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
		};
		return map[status];
	};

	// 🟢 Loading state
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
				<Loader2 className="h-6 w-6 animate-spin mb-2" />
				<p>Loading contacts...</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold mb-6">Contact Management</h1>

			<div className="space-y-4">
				{contacts.map((contact) => (
					<div
						key={contact._id}
						className="p-4 border rounded-lg bg-card shadow-sm flex flex-col md:flex-row justify-between gap-4"
					>
						{/* Contact info */}
						<div className="space-y-1 flex-1">
							<h3 className="font-semibold text-lg">{contact.name}</h3>
							<p className="text-sm text-muted-foreground">{contact.email}</p>
							<p className="text-sm font-medium">{contact.subject}</p>
							<p className="text-sm text-muted-foreground mt-2 line-clamp-2">
								{contact.message}
							</p>
							<p className="text-xs text-gray-500 mt-2">
								{new Date(contact.createdAt).toLocaleString()}
							</p>
						</div>

						{/* Actions */}
						<div className="flex flex-col items-end gap-2 w-[160px] shrink-0">
							<Badge className={getBadgeColor(contact.status)}>
								{contact.status.toUpperCase()}
							</Badge>

							{loadingId === contact._id ? (
								<Button
									disabled
									variant="outline"
									className="flex items-center"
								>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Updating...
								</Button>
							) : (
								<>
									{contact.status !== "read" && (
										<Button
											size="sm"
											variant="outline"
											onClick={() => updateStatus(contact._id, "read")}
											className="flex items-center gap-2"
										>
											<CheckCircle size={16} /> Mark as Read
										</Button>
									)}

									{contact.status !== "new" && (
										<Button
											size="sm"
											variant="outline"
											onClick={() => updateStatus(contact._id, "new")}
											className="flex items-center gap-2"
										>
											<Circle size={16} /> Mark as Unread
										</Button>
									)}

									{contact.status !== "replied" && (
										<Button
											size="sm"
											variant="outline"
											onClick={() => updateStatus(contact._id, "replied")}
											className="flex items-center gap-2"
										>
											<Reply size={16} /> Mark as Replied
										</Button>
									)}

									{contact.status !== "closed" && (
										<Button
											size="sm"
											variant="outline"
											onClick={() => updateStatus(contact._id, "closed")}
											className="flex items-center gap-2"
										>
											<Archive size={16} /> Mark as Closed
										</Button>
									)}
								</>
							)}
						</div>
					</div>
				))}

				{/* Empty state */}
				{contacts.length === 0 && (
					<div className="text-center text-muted-foreground py-20">
						<Mail className="h-12 w-12 mx-auto mb-4" />
						No contacts found.
					</div>
				)}
			</div>
		</div>
	);
}
