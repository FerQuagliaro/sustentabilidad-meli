export interface PublicationSection {
  data: {
    id: number;
    attributes: PublicationSectionAttributes;
  };
}

export interface PublicationSectionAttributes {
  title: string;
  description: string;
  btnText: string;
  publication: {
    data: {
      id: number;
      attributes: {
        title: string;
        file: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    };
  };
}
