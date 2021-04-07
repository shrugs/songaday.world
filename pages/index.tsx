import { Page } from '../components/Page';

// export const getServerSideProps: GetServerSideProps<
//   ComponentPropsWithoutRef<typeof Page>
// > = async (ctx) => {
//   const filters = {
//     location: ctx.query.location as Location,
//     topic: ctx.query.topic as Topic,
//     mood: ctx.query.mood as Mood,
//     beard: ctx.query.beard as Beard,
//     instrument: ctx.query.instrument as Instrument,
//   };
//   const initialKey = makeKey(filters);
//   const initialData = findSongs(filters);

//   return { props: { initialKey, initialData } };
// };

export default Page;
