// import prisma from 'prisma/prismaClient';

// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();

//   const location = await prisma.location.upsert({
//     where: { userId },
//     update: {
//       time: new Date(),
//       location: locationString,
//     },
//     create: { userId: userId, time: new Date(), location: locationString },
//   });

//   return location;
// }
