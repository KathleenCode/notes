import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './pages/RootLayout';
import PostList, { postLoader } from './pages/PostList';
import NewPost, { newPostAction } from './pages/NewPost';
import PostsErrorPage from './pages/PostsErrorPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        // index: true,
        element: <PostList />,
        loader: postLoader,
        errorElement: <PostsErrorPage/>,
        children: [
          {
            path: 'create-post',
            element: <NewPost />,
            action: newPostAction
          },
        ],
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
