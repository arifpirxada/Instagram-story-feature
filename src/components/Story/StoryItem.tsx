import { Link } from "react-router-dom"

function StoryItem({ key, id, user = "Bob", profilePic = "https://flowbite.com/docs/images/people/profile-picture-1.jpg" }: {
    key: string;
    id: string;
    user: string;
    profilePic: string;
}) {
    return (
        <li>
            <Link to={`stories/${id}`} key={key} className="flex p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 items-center dark:hover:text-white">
                <div className="rounded-full bg-white p-[1px]">
                    <img className="w-16 h-16 min-w-16 m-[1px] border-black rounded-full" src={profilePic} alt="Jese image" />
                </div>
            </Link>
            <p className="text-base text-gray-900 text-center mt-[2px]">{user}</p>
        </li>
    )
}

export default StoryItem