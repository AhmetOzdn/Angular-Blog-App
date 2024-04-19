export interface SubjectModel {
    categoryId:number,
    title:string,
    text:[string],
    summary:string,
    id:[string,number],
    createdDate:Date,
    updatedDate:Date,
    deletedDate:Date,
    categoryName:string,
    userId:number,
    firstName:string,
    lastName:string,
    subjectImageFileId:string,
    subjectImageFileName:string,
    subjectImageFileUrl:[string,number],
}

export class SubjectPostModel {
    constructor(public title:string, public  summary:string, public text:string,public  categoryId:number, ) {}
  } 