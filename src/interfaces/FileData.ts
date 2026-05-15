export interface FileData {
  id: string;
  fileName: string;
  content: string;
  fileType: "Draw" | "Text";
  createDate: Date;
  lastUpdatedDate: Date;
}