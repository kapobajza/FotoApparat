export interface ImageRatingModalParamsType {
  uri: string | undefined;
  onImageUpload(base64Uri: string, rating: number): Promise<void>;
  base64Image: string;
}
