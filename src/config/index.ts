export * from "./env.vars.js";
export * from "./cookies.js";



// cors options
const whitelist = ["*"]

const corsOptions = {
    // origin: function (origin:any, callback:any) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //     } else {
    //       callback(new Error('You are very chalak bro.....'))
    //     }
    //   }, 
    origin: "*",
    credentials: true, // Allow cookies
};



const SALT_ROUND = 12;



export {
    corsOptions,
    SALT_ROUND
}