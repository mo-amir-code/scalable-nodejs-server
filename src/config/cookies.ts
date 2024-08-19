import { CookieOptions } from "express"
import { COOKIE_AGE_2_DAY, COOKIE_AGE_8_DAY } from "../utils/constants.js"
import { ROOT_DOMAIN } from "./index.js"



const accessCookieOptions: CookieOptions = {
    maxAge: COOKIE_AGE_2_DAY, 
    domain: ROOT_DOMAIN,
    secure: true,
    httpOnly: true,
    sameSite: "none"
}


const refreshCookieOptions: CookieOptions = {
    maxAge: COOKIE_AGE_8_DAY, 
    domain: ROOT_DOMAIN,
    secure: true,
    httpOnly: true,
    sameSite: "none"
}


export {
    accessCookieOptions,
    refreshCookieOptions
}