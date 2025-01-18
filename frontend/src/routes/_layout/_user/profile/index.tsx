import {createFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import {Mail} from "lucide-react";
import {fetchProfileDetails, findUserLocation} from "@/service/profile";
import {Loader} from "@/components/Loader";
import {profilePageResponse} from "@/types/profileResponse.ts";
import {getUserRole} from "@/utils/getAccessToken";

export const Route = createFileRoute("/_layout/_user/profile/")({
    component: ProfileComponent,
});

function ProfileComponent() {
    const [profile, setProfile] = useState<profilePageResponse | null>(null);
    // @ts-ignore
    const [country, setCountry] = useState<string | null>(null);

    useEffect(() => {
        // @ts-ignore
        fetchProfileDetails().then((data) => setProfile(data));
        // console.log(profile);
        getLocation();
    }, []);


    const getLocation = async () => {
        try {
            const country = await findUserLocation(); // Wait for the location to be fetched
            setCountry(country);
        } catch (error) {
            console.error(error);
        }
    };


    if (!profile) {
        return <Loader/>;
    }

    return (
        <div
            className="w-full min-h-screen mt-[65px] bg-gray-400 px-4 py-6 flex justify-center items-center">
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
                        <div className="flex flex-col italic justify-center">
                            <div className="flex items-center justify-center">
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
                            <p className="text-gray-600 font-bold">
                                {country}
                            </p>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="w-96">
                        <div className="flex items-center justify-center w-[100%] h-[100%] text-gray-600">
                            <Mail size={20}/>
                            <span className="pl-2"> {profile.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
