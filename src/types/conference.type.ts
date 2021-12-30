
export function parseConference(responseData: any): IConference {
  return {
    conferenceId: responseData.conferenceid,
    fullName: responseData.full_name,
    shortName: responseData.short_name,
    location: responseData.location,
    dueDate: responseData.due_date,
    introduction: responseData.introduction,
    acceptNum: responseData.accept_num || 0,
  };
}

export function parseServerConference(conference: IConference) : any {
  return {
    conferenceid: conference.conferenceId,
    full_name: conference.fullName,
    short_name: conference.shortName,
    location: conference.location,
    due_date: conference.dueDate,
    introduction: conference.introduction,
    accept_num: conference.acceptNum || 0, // New field
  };
}

export function parseConferences(responseData: any[]) : IConference[] {
  return responseData.map(parseConference);
}


interface IConference {
  conferenceId?: number,
  dueDate: string,
  fullName: string,
  introduction: string,
  location: string,
  shortName: string,
  acceptNum? :number,
}

export default IConference;
