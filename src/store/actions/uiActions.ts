export type SetTitleAction = {
  type: 'SET_TITLE';
  payload: string;
};

export default function setAppTitle(title: string): SetTitleAction {
  return {
    type: 'SET_TITLE',
    payload: title,
  };
}
