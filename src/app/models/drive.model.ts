export interface DriveFolder
{
  id: string,
  title: string,
  alternateLink: string
}

export interface DriveFile{
  id: string,
  title: string,
  alternateLink: string,
  thumbnailUrl: string
}

export interface Form{
  formUrl: string,
  responseUrl: string,
  title: string,
  thumbnailUrl: string
}

export interface SharedDriveFile{
  driveFile: DriveFile,
  shareMode: ShareMode
}

export enum ShareMode{
  UNKNOWN_SHARE_MODE,
  VIEW,
  EDIT,
  STUDENT_COPY
}
