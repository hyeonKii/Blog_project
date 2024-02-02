import AuthContext from "context/AuthContext";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "firebaseApp";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

interface PostListProps {
    hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
    id?: string;
    email: string;
    title: string;
    summary: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    uid: string;
}

export default function PostList({hasNavigation = true}: PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [posts, setPosts] = useState<PostProps[]>([]);
    const {user} = useContext(AuthContext);

    const getPosts = async () => {
        const res = await getDocs(collection(db, "posts"));

        setPosts([]);

        res?.forEach((doc) => {
            const dataOject = {...doc.data(), id: doc.id};
            setPosts((prev) => [...prev, dataOject as PostProps]);
        });
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("해당 게시글을 삭제하시겠습니다?");
        if (confirm && id) {
            await deleteDoc(doc(db, "posts", id));
            toast.success("게시글을 삭제했습니다.");
            // 삭제 후 변경된 리스트 호출
            getPosts();
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {hasNavigation && (
                <div className="post__navigation">
                    <div
                        role="presentation"
                        onClick={() => setActiveTab("all")}
                        className={
                            activeTab === "all"
                                ? "post__navigation--active"
                                : ""
                        }
                    >
                        전체
                    </div>
                    <div
                        role="presentation"
                        onClick={() => setActiveTab("my")}
                        className={
                            activeTab === "my" ? "post__navigation--active" : ""
                        }
                    >
                        나의 글
                    </div>
                </div>
            )}
            <div className="post__list">
                {posts?.length > 0 ? (
                    posts?.map((post) => (
                        <div key={post?.id} className="post__box">
                            <Link to={`/posts/${post?.id}`}>
                                <div className="post__profile-box">
                                    <div className="post__profile" />
                                    <div className="post__author-name">
                                        {post?.email}
                                    </div>
                                    <div className="post__date">
                                        {post?.createdAt}
                                    </div>
                                </div>
                                <div className="post__title">{post?.title}</div>
                                <div className="post__text">
                                    {post?.summary}
                                </div>
                            </Link>
                            {post?.email === user?.email && (
                                <div className="post__utils-box">
                                    <div
                                        className="post__delete"
                                        role="presentation"
                                        onClick={() => handleDelete(post.id as string)}
                                    >
                                        삭제
                                    </div>
                                    <Link
                                        to={`/posts/edit/${post?.id}`}
                                        className="post__edit"
                                    >
                                        수정
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="post__no-post">게시글이 없습니다</div>
                )}
            </div>
        </>
    );
}
