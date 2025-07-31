import App from "@/App";
import MainLayout from "@/components/layouts/MainLayout";
import PaymentsManager from "@/components/Payments/PaymentsMeneger";

import AboutPostsPage from "@/pages/posts/AboutPostsPage";
import HomePostsPage from "@/pages/posts/HomePostsPage";
import MainPosts from "@/pages/posts/MainPosts";
import PostFormPage from "@/pages/posts/PostFormPage";

import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";

export const routers = [
  {
    Component: MainLayout,
    path: "/",
    children: [
      {
        Component: PaymentsManager,
        path: "manager",
        handler: {
          title: "managerMoney",
        },
      },
      {
        Component: MainPosts,
        path: "posts",
        handler: {
          title: "Posts + Pagination",
        },
        children: [
          {
            Component: HomePostsPage,
            // index: true,
            path: "",
            handler: {
              title: "Posts",
            },
          },
          {
            Component: AboutPostsPage,
            path: "about",
            handler: {
              title: "About",
            },
          },
          {
            Component: PostFormPage,
            path: "form",
            handler: {
              title: "Post Form",
            },
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routers);
export default router;
