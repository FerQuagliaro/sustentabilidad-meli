export type Newslatter = {
  data: {
    id: number;
    attributes: NewslatterAttributes;
  };
};

export type NewslatterAttributes = {
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  nameInput: {
    id: number;
    label: string;
    errorMsg: string;
  };
  emailInput: {
    id: number;
    label: string;
    errorMsg: string;
  };
  selectInput: {
    id: number;
    label: string;
    errorMsg: string;
  };
  termsInput: {
    id: number;
    label: string;
    errorMsg: string;
  };
  selectOptions: { id: number; value: string }[];
  success: NewslatterResult;
  error: NewslatterResult;
};

export type NewslatterResult = {
  title: string;
  excerpt: string;
};
