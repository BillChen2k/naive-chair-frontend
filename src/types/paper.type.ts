import IConference from '@/types/conference.type';
import IUser from '@/types/user.type';

export function parsePapers(paperListResponseData: any) {
  const papers: IPaper[] = [];
  for (const paper of paperListResponseData) {
    const researchers: any = JSON.parse(paper.paper_authors);
    const paperAuthors: IPaperResearcherInfo[] = researchers.data.map((one: any) => {
      return {
        researcherId: one.rs_id,
        notify: one.notify,
        corresponding: one.coressponding, // typo in the backend
        order: one.order,
      };
    });
    const onePaper: IPaper = {
      paperId: paper.paperid,
      title: paper.title,
      score: paper.score,
      opinion: paper.opinion,
      conferenceId: paper.conferenceid,
      abstract: paper.abstract,
      paperResearchers: paperAuthors,
      researcherDetails: undefined,
    };
    papers.push(onePaper);
  }
  return papers;
}

export interface IPaperResearcherInfo {
  researcherId: number;
  notify: boolean;
  corresponding: boolean;
  order: number;
}

export interface IResearcher {
  researcherId: number;
  realname: string;
  email: string;
  affiliation: string;
  interest: string;
}

export interface IPaper {
  paperId: number;
  conferenceId: number;
  title: string;
  abstract: String;
  paperResearchers: IPaperResearcherInfo[];
  opinion: string;
  score: 10;
 // Foreign key data
  conferenceDetail?: IConference;
  researcherDetails?: IResearcher[];
  refereeDetails?: IUser[];
}
