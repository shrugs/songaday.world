import { BoxProps, chakra } from '@chakra-ui/react';

const toURLBool = (val: boolean) => (val ? '1' : undefined);

const IFrame = chakra('iframe');

function YoutubeEmbed({
  id,
  autoPlay = false,
  ...delegated
}: BoxProps & { id: string; autoPlay?: boolean }) {
  return (
    <IFrame
      src={`https://www.youtube-nocookie.com/embed/${id}?${new URLSearchParams({
        loop: toURLBool(true),
        autoplay: toURLBool(autoPlay),
        muted: toURLBool(autoPlay),
        api: '0',
        modestbranding: '1',
        rel: '0',
        dnt: '1',
        disablekb: '1',
        enablejsapi: '0',
        playsinline: '1',
        feature: 'oembed',
      })}`}
      frameBorder="0"
      allow="vr; xr; accelerometer; autoplay; magnetometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...{ allowvr: 'yes', mozallowfullscreen: 'true', webkitallowfullscreen: 'true' }}
      {...delegated}
    />
  );
}

export default YoutubeEmbed;
