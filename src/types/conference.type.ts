export function parseConferences(responseData: any[]) : IConference[] {
  return responseData.map((one): IConference => {
    return {
      conferenceId: one.conferenceid,
      fullName: one.full_name,
      shortName: one.short_name,
      location: one.location,
      dueDate: one.due_date,
      introduction: one.introduction,
    };
  });
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
