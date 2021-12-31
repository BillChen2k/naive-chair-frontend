import IConference, {parseConference} from '@/types/conference.type';
import {IResearcher, parseResearcher} from '@/types/researcher.type';
import * as React from 'react';

export function paperStatus2Readable(status: IPaperStatus): string {
  const map = {
    'not reviewed': '📪 Not Reviewed',
    'reviewed': '📖 Reviewing',
    'accepted': '✅ Accepted',
    'rejected': '❌ Rejected',
  };
  return map[status] || 'Unknown';
}

export function parsePaperList(paperListResponseData: any[]) {
  const papers: IPaper[] = [];
  for (const paper of paperListResponseData) {
    const researchers: any = JSON.parse(paper.paper_authors);
    const paperAuthors: IPaperResearcherInfo[] = researchers.data.map((one: any) => {
      const info: IPaperResearcherInfo = {
        researcherId: one.rs_id,
        notify: one.notify,
        corresponding: one.coressponding, // typo in the backend
        order: one.order,
      };
      return info;
    });
    const onePaper: IPaper = {
      paperId: paper.paperid,
      title: paper.title,
      score: paper.score,
      opinion: paper.opinion,
      conferenceId: paper.conferenceid,
      abstract: paper.abstract,
      status: paper.status,
      paperResearchers: paperAuthors,
      researcherDetails: paper.researcherDetails.map(parseResearcher),
      conferenceDetail: parseConference(paper.conferenceDetail),
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

export type IPaperStatus = 'not reviewed' | 'reviewed' | 'rejected' | 'accepted';

export interface IPaper {
  paperId?: number;
  conferenceId: number;
  title: string;
  abstract: string;
  paperResearchers?: IPaperResearcherInfo[];
  opinion?: string;
  score?: number;
  status?: IPaperStatus;
 // Foreign key data
  conferenceDetail?: IConference;
  researcherDetails?: IResearcher[];
}
