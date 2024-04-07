import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest)
{
    const url = "https://discord.com/oauth2/authorize?client_id=1226232005667324025&response_type=code&redirect_uri=http%3A%2F%2Fhangman.paerux.com%2Fapi%2Fauth%2Fcallback&scope=identify+email";

    return NextResponse.redirect(url);
}