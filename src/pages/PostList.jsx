import { useEffect, useState } from 'react';
import Post from "./Post";
import { Outlet, useLoaderData } from "react-router-dom";

export default function PostList() {

    // const [posts, setPosts]= useState([]);
    // const [loading, setLoading] = useState([]);

    //  useEffect(() => {
    //     const getPosts = async() => {
    //         try {
    //             setLoading(true);
    //         const data = await fetch("  http://localhost:8000/posts");
    //         if(!data) throw Error("cannot fetch");
    //         const d = await data.json();
    //         setPosts(d);
    //     setLoading(false);
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     };
    //     getPosts();
    // }, [loading])

    const posts = useLoaderData();
    console.log(posts);

    useEffect(() => {
        console.log("this got called");
    })

    // useEffect(() => {
    //     const getPosts = async() => {
    //         const data = await fetch("  http://localhost:8000/posts");
    //         if(!data) throw Error("cannot fetch")
    //         setPosts(await data.json());
    //     };
    //     getPosts();
    // }, [])
    // const [posts, setPosts ] = useState([
    //     {
    //         id: 1,
    //         title: "first post",
    //         summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, mollitia quos."
    //     },
    //     {
    //         id: 2,
    //         title: "second post",
    //         summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, mollitia quos."
    //     },
    //     {
    //         id: 3,
    //         title: "third post",
    //         summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, mollitia quos."
    //     }
    // ])

  return (
    <>
    
    <div style={{display: "flex", flexWrap: "wrap", gap: "1rem"}}>
        {
            posts.length > 0? 
            (
                posts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))
            )
            :<p>Please add a new post</p>
        }
    </div>


    <Outlet />

    </>
  )
}

export async function postLoader() {
    const data = await fetch("http://localhost:8000/posts");
    if(!data.ok) throw Error("cannot fetch posts");
    return data.json();
}
