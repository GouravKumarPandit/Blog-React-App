import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'

// Importing Pages
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					// We need authentication or not, true == YES and false = NO
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/all-posts",
				element: (
					// authentication === authentication={true}
					<AuthLayout authentication> 
						{" "}
						<AllPosts />
					</AuthLayout>
				),
			},
			{
				path: "/add-post",
				element: (
					<AuthLayout authentication>
						{" "}
						<AddPost />
					</AuthLayout>
				),
			},
			{
				// slug - Because we are using this name to get the slug from the URL in edit and view post page.
				path: "/edit-post/:slug",
				element: (
					<AuthLayout authentication>
						{" "}
						<EditPost />
					</AuthLayout>
				),
			},
			{
				// View Individual Post
				path: "/post/:slug",
				element: <Post />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
)
