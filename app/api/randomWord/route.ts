import wordList from "../../../data/wordList.json";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function GET()
{
    const token = cookies().get("paeruxToken")?.value;
    if (!token)
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try
    {
        const id = await verify(token, process.env.JWT_SECRET || "");
        console.log("id", id);
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const randomWord = wordList[randomIndex];

        return NextResponse.json({ word: randomWord });
    }
    catch (error)
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}



