import { Timestamp } from 'mongodb';

export interface BaseImageStoragePayload {
  typename: 'GraphImage' | 'GraphVideo' | 'GraphStory' | 'GraphSidecar';
  id: string;
  dimensions: {
    height: number;
    width: number;
  };
  display_url: string;
  display_resources: {
    src: string;
    config_width: number;
    config_height: number;
  }[];
  is_video: boolean;
  edge_media_to_caption: {
    edges: [
      {
        node: {
          text: string;
        };
      },
    ];
  };
  taken_at_timestamp: number;
}

export interface ImageStoragePayload extends BaseImageStoragePayload {
  _id: string;
  ts: Timestamp;
}
