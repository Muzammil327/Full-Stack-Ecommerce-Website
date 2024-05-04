## Full Stack Ecommerce Website

- Prettier
- VScode
- Next JS
- Typescript
- Next Auth JS
- Sass / Tailwind CSS
- MongoDB
- Node JS
- Express JS
- cloudinary
- JWT
- Session and Cookie Based Token
- Axios
- Bcrypt
- Swiper
- Tabs

### Website Functionality
- User and Admin Role
- Pagination
- Sorthing
- Filtering through Catgeory, Price
- Responsive Design for Mobile Devices

### User Dashboard
- Add to Cart
- Add to Favorites
- Like and Dislike
- Place Orders
- Comment and Review Products

### Admin Dashboard
- Create and Manage Products (Edit, Delete)
- View Orders and Manage Order Status
- User Management (View, Edit, Delete)


import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const secret = process.env.JWT_SECRET;
//   const token = await getToken({
//     req: request,
//     secret: secret,
//     cookieName: "next-auth.session-token",
//   });
//   // role base authentication
//   if (token) {
//     const url = new URL(request.url);
//     const pathname = url.pathname;

//     if (pathname === "/create-account") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
//   } else {
//     // User is not authenticated
//     const url = new URL(request.url);
//     const pathname = url.pathname;

//     // Redirect non-authenticated users away from the profile page
//     if (pathname === "/profile" || pathname === "/admin") {
//       return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect to sign-in page
//     } else {
//       // Allow access to other pages for non-authenticated users
//       return NextResponse.next();
//     }
//   }
// }

// export const config = {
//   matcher: ["/", "/sign-in", "/create-account", "/profile", "/admin"],
// };
