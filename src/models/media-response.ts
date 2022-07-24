import { MediaEdge } from './media-edge';

export interface MediaResponse {
  data: {
    user: {
      edgeownertotimelinemedia: {
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
