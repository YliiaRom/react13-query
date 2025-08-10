import App from "@/App";
import MainLayout from "@/components/layouts/MainLayout";
import PaymentsManager from "@/components/Payments/PaymentsMeneger";
import MiddlewarePage from "@/pages/MiddlewarePage";
import FixPlus from "@/pages/middlewares/components/FixPlus";
import PockemonMainPage from "@/pages/Pokemon/PokemonMainPage";

import AboutPostsPage from "@/pages/posts/AboutPostsPage";
import HomePostsPage from "@/pages/posts/HomePostsPage";
import MainPosts from "@/pages/posts/MainPosts";
import PostFormPage from "@/pages/posts/PostFormPage";
import PostsWithPlaceholder from "@/pages/posts/PostsWithPlaceholder";
import PostsPage from "@/pages/PostsMyApiPage/PostsPage";
import MainLayoutPosts from "@/pages/PostsMyApiPage/components/MainLayout/MainLayoutPosts";
import ContactsPage from "@/pages/PostsMyApiPage/ContactsPage";
import HomePage from "@/pages/PostsMyApiPage/HomePage";
import PostEditPage from "@/pages/PostsMyApiPage/PostEditPage";
import PostsInfinitePage from "@/pages/PostsMyApiPage/PostsInfinite";
import Tasks from "@/pages/Tasks";

import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";

export const routers = [
  {
    Component: MainLayout,
    path: "/",
    children: [
      {
        Component: MainLayoutPosts,
        path: "posts-my-api",
        handler: {
          title: "Додаток(Posts + MyAPI)",
        },
        children: [
          {
            Component: HomePage,
            path: "",
            handler: { title: "Головна" },
          },
          {
            Component: PostsPage,
            // index: true,
            path: "postss",
            handler: {
              title: "Пости",
            },
          },
          {
            Component: PostsInfinitePage,
            path: "posts-infinite",
            handler: { title: "Нескінченне завантаження" },
          },
          {
            Component: PostEditPage,
            path: "postss/edit/:id?",
            handler: { title: "Edit" },
          },
          {
            Component: ContactsPage,
            path: "contacts",
            handler: { title: "Контакти" },
          },
        ],
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
      {
        Component: PostsWithPlaceholder,
        path: "posts-with-jsonplaceholder",
        handler: {
          title: "Posts + JSONplaceholder (Query)",
        },
      },
      {
        Component: MiddlewarePage,
        path: "middleware",
        handler: {
          title: "Middlewares",
        },
        children: [
          {
            Component: FixPlus,
            index: true,
            handler: {
              title: "MDL Fixed Money to LS",
            },
          },
        ],
      },
      {
        Component: PockemonMainPage,
        path: "pokemons",
        handler: {
          title: "Pokemons (Query/Pagination)",
        },
      },
      {
        Component: PaymentsManager,
        path: "manager",
        handler: {
          title: "managerMoney",
        },
      },
      {
        Component: Tasks,
        path: "",
        handler: {
          title: "Questions",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routers);
export default router;
