import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type StoryType } from "../../types/story"
import axios from 'axios';

function Story() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [stories, setStories] = useState<StoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Find index of current story based on id
    const currentIndex = stories.findIndex((s) => s.id === id);

    // Timer ref for auto-advance
    const timerRef = useRef<any>(null);

    // Fetch all stories once
    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get('/data/stories.json');
                setStories(res.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    // Auto view next story
    useEffect(() => {
        if (stories.length === 0 || currentIndex === -1) return;

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            // Navigate to next story or loop back to first
            const nextIndex = (currentIndex + 1) % stories.length;
            navigate(`/stories/${stories[nextIndex].id}`);
        }, 5000);

        return () => clearTimeout(timerRef.current);
    }, [currentIndex, stories, navigate]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading story...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{ error }</div>;
    if (currentIndex === -1) return <div className="text-center mt-10">Story not found</div>;

    const story = stories[currentIndex];

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX } = e;
        const width = window.innerWidth;

        clearTimeout(timerRef.current);

        if (clientX < width / 2) {
            // Previous story
            const prevIndex = currentIndex === 0 ? stories.length - 1 : currentIndex - 1;
            navigate(`/stories/${stories[prevIndex].id}`);
        } else {
            // Next story
            const nextIndex = (currentIndex + 1) % stories.length;
            navigate(`/stories/${stories[nextIndex].id}`);
        }
    };

    return (
        <div
            className={ `w-full h-screen bg-black flex items-center justify-center relative` }
            onClick={ handleClick }
            style={ { userSelect: 'none', cursor: 'pointer' } }
        >
            { story.type === 'image' ? (
                <img
                    src={ `/stories/${story.file}` }
                    alt={ `Story by ${story.user}` }
                    className={`max-h-full max-w-full object-contain transition-opacity duration-500`}
                    draggable={ false }
                />
            ) : (
                <video
                    src={ `/stories/${story.file}` }
                    autoPlay
                    className={`max-h-full max-w-full object-contain transition-opacity duration-500`}
                    muted
                    playsInline
                    draggable={ false }
                />
            ) }

            <div className="absolute top-5 left-5 flex items-center space-x-3 text-white">
                <img
                    src={ story.profilePic }
                    alt={ story.user }
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
                    draggable={ false }
                />
                <span className="font-semibold">{ story.user }</span>
            </div>
        </div>
    );
}

export default Story;