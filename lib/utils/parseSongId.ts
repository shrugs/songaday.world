interface AssetMetadataWithExternalLink {
  name: string;
}

const ID_REGEX = /Song A Day #(\d+)/i;

export function parseSongId(asset: AssetMetadataWithExternalLink): number {
  const matches = asset.name.match(ID_REGEX);
  if (!matches.length) throw new Error(`Could not parse song id from ${JSON.stringify(asset)}`);

  return parseInt(matches[1]);
}
