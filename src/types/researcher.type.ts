
export function parseResearcher(responseData: any): IResearcher {
  return {
    researcherId: responseData.rs_id,
    email: responseData.rs_email,
    interest: responseData.rs_interest,
    name: responseData.rs_name,
    affiliation: responseData.rs_affiliation,
  };
}

export interface IResearcher {
  researcherId: number;
  email: string;
  affiliation: string;
  interest: string;
  name: string;
}
