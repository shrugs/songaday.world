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
      <div className="minimann aspect">
        <div className="location"></div>
        <div className="topic"></div>
        <div className="mood"></div>
        <div className="beard"></div>
        <div className="instrument"></div>
      </div>

      <style jsx>{`
        .aspect {
          padding-bottom: 56%;
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
