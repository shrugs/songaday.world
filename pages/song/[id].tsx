import { Page } from '../../components/Page';

// export const getServerSideProps: GetServerSideProps<
//   ComponentPropsWithoutRef<typeof Page>
// > = async (ctx) => {
//   // fetch
//   const song = getSong(parseInt(ctx.params.number as string));

//   if (!song) return { notFound: true };

//   return { props: { initialData: song } };
// };

export default Page;
