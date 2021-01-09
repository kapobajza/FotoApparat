export interface ImageRatingModalParamsType {
  uri: string | undefined;
  onImageUpload(base64Image: string, rating: number, uri: string): Promise<void>;
  base64Image: string;
}
