import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // Adjust this path based on your folder structure

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;