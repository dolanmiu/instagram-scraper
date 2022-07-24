export interface MediaEdge {
  node: {
    typename: 'GraphImage' | 'GraphVideo' | 'GraphStory' | 'GraphSidecar';
    id: string;
    dimensions: {
      height: number;
      width: number;
    };
    displayurl: string;
    displayresources: {
      src: string;
      configwidth: number;
      configheight: number;
    }[];
    isvideo: boolean;
    edgemediatocaption: {
      edges: [
        {
          node: {
            text: string;
          };
        },
      ];
    };
  };
}
