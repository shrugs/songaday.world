import React, { useMemo } from 'react';

function YoutubeEmbed({ id }: { id: string }) {
  const url = useMemo(
    () => `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0&showinfo=0`,
    [id],
  );

  return (
    <div className="relative overflow-hidden aspect-16/9">
      <iframe
        className="absolute w-full h-full top-0 left-0 "
        src={url}
        allow="encrypted-media"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default YoutubeEmbed;
