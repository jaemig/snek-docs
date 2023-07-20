import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TPostListData, TPostPreview } from "../../types/features/post";
import { debounce } from "../search";
import { TDebounceData } from "../../types/comm";

//TODO: This would come from an API
const posts: TPostPreview[] = [
    {
        id: '1',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '2',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '3',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '4',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        hasLiked: true,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '5',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 500,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    //....
    {
        id: '1',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
        canManage: true
    },
    {
        id: '2',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '3',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '4',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        hasLiked: true,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '5',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 500,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '1',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '2',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '3',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '4',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 1423,
        hasLiked: true,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
        id: '5',
        publicationDate: '2023-16-15',
        author: 'Emily Brooks',
        title: 'Unlocking the Power of Quantum Computing',
        summary:
            'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
        likes: 500,
        url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    }
];

//TODO: Extend this function so that the results can be filtered, sorted, etc.
/**
 * Search posts with a debounce
 * @param e  The event object
 * @param data  The debounce data
 * @param setPosts  The state setter for posts
 */
export function searchPosts(e: ChangeEvent<HTMLInputElement>, data: TDebounceData, setPosts: Dispatch<SetStateAction<TPostListData>>): void {
    const query = e.target.value.trim();

    debounce(() => {
        if (!query.length) {
            setPosts({ state: 'inactive', posts: [] });
            data = { state: 'inactive' };
        } else {
            setPosts({ state: 'loading', posts: [] });
            data = { state: 'loading' };
            // Simulate loading posts from an API
            setTimeout(() => {
                if (data.state === 'inactive') return;
                setPosts({
                    state: 'success',
                    posts: posts,
                });
            }, 3000);
        }
    }, data)();
}