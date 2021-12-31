
export function parseResearcher(responseData: any): IResearcher {
  return {
    researcherId: responseData.rs_id,
    email: responseData.rs_email || responseData.email,
    interest: responseData.rs_interest || responseData.interest,
    name: responseData.rs_name || responseData.name,
    affiliation: responseData.rs_affiliation || responseData.affiliation,
  };
}

export interface IResearcher {
  researcherId: number;
  email: string;
  affiliation: string;
  interest: string;
  name: string;
}
