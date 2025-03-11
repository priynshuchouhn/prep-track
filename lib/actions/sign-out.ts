'use server';

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signOutUser(){
    await signOut();
    return redirect('/');
}