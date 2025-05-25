import { useEffect, useState } from "react"
import StoryItem from "./StoryItem"
import axios from 'axios';
import { type StoryType } from "../../types/story"

function StoryList() {

    const [stories, setStories] = useState<StoryType[]>([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('/data/stories.json');
                setStories(response.data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        }

        fetchStories();
    }, [])

    return (
        <>
            <div className="w-full bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">Stories</h2>
                <ul className="flex gap-4 overflow-scroll hide-scrollbar">
                    { stories.map((story) => (
                        <StoryItem
                            key={ story.id }
                            id={ story.id }
                            user={ story.user }
                            profilePic={ story.profilePic }
                        />
                    )) }
                </ul>
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-xl font-bold mb-4">Select Story</h2>
                <p>Click on a story to view.</p>
            </div>
        </>
    )
}

export default StoryList