import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { fetchProfileDetails } from "@/service/profile";
import { Loader } from "@/components/Loader";
import { profilePageResponse } from "@/types/profileResponse.ts";
import { getUserRole } from "@/utils/getAccessToken";

export const Route = createFileRoute("/_layout/_user/profile/")({
	component: ProfileComponent,
});

function ProfileComponent() {
	const [profile, setProfile] = useState<profilePageResponse | null>(null);


	useEffect(() => {
		fetchProfileDetails().then((data) => setProfile(data));
		// console.log(profile);
	}, []);

	if (!profile) {
		return <Loader />;
	}

	return (
		<div className="w-full min-h-screen mt-[65px] bg-gray-400 px-4 py-6 flex justify-center items-center">
			<div className="max-w-4xl  mx-auto bg-white text-black rounded-lg shadow-md overflow-hidden">
				{/* Profile Header */}
				<div className="relative h-56 bg-gradient-to-r from-blue-500 to-blue-600">
					<div className="absolute w-full h-[100%] flex items-center justify-center mt-[60px]">
						<img
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="Profile"
							className="w-56 h-56 rounded-full border-4 border-white"
						/>
					</div>
				</div>

				{/* Profile Content */}
				<div className="pt-24 px-8 pb-8 flex-col justify-center items-center">
					<div className="flex justify-center items-center mb-6">
						<div>
							<div className="flex">
								<h1 className="text-3xl font-bold text-gray-900">
									{profile.firstName.charAt(0).toUpperCase() +
										profile.firstName.substring(1)}
								</h1>
								<span className="m-[5px]"> </span>
								<h1 className="text-3xl font-bold text-gray-900">
									{profile.lastName}
								</h1>
							</div>
							<p className="text-gray-600 font-bold">
								{getUserRole()}
							</p>
						</div>
					</div>

					{/* Profile Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-4">
							<div className="pl-[00px] flex items-center justify-center text-gray-600">
								<Mail size={20} />
								<span>{profile.email}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
