export interface ITrip{
    id:string;
    authorId:string;
    destination:string;
    startDate: Date;
    endDate: Date;
    private:boolean;
    places:string[];
    image:string;
}