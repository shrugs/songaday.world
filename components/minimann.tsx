import React from 'react';

// expects parent to provide sizing
// renders a minimann, given their configuration
// TODO: arguments—id or full config?
export default function MiniMann() {
  const locationUri = '/images/location_vermont.png';
  const topicUri = '/images/topic_kids.png';
  const moodUri = '/images/mood_angry.png';
  const beardUri = '/images/beard_beard.png';
  const instrumentUri = '/images/instrument_organ.png';

  return (
    <>
      <div className="container">
        <div className="image location"></div>
        <div className="image topic"></div>
        <div className="image mood"></div>
        <div className="image beard"></div>
        <div className="image instrument"></div>
      </div>

      <style jsx>{`
        .container {
          position: relative;
          // height: 100%;
          width: 100%;
          padding-bottom: 56%;
        }

        .image {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;

          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        .location {
          background-image: url(${locationUri});
        }
        .topic {
          background-image: url(${topicUri});
        }
        .mood {
          background-image: url(${moodUri});
        }
        .beard {
          background-image: url(${beardUri});
        }
        .instrument {
          background-image: url(${instrumentUri});
        }
      `}</style>
    </>
  );
}
