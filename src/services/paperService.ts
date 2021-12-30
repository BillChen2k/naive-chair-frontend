import {axiosAuthed} from '@/services/axiosAuthed';
import endpoints from '@/config/endpoints';
import config from '@/config';

/**
 * Download paper from server.
 * @param paperId
 * @param fileName
 * @param role
 */
export async function downloadPaper(paperId: number, fileName: string, role: 'author' | 'referee') {
  return axiosAuthed(endpoints[role].getPaper, {
    paperid: paperId,
  }, {
    baseURL: config.API,
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/pdf',
    },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
