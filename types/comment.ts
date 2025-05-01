export type Comment = {
    id: number;
    user: string;
    text: string;
    timestamp: string;
};

export type Comments = {
    [key: number]: Comment[]; 
};
  