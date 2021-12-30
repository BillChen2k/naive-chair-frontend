
export function parseConference(responseData: any): IConference {
  return {
    conferenceId: responseData.conferenceid,
    fullName: responseData.full_name,
    shortName: responseData.short_name,
    location: responseData.location,
    dueDate: responseData.due_date,
    introduction: responseData.introduction,
  };
}

export function parseConferences(responseData: any[]) : IConference[] {
  return responseData.map(parseConference);
}

interface IConference {
  conferenceId: number,
  dueDate: string,
  fullName: string,
  introduction: string,
  location: string,
  shortName: string,
}

export default IConference;
