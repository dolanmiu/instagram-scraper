import { MediaEdge } from './media-edge';

export interface MediaResponse {
  data: {
    user: {
      edge_owner_to_timeline_media: {
        count: number;
        pageinfo: {
          hasnextpage: boolean;
          endcursor: string;
        };
        edges: MediaEdge[];
      };
    };
  };
  status: string;
}
