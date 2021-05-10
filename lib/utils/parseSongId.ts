interface AssetMetadataWithExternalLink {
  name: string;
}

const ID_REGEX = /Song A Day #([\d\w]+)/i;

export function parseSongId(asset: AssetMetadataWithExternalLink): string {
  const matches = asset.name.match(ID_REGEX);
  if (!matches.length) throw new Error(`Could not parse song id from ${JSON.stringify(asset)}`);

  return matches[1];
}
